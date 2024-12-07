import { and, eq } from 'drizzle-orm';
import { db } from '../index';
import { InsertCategory, categoriesTable } from '../schema';

// export async function updatePost(id: SelectPost['id'], data: Partial<Omit<SelectPost, 'id'>>) {
//   await db.update(postsTable).set(data).where(eq(postsTable.id, id));
// }

export async function updateCategory(userId: number, categoryId: number, data: Partial<InsertCategory>) {
  await db
    .update(categoriesTable)
    .set(data)
    .where(and(
      eq(categoriesTable.id, categoryId),
      eq(categoriesTable.userId, userId),
      eq(categoriesTable.isDefault, false)
    ));
}
