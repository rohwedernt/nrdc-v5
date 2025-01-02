import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../index';
import { InsertCategory, InsertUser, categoriesTable, foodItemsTable, progressTable, users, foodSubmissionLogTable } from '../schema';

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data);
}

export async function addCategory(userId: string, data: InsertCategory) {
  await db.insert(categoriesTable).values({
    ...data,
    userId,
    isDefault: false,
  });
}

export async function addFoodItem(userId: string, categoryId: string, name: string, group: string) {
  await db.insert(foodItemsTable).values({
    userId,
    categoryId,
    name,
    group,
    isDefault: false,
  });
}

export async function handleUpdateProgress(
  userId: string,
  weekStartDate: string,
  categoryId: string,
  count: number
) {
  try {
    // Check if there is existing progress for this category and week
    const existingProgress = await db
      .select()
      .from(progressTable)
      .where(
        and(
          eq(progressTable.userId, userId),
          eq(progressTable.categoryId, categoryId),
          eq(progressTable.weekStartDate, weekStartDate)
        )
      )
      .limit(1);

    if (existingProgress.length > 0 && existingProgress[0] !== null) {
      // Parse count as a float, handle null, and increment by the provided count
      const existingCount = parseFloat(existingProgress[0].count || "0"); // Default to "0" if null
      const newCount = (existingCount + count).toFixed(1); // Ensure one decimal place

      // Update existing progress
      await db
        .update(progressTable)
        .set({ count: newCount }) // Pass as a string
        .where(eq(progressTable.id, existingProgress[0].id));
    } else {
      // Insert a new record if no existing progress
      await db.insert(progressTable).values({
        userId,
        categoryId,
        weekStartDate,
        count: count.toFixed(1), // Ensure one decimal place and pass as a string
      });
    }
  } catch (error) {
    console.error('Error updating progress:', error);
    throw new Error('Failed to handle category selection.');
  }
}

export async function logFoodSubmission(
  userId: string,
  foodName: string,
  categoryName: string,
  count: number,
  timestamp: string // Passed-in timestamp
): Promise<void> {
  try {
    await db.insert(foodSubmissionLogTable).values({
      userId,
      foodName,
      categoryName,
      count: count.toFixed(2), // Ensure count is a string with 2 decimal places
      timestamp, // Use the passed-in timestamp
    });
    console.log("Food submission logged successfully.");
  } catch (error) {
    console.error("Error logging food submission:", error);
    throw new Error("Failed to log food submission.");
  }
}
