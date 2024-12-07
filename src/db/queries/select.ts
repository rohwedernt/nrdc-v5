import { asc, between, count, eq, and, or, getTableColumns, sql } from 'drizzle-orm';
import { db } from '../index';
import { SelectUser, categoriesTable, foodItemsTable, progressTable, usersTable } from '../schema';

export async function getUserById(
  id: SelectUser['id']
): Promise<{
  id: number;
  username: string;
  email: string;
  createdAt: string;
} | null> {
  const result = await db
    .select({
      id: usersTable.id,
      username: usersTable.username,
      email: usersTable.email,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1); // Ensure only one record is returned

  return result.length > 0 ? result[0] : null; // Return the single record or null if not found
}

export async function getCategories(userId: number, weekStartDate: string) {
  return await db
    .select({
      ...getTableColumns(categoriesTable),
      progressCount: progressTable.count,
    })
    .from(categoriesTable)
    .leftJoin(progressTable, eq(categoriesTable.id, progressTable.categoryId))
    .where(
      or(
        eq(categoriesTable.userId, userId), // User-specific categories
        eq(categoriesTable.isDefault, true) // Default categories
      )
    );
}

export async function getFoodItems(userId: number) {
  return await db
    .select()
    .from(foodItemsTable)
    .where(
      or(
        eq(foodItemsTable.userId, userId), // User-specific food items
        eq(foodItemsTable.isDefault, true) // Default food items
      )
    );
}

// export async function getUserNutritionData(userId: number, weekStartDate: string) {
//   // Fetch user-specific categories and their progress
//   const categories = await db
//     .select({
//       ...getTableColumns(categoriesTable),
//       progressCount: progressTable.count,
//     })
//     .from(categoriesTable)
//     .leftJoin(progressTable, eq(categoriesTable.id, progressTable.categoryId))
//     .where(
//       or(
//         eq(categoriesTable.userId, userId), // User-specific categories
//         eq(categoriesTable.isDefault, true) // Default categories
//       )
//     );

//   // Fetch all food items for the user
//   const foodItems = await db
//     .select()
//     .from(foodItemsTable)
//     .where(
//       or(
//         eq(foodItemsTable.userId, userId), // User-specific food items
//         eq(foodItemsTable.isDefault, true) // Default food items
//       )
//     );

//   return { categories, foodItems };
// }

export async function getUserWeeklyProgress(userId: number, weekStartDate: string) {
  return db
    .select({
      ...getTableColumns(progressTable),
      categoryName: categoriesTable.name,
    })
    .from(progressTable)
    .innerJoin(categoriesTable, eq(progressTable.categoryId, categoriesTable.id))
    .where(and(eq(progressTable.userId, userId), eq(progressTable.weekStartDate, weekStartDate)));
}

// export async function getUsersWithPostsCount(
//   page = 1,
//   pageSize = 5,
// ): Promise<
//   Array<{
//     postsCount: number;
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }>
// > {
//   return db
//     .select({
//       ...getTableColumns(usersTable),
//       postsCount: count(postsTable.id),
//     })
//     .from(usersTable)
//     .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
//     .groupBy(usersTable.id)
//     .orderBy(asc(usersTable.id))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
// }

// export async function getPostsForLast24Hours(
//   page = 1,
//   pageSize = 5,
// ): Promise<
//   Array<{
//     id: number;
//     title: string;
//   }>
// > {
//   return db
//     .select({
//       id: postsTable.id,
//       title: postsTable.title,
//     })
//     .from(postsTable)
//     .where(between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`))
//     .orderBy(asc(postsTable.title), asc(postsTable.id))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
// }
