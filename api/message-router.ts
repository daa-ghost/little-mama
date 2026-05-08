import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { messages } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const messageRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(messages).values({
        name: input.name,
        email: input.email,
        content: input.content,
      });
      return { success: true };
    }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(messages).orderBy(desc(messages.createdAt));
  }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(messages).where(eq(messages.id, input.id));
      return { success: true };
    }),
});
