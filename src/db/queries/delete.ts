import { and, eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectUser, categoriesTable, foodItemsTable, users } from '../schema';

export async function deleteUser(id: SelectUser['id']) {
  await db.delete(users).where(eq(users.id, id));
}

export async function deleteCategory(userId: string, categoryId: number) {
  await db
    .delete(categoriesTable)
    .where(and(
      eq(categoriesTable.id, categoryId),
      eq(categoriesTable.userId, userId),
      eq(categoriesTable.isDefault, false)
    ));
}

export async function deleteFoodItem(userId: string, foodItemId: number) {
  await db
    .delete(foodItemsTable)
    .where(and(
      eq(foodItemsTable.id, foodItemId),
      eq(foodItemsTable.userId, userId),
      eq(foodItemsTable.isDefault, false)
    ));
}
