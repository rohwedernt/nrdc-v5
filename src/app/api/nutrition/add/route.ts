import { handleUpdateProgress, logFoodSubmission } from '@/db/queries/insert';
import { getCategoryNameById } from '@/db/queries/select';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, weekStartDate, categoryId, count, foodName, timeStamp } = body;

    if (!userId || !weekStartDate || !categoryId || !count || !foodName || !timeStamp) {
      return NextResponse.json(
        { error: 'Missing or invalid request body parameters.' },
        { status: 400 }
      );
    }

    let categoryName = await getCategoryNameById(categoryId) ?? "Category Not Found";

    await handleUpdateProgress(userId, weekStartDate, categoryId, count);
    await logFoodSubmission(userId, foodName, categoryName, count, timeStamp);

    return NextResponse.json({ message: 'Progress updated!' }, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Failed to update progress.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
