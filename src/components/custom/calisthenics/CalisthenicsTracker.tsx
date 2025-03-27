'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { Dialog, Flex, IconButton } from '../../generic';
import { Button, Form, Input, Tabs } from 'antd';
import { CalisthenicView } from './CalisthenicView';
import { useRouter } from 'next/navigation';
import styles from './CalisthenicsTracker.module.scss';

export type Exercise = {
  id: string;
  name: string;
  goal: number | null;
  count: number;
  isDefault: boolean;
  createdAt: string;
};

type AddExerciseSubmission = {
  name: string;
}

type CalisthenicsTrackerProps = {
  userId: string;
  userExercises: Exercise[];
};

const CalisthenicsTracker = forwardRef<HTMLDivElement, CalisthenicsTrackerProps>(({
  userId,
  userExercises
}, ref) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [tabPosition, setTabPosition] = useState<'left' | 'top'>('left');

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setTabPosition('top');
      } else {
        setTabPosition('left');
      }
    };

    // Set initial position
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (values: AddExerciseSubmission) => {
    setIsLoadingSubmit(true);
    try {
      const response = await fetch('/api/exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          userId,
          exercises: [{
            name: values.name,
            isDefault: false
          }],
        }),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        router.refresh();
        console.log('Exercise created!');
      } else {
        console.error('Failed to create exercise.');
      }
    } catch (error) {
      console.error('Error creating exercise:', error);
    }

    setIsLoadingSubmit(false);
  };

  return (
    <Flex direction="column" gap="24" padding="s" fillWidth>
      <Tabs
        defaultActiveKey="1"
        tabPosition={tabPosition}
        items={userExercises.map((exercise, idx) => ({
          key: idx.toString(),
          label: exercise.name,
          children: <CalisthenicView userId={userId} exercise={exercise} />,
        }))}
        tabBarExtraContent={{
          left: <IconButton
            onClick={() => setIsDialogOpen(true)}
            icon="plus"
            tooltip="Add an exercise"
            tooltipPosition="top"
            variant="ghost"
            style={{ paddingBottom: window.matchMedia('(max-width: 768px)').matches ? "0" : "24px", marginRight: window.matchMedia('(max-width: 768px)').matches ? "24px" : "0" }}
            />
        }}
        className={styles.tabs}
      />
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
        title="Add Exercise"
      >
        <Form
          layout="inline"
          form={form}
          name={`add-exercise`}
          onFinish={handleSubmit}
          variant="filled"
          style={{ paddingTop: "24px" }}
        >
          <Form.Item name="name">
            <Input placeholder='Exercise name' />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoadingSubmit}
            >
              ➤
            </Button>
          </Form.Item>
        </Form>
      </Dialog>
    </Flex>
  );
});

CalisthenicsTracker.displayName = 'CalisthenicsTracker';

export { CalisthenicsTracker };
