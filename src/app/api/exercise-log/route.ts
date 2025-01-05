import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exerciseLogTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

// GET: Retrieve all exercise logs for a user, sorted by newest first
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id"); // Retrieve the user ID from headers
    if (!userId) {
      return NextResponse.json(
        { error: "Missing user ID" },
        { status: 400 }
      );
    }

    // Query the exercise log table for the given user
    const exerciseLogs = await db
      .select()
      .from(exerciseLogTable)
      .where(eq(exerciseLogTable.userId, userId))
      .orderBy(desc(exerciseLogTable.timestamp)); // Sort by newest first

    return NextResponse.json(exerciseLogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching exercise logs:", error);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch exercise logs" },
      { status: 500 }
    );
  }
}
