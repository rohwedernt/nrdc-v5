import { handleFoodSelection } from '@/db/queries/insert';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  
  try {
    const body = await req.json();
    const { userId, weekStartDate, selectedFoods } = body;

    if (!userId || !weekStartDate || !Array.isArray(selectedFoods)) {
      return NextResponse.json(
        { error: 'Missing or invalid request body parameters.' },
        { status: 400 }
      );
    }

    await handleFoodSelection(userId, weekStartDate, selectedFoods);

    return NextResponse.json({ message: 'Progress updated!' }, { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: 'Failed to update progress.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
