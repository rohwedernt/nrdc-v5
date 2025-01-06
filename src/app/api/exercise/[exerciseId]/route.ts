import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exercisesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// DELETE: Remove an exercise record for a given exercise ID
export async function DELETE(req: NextRequest) {
  try {
    const exerciseId = req.nextUrl.pathname.split('/').pop(); // Get exerciseId from the URL

    if (!exerciseId) {
      return NextResponse.json({ error: "Exercise ID is required" }, { status: 400 });
    }

    // Delete the exercise from the database
    await db
      .delete(exercisesTable)
      .where(eq(exercisesTable.id, exerciseId));

    return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting exercise:", error);
    return NextResponse.json(
      { error: "Failed to delete exercise" },
      { status: 500 }
    );
  }
}
