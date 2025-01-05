'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { Flex, IconButton, Spinner } from '../../generic';
import { Tabs, TabsProps } from 'antd';
import { CalisthenicView } from './CalisthenicView';


export type Exercise = {
  id: string;
  name: string;
  goal: number | null;
  count: number;
  isDefault: boolean;
  createdAt: string;
};

type CalisthenicsTrackerProps = {
  userId: string;
  userExercises: Exercise[];
};

const CalisthenicsTracker = forwardRef<HTMLDivElement, CalisthenicsTrackerProps>(({
  userId,
  userExercises
}, ref) => {
  const [exercises, setExercises] = useState<Exercise[]>(userExercises);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setExercises(userExercises)
  // }, []);

  // const fetchOrCreateExercises = async () => {
  //   try {
  //     // Fetch user's exercises
  //     const response = await fetch("/api/exercise", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "user-id": userId, // Pass userId in headers
  //       },
  //     });

  //     if (response.ok) {
  //       const data: Exercise[] = await response.json();

  //       console.log("DATA: " + JSON.stringify(data, null, 2));
  //       debugger;

  //       if (data && data.length > 0) {
  //         // User already has exercises, set them
  //         setExercises(data);
  //       } else {
  //         // No exercises, create default exercises
  //         const defaults = [
  //           { name: "Push-ups", goal: null, isDefault: true },
  //           { name: "Crunches", goal: null, isDefault: true },
  //         ];

  //         const createResponse = await fetch("/api/exercise", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ userId, exercises: defaults }),
  //         });

  //         if (createResponse.ok) {
  //           const createdData: Exercise[] = await createResponse.json();
  //           setExercises(createdData); // Set the created exercises
  //         } else {
  //           console.error("Failed to create default exercises");
  //         }
  //       }
  //     } else {
  //       console.error("Failed to fetch exercises");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching or creating exercises:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  if (isLoading) {
    return (
      <Flex fillWidth justifyContent='center'>
        <Spinner size="xl" />
      </Flex>
    );
  } else {
    return (
      <Flex direction="column" gap="24" padding="m" fillWidth>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          items={userExercises.map((exercise, idx) => ({
            key: idx.toString(),
            label: exercise.name,
            children: <CalisthenicView userId={userId} exercise={exercise} />,
          }))}
          tabBarExtraContent={
            <IconButton
              icon="plus"
              tooltip="Add an exercise"
              tooltipPosition="top"
              variant="ghost"
            />
          }
        />
      </Flex>
    );
  }
});

CalisthenicsTracker.displayName = 'CalisthenicsTracker';

export { CalisthenicsTracker };
