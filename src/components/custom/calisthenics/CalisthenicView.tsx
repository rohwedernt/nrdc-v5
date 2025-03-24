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
            title="How To"
            text={`🏋️‍♂️ **Calisthenics Tracker Overview**

The Calisthenics Tracker is designed to help you build long-term consistency with your workouts. Inspired by challenges like _10,000 push-ups in a year_, this simple tool keeps you motivated toward an annual rep goal.

---

🛠 **How It Works**

- ✅ The tool starts with two default exercises: Push-ups and Crunches, each with a target of 10,000 reps per year.
- ❌ You can remove any exercise you don't want by clicking the **X** icon in the top right corner of the exercise card.
- ➕ Add new exercises by clicking the plus button at the top. Enter a name and target, and it’ll appear as a new tab.
- 📝 Use the form at the top of each exercise view to log reps. The date defaults to today but you can backdate entries if needed.

---

📜 **Exercise Log**

- Every submission is recorded in a log so you can track your consistency over time.

---

🐞 **Feedback?**

- Use the bug icon in the top right to report issues or request features.`}
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
