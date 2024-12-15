import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../index';
import { InsertCategory, InsertUser, categoriesTable, foodItemsTable, progressTable, users } from '../schema';

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data);
}

// export async function createPost(data: InsertPost) {
//   await db.insert(postsTable).values(data);
// }

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

export async function trackProgress(
  userId: string,
  categoryId: string,
  weekStartDate: string,
  increment: number = 1
) {
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
    await db
      .update(progressTable)
      .set({ count: (existingProgress[0]?.count || 0) + increment })
      .where(eq(progressTable.id, existingProgress[0]?.id));
  } else {
    await db.insert(progressTable).values({
      userId,
      categoryId,
      weekStartDate,
      count: increment,
    });
  }
}

export async function handleFoodSelection(
  userId: string,
  weekStartDate: string,
  selectedFoods: string[]
) {
  // Fetch the associated categories for the selected foods
  const foodItems = await db
    .select({
      name: foodItemsTable.name,
      categoryId: foodItemsTable.categoryId,
    })
    .from(foodItemsTable)
    .where(inArray(foodItemsTable.name, selectedFoods));

  // Map categories to the foods selected
  const categoryCounts = foodItems.reduce((acc, food) => {
    if (food.categoryId !== null) {
      acc[food.categoryId] = (acc[food.categoryId] || 0) + 1;
    }
    return acc;
  }, {} as Record<number, number>);
  
  // Update progress for each associated category
  for (const [categoryId, increment] of Object.entries(categoryCounts)) {
    await trackProgress(userId, categoryId, weekStartDate, increment);
  }
}
