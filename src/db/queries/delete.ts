import { and, eq } from 'drizzle-orm';
import { db } from '../index';
import { SelectUser, categoriesTable, foodItemsTable, usersTable } from '../schema';

export async function deleteUser(id: SelectUser['id']) {
  await db.delete(usersTable).where(eq(usersTable.id, id));
}

export async function deleteCategory(userId: number, categoryId: number) {
  await db
    .delete(categoriesTable)
    .where(and(
      eq(categoriesTable.id, categoryId),
      eq(categoriesTable.userId, userId),
      eq(categoriesTable.isDefault, false)
    ));
}

export async function deleteFoodItem(userId: number, foodItemId: number) {
  await db
    .delete(foodItemsTable)
    .where(and(
      eq(foodItemsTable.id, foodItemId),
      eq(foodItemsTable.userId, userId),
      eq(foodItemsTable.isDefault, false)
    ));
}
