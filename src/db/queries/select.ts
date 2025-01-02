import { eq, and, or, desc, getTableColumns } from 'drizzle-orm';
import { db } from '../index';
import { settingsTable, categoriesTable, foodItemsTable, progressTable, users, foodSubmissionLogTable } from '../schema';
import { FoodSubmissionLog } from '@/components/custom/nutrition/FoodLog';


export async function getUserById(userId: string): Promise<{
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: string;
} | null> {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      emailVerified: users.emailVerified,
      image: users.image,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getUserCategories(userId: string) {
  return await db
    .select()
    .from(categoriesTable)
    .where(
      or(
        eq(categoriesTable.userId, userId), // Categories specific to the user
        eq(categoriesTable.isDefault, true) // Default categories
      )
    );
}

export async function getCategoryNameById(categoryId: string): Promise<string | null> {
  try {
    const result = await db
      .select({ name: categoriesTable.name })
      .from(categoriesTable)
      .where(eq(categoriesTable.id, categoryId))
      .limit(1);

    if (result.length > 0) {
      return result[0].name;
    } else {
      console.warn(`Category with ID ${categoryId} not found.`);
      return null; // Category not found
    }
  } catch (error) {
    console.error("Error fetching category name:", error);
    throw new Error("Failed to fetch category name.");
  }
}

export async function getUserSettings(userId: string) {
  const settings = await db
    .select({
      key: settingsTable.key,
      value: settingsTable.value,
    })
    .from(settingsTable)
    .where(eq(settingsTable.userId, userId));
    
  // Transform into a key-value object for easier usage
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);
}

export async function getUserWeeklyProgress(userId: string, weekStartDate: string) {
  return db
    .select({
      ...getTableColumns(progressTable),
      categoryName: categoriesTable.name,
    })
    .from(progressTable)
    .innerJoin(categoriesTable, eq(progressTable.categoryId, categoriesTable.id))
    .where(and(eq(progressTable.userId, userId), eq(progressTable.weekStartDate, weekStartDate)));
}

export async function getFoodSubmissionLogsByUser(userId: string): Promise<FoodSubmissionLog[]> {
  try {
    const submissions = await db
      .select()
      .from(foodSubmissionLogTable)
      .where(eq(foodSubmissionLogTable.userId, userId)) // Filter by userId
      .orderBy(desc(foodSubmissionLogTable.timestamp)); // Order by most recent first

    return submissions;
  } catch (error) {
    console.error("Error fetching food submissions for user:", error);
    throw new Error("Failed to fetch food submissions.");
  }
}

// export async function getFoodItems() {
//   return await db
//     .select()
//     .from(foodItemsTable)
//     .where(
//       or(
//         //eq(foodItemsTable.userId, userId), // User-specific food items
//         eq(foodItemsTable.isDefault, true) // Default food items
//       )
//     );
// }

// export async function getUserNutritionData(userId: string, weekStartDate: string) {
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
//       ...getTableColumns(users),
//       postsCount: count(postsTable.id),
//     })
//     .from(users)
//     .leftJoin(postsTable, eq(users.id, postsTable.userId))
//     .groupBy(users.id)
//     .orderBy(asc(users.id))
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
