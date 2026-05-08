import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reservations } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const reservationRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        date: z.string(),
        time: z.string(),
        guests: z.number().min(1),
        location: z.string().optional(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(reservations).values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        date: input.date,
        time: input.time,
        guests: input.guests,
        location: input.location,
        notes: input.notes,
      });
      return { success: true };
    }),

  list: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(reservations).orderBy(desc(reservations.createdAt));
  }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(reservations)
        .set({ status: input.status })
        .where(eq(reservations.id, input.id));
      return { success: true };
    }),
});
