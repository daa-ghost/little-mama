import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";
import { verifyLocalToken } from "./local-auth-router";
import { getDb } from "./queries/connection";
import { localUsers } from "@db/schema";
import { eq } from "drizzle-orm";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User & { authType?: "oauth" | "local" };
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try OAuth first
  try {
    const oauthUser = await authenticateRequest(opts.req.headers);
    if (oauthUser) {
      ctx.user = { ...oauthUser, authType: "oauth" };
      return ctx;
    }
  } catch {
    // OAuth auth failed, try local
  }

  // Try local auth
  try {
    const localToken = opts.req.headers.get("x-local-auth-token");
    if (localToken) {
      const payload = await verifyLocalToken(localToken);
      if (payload) {
        const db = getDb();
        const users = await db
          .select()
          .from(localUsers)
          .where(eq(localUsers.id, payload.userId))
          .limit(1);
        if (users.length > 0) {
          const lu = users[0];
          ctx.user = {
            id: lu.id,
            unionId: `local_${lu.id}`,
            name: lu.displayName || lu.username,
            email: lu.email,
            avatar: null,
            role: lu.role,
            createdAt: lu.createdAt,
            updatedAt: lu.createdAt,
            lastSignInAt: lu.createdAt,
            authType: "local",
          } as User & { authType: "local" };
        }
      }
    }
  } catch {
    // Local auth failed
  }

  return ctx;
}
