'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { Flex, IconButton, Text } from '@/components/generic';


type WeekSelectorProps = {
  userStartDate: string;
};

const getDefaultCurrentWeek = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - today.getDay())); // Sunday of this week
}

const WeekSelector = forwardRef<HTMLDivElement, WeekSelectorProps>(({
  userStartDate
}, ref) => {
  const [createdAt, setCreatedAt] = useState<Date>(new Date(userStartDate));
  const [currentWeek, setCurrentWeek] = useState<Date>(getDefaultCurrentWeek());

  const handlePreviousWeek = () => {
    if (currentWeek) {
      const previousWeek = new Date(currentWeek);
      previousWeek.setDate(currentWeek.getDate() - 7);
      if (createdAt && previousWeek >= createdAt) {
        setCurrentWeek(previousWeek);
      }
    }
  };

  const handleNextWeek = () => {
    if (currentWeek) {
      const nextWeek = new Date(currentWeek);
      nextWeek.setDate(currentWeek.getDate() + 7);
      if (nextWeek <= new Date()) {
        setCurrentWeek(nextWeek);
      }
    }
  };

  const isNextWeekInFuture = (): boolean => {
    if (!currentWeek) return true;
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7); // Move to the next week's Sunday
    return nextWeek > new Date(); // Disable if next week's Sunday is in the future
  };

  return (
    <Flex direction='column' justifyContent='center' alignItems='center' paddingTop='20'>
      <Text variant="label-default-s" onBackground="neutral-weak">WEEK OF</Text>
    <Flex
      alignItems='center'
      justifyContent='center'>
      <IconButton
        icon="chevronLeft"
        size="m"
        variant="ghost"
        style={{ cursor: "pointer" }}
        disabled={!createdAt || currentWeek <= createdAt}
        onClick={handlePreviousWeek}
      />
      <Text variant="heading-default-s" onBackground="neutral-medium">
      {currentWeek.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <IconButton
        icon="chevronRight"
        size="m"
        variant="ghost"
        style={{ cursor: "pointer" }}
        disabled={isNextWeekInFuture()}
        onClick={handleNextWeek}
      />
    </Flex>
    </Flex>
  );
});

WeekSelector.displayName = 'WeekSelector';

export { WeekSelector };
