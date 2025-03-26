'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { Flex, Grid, Spinner } from '../../generic';
import { CalisthenicCard } from './CalisthenicCard';
import dayjs from 'dayjs';
import { ExerciseLog } from './ExerciseLog';
import { formatNumber } from '@/app/utils/utils';


type CalisthenicStatsProps = {
  userId: string;
  exerciseId: string;
  count: number;
  goal: number;
};

type CalisthenicStats = {
  dailyAverage: number;
  dailyRecord: number;
  currentStreak: number;
  longestStreak: number;
}

const defaultStats: CalisthenicStats = {
  dailyAverage: 0,
  dailyRecord: 0,
  currentStreak: 0,
  longestStreak: 0
}

const CalisthenicStats = forwardRef<HTMLDivElement, CalisthenicStatsProps>(({
  userId,
  exerciseId,
  count,
  goal
}, ref) => {
  const [stats, setStats] = useState(defaultStats);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
      getExerciseStatsForUser(userId);
    }, [userId]);

  const getExerciseStatsForUser = async (userId: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/exercise/log?type=stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
          "exercise-id": exerciseId,
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Exercise stats:", data);

        setStats(data);
      } else {
        console.error("Failed to fetch exercise logs for user");
      }
    } catch (error) {
      console.error("Error fetching exercise logs data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function daysRemaininginYear() {
    const today = dayjs();
    const endOfYear = dayjs().endOf('year');

    // Calculate remaining days in the year, excluding today
    return endOfYear.diff(today, 'day');
  }

  function calculatePerDayToReachGoal(goal: number, currentCount: number) {
    const remainingDays = daysRemaininginYear();

    // Calculate remaining goal to achieve
    const remainingGoal = goal - currentCount;

    if (remainingDays <= 0 || remainingGoal <= 0) {
      return 0; // If no days left or the goal is already reached, no per day needed
    }

    // Calculate per day required and round up to nearest whole number
    const perDay = Math.ceil(remainingGoal / remainingDays);

    return perDay;
  }

  return (
    <Grid
      radius="l"
      columns="repeat(3, 1fr)"
      tabletColumns="2col"
      mobileColumns="1col"
      fillWidth
      gap="20">
      {isLoading ? (
        <Flex fillWidth justifyContent='center'>
          <Spinner size="s" />
        </Flex>
      ) : (
        <>
          <CalisthenicCard name="Completed" count={count} shadow />
          <CalisthenicCard
            name="Remaining"
            description={`${formatNumber(count)} completed of ${formatNumber(goal)} rep goal`}
            count={goal - count}
            shadow
          />
          <CalisthenicCard
            name="Per Day"
            description={`${formatNumber(goal - count)} to go / ${daysRemaininginYear()} days left this year`}
            count={calculatePerDayToReachGoal(goal, count)}
            shadow
          />
          <CalisthenicCard name="Daily Avg." count={stats?.dailyAverage} />
          <CalisthenicCard name="Daily Record" count={stats?.dailyRecord} />
          <CalisthenicCard
            name="Streak"
            description={`Longest streak: ${stats.longestStreak} days`}
            count={stats?.currentStreak}
          />
          <ExerciseLog userId={userId} exerciseId={exerciseId} />
        </>
      )}
    </Grid>
  );
});

CalisthenicStats.displayName = 'CalisthenicStats';

export { CalisthenicStats };
