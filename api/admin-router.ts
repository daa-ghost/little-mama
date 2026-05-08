import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, localUsers, contacts, messages, reservations } from "@db/schema";
import { sql } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();

    const [totalUsersResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);
    const [totalLocalUsersResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(localUsers);
    const [totalContactsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(contacts);
    const [totalMessagesResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(messages);
    const [totalReservationsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(reservations);

    return {
      totalUsers: totalUsersResult.count,
      totalLocalUsers: totalLocalUsersResult.count,
      totalContacts: totalContactsResult.count,
      totalMessages: totalMessagesResult.count,
      totalReservations: totalReservationsResult.count,
    };
  }),

  users: adminQuery.query(async () => {
    const db = getDb();
    const oauthUsers = await db.select().from(users);
    const localUsersList = await db.select().from(localUsers);

    const combined = [
      ...oauthUsers.map((u) => ({
        id: u.id,
        name: u.name || "OAuth User",
        email: u.email,
        role: u.role,
        authType: "oauth" as const,
        createdAt: u.createdAt,
      })),
      ...localUsersList.map((u) => ({
        id: u.id + 100000,
        name: u.displayName || u.username,
        email: u.email,
        role: u.role,
        authType: "local" as const,
        createdAt: u.createdAt,
      })),
    ];

    return combined;
  }),
});
