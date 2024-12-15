import { boolean, date, integer, pgTable, primaryKey, serial, text, timestamp, unique } from 'drizzle-orm/pg-core';
import type { AdapterAccountType } from "next-auth/adapters"

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
})
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

export const categoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: text('type'), // Can be null for user-defined categories
  unit: text('unit').notNull(),
  target: integer('target').notNull(),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const foodItemsTable = pgTable('food_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => categoriesTable.id, { onDelete: 'cascade'}),
  name: text('name').notNull(),
  group: text('group').notNull(),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const progressTable = pgTable('progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => categoriesTable.id, { onDelete: 'cascade'}),
  weekStartDate: date('week_start_date').notNull(), // ISO 8601 formatted start date
  count: integer('count').default(0),
}, (progress) => ({
  userCategoryWeekUnique: unique().on(progress.userId, progress.categoryId, progress.weekStartDate),
}));

export const defaultDataTable = pgTable('default_data', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type'),
  unit: text('unit').notNull(),
  target: integer('target').notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;

export type InsertFoodItem = typeof foodItemsTable.$inferInsert;
export type SelectFoodItem = typeof foodItemsTable.$inferSelect;

export type InsertProgress = typeof progressTable.$inferInsert;
export type SelectProgress = typeof progressTable.$inferSelect;

export type InsertDefaultData = typeof defaultDataTable.$inferInsert;
export type SelectDefaultData = typeof defaultDataTable.$inferSelect;
