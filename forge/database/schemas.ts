import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  createdAt: timestamp("created_at").defaultNow(),
  email: text("email").unique(),
  id: uuid("id").defaultRandom(),
  password: varchar("password"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
