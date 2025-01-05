import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exerciseLogTable, exercisesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET: Retrieve all exercises for a user
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("user-id"); // Retrieve user ID from headers
    if (!userId) {
      return NextResponse.json(
        { error: "Missing user ID" },
        { status: 400 }
      );
    }

    // Query user's exercises
    const exercises = await db
      .select()
      .from(exercisesTable)
      .where(eq(exercisesTable.userId, userId));

    return NextResponse.json(exercises, { status: 200 });
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercises" },
      { status: 500 }
    );
  }
}

// POST: Add new exercises for a user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, exercises } = body;

    if (!userId || !Array.isArray(exercises)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Insert exercises into the database
    await db.insert(exercisesTable).values(
      exercises.map((exercise: { name: string; goal: number | null; isDefault: boolean }) => ({
        userId,
        name: exercise.name,
        goal: exercise.goal,
        count: 0, // Default count to 0
        isDefault: exercise.isDefault,
      }))
    );

    return NextResponse.json(exercises, { status: 200 });
  } catch (error) {
    console.error("Error adding exercises:", error);
    return NextResponse.json(
      { error: "Failed to add exercises" },
      { status: 500 }
    );
  }
}

// PATCH: Update the goal or increment the count for a specific exercise and log the change
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { exerciseId, goal, count, userId, timestamp } = body;

    console.log("exerciseId: " + JSON.stringify(exerciseId, null, 2));
    console.log("goal: " + JSON.stringify(goal, null, 2));
    console.log("count: " + JSON.stringify(count, null, 2));
    console.log("userId: " + JSON.stringify(userId, null, 2));
    console.log("timestamp: " + JSON.stringify(timestamp, null, 2));


    if (!exerciseId || !userId) {
      return NextResponse.json(
        { error: "Invalid request body: exerciseId and userId are required" },
        { status: 400 }
      );
    }

    // Use a transaction to ensure both the update and log insertion happen atomically
    await db.transaction(async (trx) => {
      // If count is provided, fetch the current count and add the new value to it
      if (count !== undefined) {
        const [currentExercise] = await trx
          .select({ currentCount: exercisesTable.count })
          .from(exercisesTable)
          .where(eq(exercisesTable.id, exerciseId));

        if (!currentExercise) {
          throw new Error(`Exercise with ID ${exerciseId} not found.`);
        }

        const newCount = currentExercise.currentCount + count;

        // Update the count in the exercises table
        await trx
          .update(exercisesTable)
          .set({ count: newCount })
          .where(eq(exercisesTable.id, exerciseId));

        // Insert a log entry for the submission
        await trx.insert(exerciseLogTable).values({
          userId,
          exerciseId,
          count: count, // Log the submitted count, not the cumulative total
          timestamp,
        });
      }

      // If goal is provided, update it
      if (goal !== undefined) {
        await trx
          .update(exercisesTable)
          .set({ goal })
          .where(eq(exercisesTable.id, exerciseId));
      }
    });

    return NextResponse.json({ message: "Exercise updated and logged successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating exercise and logging submission:", error);
    return NextResponse.json(
      { error: "Failed to update exercise and log submission" },
      { status: 500 }
    );
  }
}
