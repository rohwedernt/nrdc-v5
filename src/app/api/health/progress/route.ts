import { NextResponse } from 'next/server';
import { db } from '@/db'; // Adjust to your database import
import { categoriesTable, progressTable } from '@/db/schema';
import { eq, or, and } from 'drizzle-orm';

export async function POST(req: Request) {
  const { userId, selectedWeek } = await req.json();

  try {
    const categoriesWithProgress = await db
      .select({
        id: categoriesTable.id,
        name: categoriesTable.name,
        type: categoriesTable.type,
        unit: categoriesTable.unit,
        target: categoriesTable.target,
        isDefault: categoriesTable.isDefault,
        progressCount: progressTable.count, // Get count from progress table
      })
      .from(categoriesTable)
      .leftJoin(
        progressTable,
        and(
          eq(progressTable.categoryId, categoriesTable.id),
          eq(progressTable.weekStartDate, new Date(selectedWeek).toISOString().split('T')[0]), // Match week start
          eq(progressTable.userId, userId) // Match user
        )
      )
      .where(or(eq(categoriesTable.userId, userId), eq(categoriesTable.isDefault, true)));

    return NextResponse.json(categoriesWithProgress);
  } catch (error) {
    console.error('Error fetching progress data:', error);
    return NextResponse.json({ error: 'Failed to fetch progress data' }, { status: 500 });
  }
}