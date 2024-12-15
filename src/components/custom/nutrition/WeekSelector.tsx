'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { Flex, IconButton, Text } from '@/components/generic';


type WeekSelectorProps = {
  userStartDate: Date;
  selectedWeek: Date;
  setSelectedWeek: (weekStartDate: Date) => void;
  updateProgress: () => void;
};

// const getDefaultCurrentWeek = (): Date => {
//   const today = new Date();
//   return new Date(today.setDate(today.getDate() - today.getDay())); // Sunday of this week
// }

const WeekSelector = forwardRef<HTMLDivElement, WeekSelectorProps>(({
  userStartDate,
  selectedWeek,
  setSelectedWeek,
  updateProgress
}, ref) => {
  //const [createdAt, setCreatedAt] = useState<Date>(new Date(userStartDate));
  //const [selectedWeek, setSelectedWeek] = useState<Date>(getDefaultCurrentWeek());

  // useEffect(() => {
  //   onWeekChange(selectedWeek);
  // }, [selectedWeek]);

  const handlePreviousWeek = () => {
    if (selectedWeek) {
      const previousWeek = new Date(selectedWeek);
      previousWeek.setDate(selectedWeek.getDate() - 7);
      if (userStartDate && previousWeek >= userStartDate) {
        setSelectedWeek(previousWeek);
        updateProgress();
        //setSelectedWeek(previousWeek); // Notify parent of week change
      }
    }
  };

  const handleNextWeek = () => {
    if (selectedWeek) {
      const nextWeek = new Date(selectedWeek);
      nextWeek.setDate(selectedWeek.getDate() + 7);
      if (nextWeek <= new Date()) {
        setSelectedWeek(nextWeek);
        updateProgress();
        //onWeekChange(nextWeek); // Notify parent of week change
      }
    }
  };

  const isNextWeekInFuture = (): boolean => {
    if (!selectedWeek) return true;
    const nextWeek = new Date(selectedWeek);
    nextWeek.setDate(selectedWeek.getDate() + 7); // Move to the next week's Sunday
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
        disabled={!userStartDate || (() => {
          const previousSunday = new Date(selectedWeek); // Clone currentWeek
          previousSunday.setDate(selectedWeek.getDate() - 7); // Subtract 7 days to get the previous Sunday
          return previousSunday < new Date(userStartDate); // Compare with userStartDate
        })()}
        onClick={handlePreviousWeek}
      />
      <Text variant="heading-default-s" onBackground="neutral-medium">
      {selectedWeek.toLocaleDateString('en-US', {
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
