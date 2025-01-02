'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { Flex, Grid, Spinner } from '../../generic';
import { defaultCategoryOrder } from '@/components/resources/content';
import { CalisthenicsForm } from './CalisthenicsForm';
import { Tabs, TabsProps } from 'antd';
import { CalisthenicView } from './CalisthenicView';


export type Category = {
  id: string;
  name: string;
  type: string | null;
  unit: string;
  target: number;
  isDefault: boolean;
  createdAt: string;
};

type CalisthenicsTrackerProps = {
  userId: string;
};

const CalisthenicsTracker = forwardRef<HTMLDivElement, CalisthenicsTrackerProps>(({
  userId,
}, ref) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userExercises: TabsProps['items'] = [
    {
      key: '1',
      label: 'Push-ups',
      children: <CalisthenicView userId={userId} />,
    },
    {
      key: '2',
      label: 'Crunches',
      children: <CalisthenicView userId={userId} />,
    }
  ];

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
          //style={{ height: 220 }}
          items={userExercises}
        />
      </Flex>
    );
  }

});

CalisthenicsTracker.displayName = 'CalisthenicsTracker';

export { CalisthenicsTracker };
