import { boolean, date, integer, pgTable, serial, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
});

export const categoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  type: text('type'), // Can be null for user-defined categories
  unit: text('unit').notNull(),
  target: integer('target').notNull(),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const foodItemsTable = pgTable('food_items', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
  categoryId: integer('category_id').references(() => categoriesTable.id, { onDelete: 'cascade'}),
  name: text('name').notNull(),
  group: text('group').notNull(),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
});

export const progressTable = pgTable('progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => usersTable.id, { onDelete: 'cascade' }),
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

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;

export type InsertFoodItem = typeof foodItemsTable.$inferInsert;
export type SelectFoodItem = typeof foodItemsTable.$inferSelect;

export type InsertProgress = typeof progressTable.$inferInsert;
export type SelectProgress = typeof progressTable.$inferSelect;

export type InsertDefaultData = typeof defaultDataTable.$inferInsert;
export type SelectDefaultData = typeof defaultDataTable.$inferSelect;
