'use client';

import React, { forwardRef, useState } from 'react';
import { Dialog, Flex, IconButton } from '../../generic';
import { Button, Form, Input, Tabs, TabsProps } from 'antd';
import { CalisthenicView } from './CalisthenicView';
import { useRouter } from 'next/navigation';


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
        tabPosition="left"
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
            style={{ paddingBottom: "24px" }}
          />
        }}
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
