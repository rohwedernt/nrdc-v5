'use client';

import React, { forwardRef } from 'react';
import { Grid } from '../../generic';
import { CalisthenicCard } from './CalisthenicCard';
import dayjs from 'dayjs';
import { ExerciseLog } from './ExerciseLog';


type CalisthenicStatsProps = {
  userId: string;
  count: number;
  goal: number;
};

const CalisthenicStats = forwardRef<HTMLDivElement, CalisthenicStatsProps>(({
  userId,
  count,
  goal
}, ref) => {

  function calculatePerDayToReachGoal(goal: number, currentCount: number) {
    const today = dayjs();
    const endOfYear = dayjs().endOf('year');
    
    // Calculate remaining days in the year, excluding today
    const remainingDays = endOfYear.diff(today, 'day');
    
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
      <CalisthenicCard name="Completed" count={count} shadow />
      <CalisthenicCard name="Remaining" count={goal - count} shadow />
      <CalisthenicCard name="Per Day" count={calculatePerDayToReachGoal(goal, count)} shadow />
      <CalisthenicCard name="Daily Avg." count={36} />
      <CalisthenicCard name="Daily Record" count={50} />
      <CalisthenicCard name="Something Else" count={1628} />
      <ExerciseLog userId={userId} />
    </Grid>
  );
});

CalisthenicStats.displayName = 'CalisthenicStats';

export { CalisthenicStats };
