import { and, eq } from 'drizzle-orm';
import { db } from '../index';
import { InsertCategory, categoriesTable, settingsTable } from '../schema';

// export async function updatePost(id: SelectPost['id'], data: Partial<Omit<SelectPost, 'id'>>) {
//   await db.update(postsTable).set(data).where(eq(postsTable.id, id));
// }

export async function updateCategory(userId: string, categoryId: string, data: Partial<InsertCategory>) {
  await db
    .update(categoriesTable)
    .set(data)
    .where(and(
      eq(categoriesTable.id, categoryId),
      eq(categoriesTable.userId, userId),
      eq(categoriesTable.isDefault, false)
    ));
}

export async function upsertUserSetting(userId: string, key: string, value: string) {
  const existingSetting = await db
    .select()
    .from(settingsTable)
    .where(and(eq(settingsTable.userId, userId), eq(settingsTable.key, key)))
    .limit(1);

  if (existingSetting.length > 0) {
    // Update existing setting
    await db
      .update(settingsTable)
      .set({ value, updatedAt: new Date().toISOString() })
      .where(eq(settingsTable.id, existingSetting[0].id));
  } else {
    // Insert new setting
    await db.insert(settingsTable).values({
      userId,
      key,
      value,
    });
  }
}
