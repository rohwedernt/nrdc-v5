'use client';

import React, { forwardRef, useState } from 'react';
import { Flex, IconButton } from '../../generic';
import { CalisthenicsForm } from './CalisthenicsForm';
import { CalisthenicStats } from './CalisthenicStats';
import { MoreInfoDialog } from '@/components/generic/MoreInfoDialog';
import { Exercise } from './CalisthenicsTracker';
import { GoalSetter } from './GoalSetter';
import { Popconfirm } from 'antd';
import { useRouter } from 'next/navigation';


export async function deleteExercise(exerciseId: string): Promise<void> {
  try {
    const response = await fetch(`/api/exercise/${exerciseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete exercise");
    }

    console.log("Exercise deleted successfully!");
  } catch (error) {
    console.error("Error deleting exercise:", error);
    throw error; // Re-throw the error so you can handle it in the component
  }
}

type CalisthenicViewProps = {
  userId: string;
  exercise: Exercise;
};

const CalisthenicView = forwardRef<HTMLDivElement, CalisthenicViewProps>(({
  userId,
  exercise
}, ref) => {
  const router = useRouter();
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

  const handleDelete = (exerciseId: string) => {
    deleteExercise(exerciseId);
    router.refresh();
  };

  return (
    <Flex direction="column" alignItems="end" fillWidth>
      {currentExercise.goal === null ? (
        <GoalSetter userId={userId} exercise={exercise} onGoalSet={updateGoal} />
      ) : (
        <Flex direction='column' fillWidth>
          <Flex justifyContent='space-between' fillWidth paddingBottom='l'>
            <CalisthenicsForm userId={userId} exercise={exercise} onCountSet={updateCount} />
            <Flex>
              <IconButton
                onClick={() => setIsHelpDialogOpen(true)}
                icon="helpCircle"
                size="l"
                tooltip="More info"
                tooltipPosition="top"
                variant="ghost"
              />
              <Popconfirm
                title="Delete the exercise"
                description="Are you sure to delete this exercise?"
                onConfirm={() => handleDelete(exercise.id)}
                placement="bottomRight"
                okText="Yes"
                cancelText="No"
              >
                <IconButton
                  icon="close"
                  size='l'
                  variant="ghost"
                />
              </Popconfirm>
            </Flex>
          </Flex>
          <CalisthenicStats userId={userId} exerciseId={exercise.id} count={currentExercise.count} goal={currentExercise.goal || 0} />
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
