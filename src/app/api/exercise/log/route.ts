import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { exerciseLogTable } from "@/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import dayjs from "dayjs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = req.headers.get("user-id"); 
    const exerciseId = req.headers.get("exercise-id"); 

    console.log('DEBUG: ' + exerciseId)

    if (!userId) {
      return NextResponse.json(
        { error: "Missing user ID" },
        { status: 400 }
      );
    }

    if (!exerciseId) {
      return NextResponse.json(
        { error: "Missing exercise ID" },
        { status: 400 }
      );
    }

    const type = searchParams.get("type"); // Determine whether to fetch logs or stats

    if (type === "stats") {
      // Fetch and calculate stats
      const currentYearStart = dayjs().startOf("year").toISOString();
      const today = dayjs().endOf("day").toISOString();

      // Query all logs for the current calendar year
      const logs = await db
        .select()
        .from(exerciseLogTable)
        .where(
          and(
            eq(exerciseLogTable.userId, userId),
            eq(exerciseLogTable.exerciseId, exerciseId),
            sql`${exerciseLogTable.timestamp} >= ${currentYearStart}`
          )
        )
        .orderBy(desc(exerciseLogTable.timestamp));

      if (!logs.length) {
        return NextResponse.json(
          {
            dailyAverage: 0,
            dailyRecord: 0,
            currentStreak: 0,
            longestStreak: 0,
          },
          { status: 200 }
        );
      }

      // Create a map of daily counts
      const dailyCounts: Record<string, number> = {};
      logs.forEach((log) => {
        const day = dayjs(log.timestamp).startOf("day").toISOString();
        dailyCounts[day] = (dailyCounts[day] || 0) + log.count;
      });

      // Calculate daily average
      const firstLogDate = dayjs(Object.keys(dailyCounts).sort()[0]);
      const daysInRange = dayjs(today).diff(firstLogDate, "day") + 1; // Including today
      const totalCount = Object.values(dailyCounts).reduce((sum, count) => sum + count, 0);
      const dailyAverage = totalCount / daysInRange;

      // Calculate daily record
      const dailyRecord = Math.max(...Object.values(dailyCounts));

      // Calculate current streak
      let currentStreak = 0;
      const sortedDays = Object.keys(dailyCounts).sort(); // Oldest to newest
      const yesterday = dayjs().subtract(1, "day").startOf("day");

      for (let i = sortedDays.length - 1; i >= 0; i--) {
        const currentDay = dayjs(sortedDays[i]);
        const expectedDay = yesterday.subtract(currentStreak, "day");

        if (currentDay.isSame(expectedDay, "day") && dailyCounts[sortedDays[i]] > 0) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Calculate longest streak
      let longestStreak = 0;
      let tempStreak = 0;

      for (let i = 0; i < sortedDays.length; i++) {
        if (dailyCounts[sortedDays[i]] > 0) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0; // Reset the streak
        }
      }

      // Return the stats
      return NextResponse.json(
        {
          dailyAverage: Math.ceil(dailyAverage), // Rounded up
          dailyRecord,
          currentStreak: currentStreak > 0 ? currentStreak - 1 : currentStreak,
          longestStreak: longestStreak - 1,
        },
        { status: 200 }
      );
    } else {
      // Fetch logs
      const exerciseLogs = await db
        .select()
        .from(exerciseLogTable)
        .where(and(eq(exerciseLogTable.userId, userId), eq(exerciseLogTable.exerciseId, exerciseId)))
        .orderBy(desc(exerciseLogTable.timestamp));

      return NextResponse.json(exerciseLogs, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching exercise logs or stats:", error);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to fetch exercise logs or stats" },
      { status: 500 }
    );
  }
}
