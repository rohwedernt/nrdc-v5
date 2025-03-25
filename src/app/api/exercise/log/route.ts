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

      // Get all dates in the current year up to today
      const allDatesInYear: string[] = [];
      let currentDate = dayjs(currentYearStart);
      const endDate = dayjs(today);
      
      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        allDatesInYear.push(currentDate.startOf('day').toISOString());
        currentDate = currentDate.add(1, 'day');
      }

      // Calculate current and longest streaks
      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;

      // Reverse the dates array to start from most recent
      const reversedDates = [...allDatesInYear].reverse();

      // Calculate current streak (from most recent)
      for (const date of reversedDates) {
        if (dailyCounts[date]) {
          currentStreak++;
        } else {
          break;
        }
      }

      // Calculate longest streak
      for (const date of allDatesInYear) {
        if (dailyCounts[date]) {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }

      // Return the stats
      return NextResponse.json(
        {
          dailyAverage: Math.ceil(dailyAverage),
          dailyRecord,
          currentStreak: currentStreak,
          longestStreak: longestStreak,
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
