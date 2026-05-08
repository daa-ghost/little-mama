import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.LOCAL_AUTH_SECRET || "little-mamma-local-auth-secret-key-2024"
);

export async function createLocalToken(userId: number): Promise<string> {
  return new SignJWT({ userId, type: "local" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyLocalToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    return payload as { userId: number; type: string };
  } catch {
    return null;
  }
}

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(50),
        password: z.string().min(6).max(100),
        displayName: z.string().optional(),
        email: z.string().email().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const existing = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already exists",
        });
      }

      const passwordHash = await bcrypt.hash(input.password, 12);
      const result = await db.insert(localUsers).values({
        username: input.username,
        passwordHash,
        displayName: input.displayName || input.username,
        email: input.email,
      });

      const userId = Number(result[0].insertId);
      const token = await createLocalToken(userId);

      return {
        token,
        user: {
          id: userId,
          username: input.username,
          displayName: input.displayName || input.username,
          email: input.email,
          role: "user" as const,
        },
      };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const users = await db
        .select()
        .from(localUsers)
        .where(eq(localUsers.username, input.username))
        .limit(1);

      if (users.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const user = users[0];
      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        });
      }

      const token = await createLocalToken(user.id);

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          email: user.email,
          role: user.role,
        },
      };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const token =
      ctx.req.headers.get("x-local-auth-token") || "";
    if (!token) return null;

    const payload = await verifyLocalToken(token);
    if (!payload) return null;

    const db = getDb();
    const users = await db
      .select()
      .from(localUsers)
      .where(eq(localUsers.id, payload.userId))
      .limit(1);

    if (users.length === 0) return null;

    const user = users[0];
    return {
      id: user.id,
      name: user.displayName || user.username,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
    };
  }),
});
