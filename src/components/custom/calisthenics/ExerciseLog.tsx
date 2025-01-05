'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { Flex } from '../../generic/Flex';
import { Grid, Spinner, Text } from '../../generic';
import { List } from 'antd';
import styles from './Calisthenic.module.scss';
import classNames from 'classnames';
import dayjs from 'dayjs';

export type ExerciseLogType = {
  id: string;
  userId: string;
  count: number;
  timestamp: Date;
};

type ExerciseLogProps = {
  userId: string;
};

const ExerciseLog = forwardRef<HTMLDivElement, ExerciseLogProps>(({
  userId
}, ref) => {
  const [exerciseLogs, setExerciseLogs] = useState<Array<ExerciseLogType>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getExerciseLogsForUser(userId);
  }, [userId]);

  const getExerciseLogsForUser = async (userId: string) => {
    if (!userId) {
      console.error("UserId is required to fetch meal logs.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/exercise-log", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Fetched exercise logs:", data);

        setExerciseLogs(data);
      } else {
        console.error("Failed to fetch exercise logs for user");
      }
    } catch (error) {
      console.error("Error fetching exercise logs data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex fillWidth direction="column" style={{ gridColumn: "span 3" }}>
      <List
        loading={isLoading}
        header={<Flex justifyContent='center'>
          <Text
            variant="display-default-xs" onBackground="neutral-medium" paddingX='s'>
            Log
          </Text>
        </Flex>}
        bordered
        dataSource={exerciseLogs}
        renderItem={(item) => (
          <List.Item styles={{ extra: { borderRight: "1px solid" } }}>
            <Flex fillWidth justifyContent='space-between' alignItems='center'>
              <Text>{dayjs(item.timestamp).format('MMMM DD')}</Text>
              <Text>{item.count}</Text>
            </Flex>
          </List.Item>
        )}
      />
    </Flex>
  )
});

ExerciseLog.displayName = 'ExerciseLog';

export { ExerciseLog };
