'use client';

import React, { forwardRef, useState } from 'react';
import { Flex, IconButton } from '../../generic';
import { CalisthenicsForm } from './CalisthenicsForm';
import { CalisthenicStats } from './CalisthenicStats';
import { MoreInfoDialog } from '@/components/generic/MoreInfoDialog';
import { Exercise } from './CalisthenicsTracker';
import { GoalSetter } from './GoalSetter';


type CalisthenicViewProps = {
  userId: string;
  exercise: Exercise;
};

const CalisthenicView = forwardRef<HTMLDivElement, CalisthenicViewProps>(({
  userId,
  exercise
}, ref) => {
  const [currentExercise, setCurrentExercise] = useState<Exercise>(exercise);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);

  const updateGoal = (newGoal: number) => {
    setCurrentExercise((prev) => ({
      ...prev,
      goal: newGoal,
    }));
  };

  const updateCount = (newCount: number) => {
    setCurrentExercise((prev) => ({
      ...prev,
      count: prev.count + newCount,
    }));
  };

  return (
    <Flex fillWidth>
      {currentExercise.goal === null ? (
        <GoalSetter userId={userId} exercise={exercise} onGoalSet={updateGoal} />
      ) : (
        <Flex direction='column' fillWidth>
          <Flex justifyContent='space-between' fillWidth paddingBottom='l'>
            <CalisthenicsForm userId={userId} exercise={exercise} onCountSet={updateCount} />
            <IconButton
              onClick={() => setIsHelpDialogOpen(true)}
              icon="helpCircle"
              size="l"
              tooltip="More info"
              tooltipPosition="top"
              variant="ghost"
            />
          </Flex>
          <CalisthenicStats userId={userId} count={currentExercise.count} goal={currentExercise.goal || 0} />
          <MoreInfoDialog
            title="How to use the Calisthenics Tracker"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            isDialogOpen={isHelpDialogOpen}
            setIsDialogOpen={setIsHelpDialogOpen}
          />
        </Flex>
      )}
    </Flex>
  );
});

CalisthenicView.displayName = 'CalisthenicView';

export { CalisthenicView };
