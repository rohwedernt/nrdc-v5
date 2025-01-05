'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { Dialog, Flex, Spinner } from '../../generic';
import { List } from 'antd';
import dayjs from 'dayjs';
import { truncateDecimalsIfWhole } from '@/app/utils/utils';


export type FoodSubmissionLog = {
  id: string;
  userId: string;
  foodName: string;
  categoryName: string;
  count: string; // Might be a string due to numeric type handling
  timestamp: string; // Or Date, depending on your setup
};

type FoodLogProps = {
  userId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

const FoodLog = forwardRef<HTMLDivElement, FoodLogProps>(({
  userId,
  isDialogOpen,
  setIsDialogOpen
}, ref) => {
  const [mealLogs, setMealLogs] = useState<Array<FoodSubmissionLog>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getMealLogsForUser(userId);
  }, [userId]);

  const getMealLogsForUser = async (userId: string) => {
    if (!userId) {
      console.error("UserId is required to fetch meal logs.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/nutrition/log?userId=${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Fetched meal logs:", data);

        setMealLogs(data);
      } else {
        console.error("Failed to fetch meal logs for user");
      }
    } catch (error) {
      console.error("Error fetching meal logs data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      onClose={() => setIsDialogOpen(false)}
      isOpen={isDialogOpen}
      title="Food Log"
      wide
    >
      {isLoading ? <Spinner size='l' /> : (
        <List
          pagination={{ align: 'center' }}
          dataSource={mealLogs}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<span>{dayjs(item.timestamp).format('MMMM D, YYYY')}</span>}
                description={
                  <Flex justifyContent='space-between'>
                    <span>{item.foodName} {`(${item.categoryName})`}</span>
                    <span>{truncateDecimalsIfWhole(item.count)}</span>
                  </Flex>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Dialog>
  );
});

FoodLog.displayName = 'FoodLog';

export { FoodLog };
