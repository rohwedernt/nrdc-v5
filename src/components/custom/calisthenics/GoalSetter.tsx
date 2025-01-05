'use client';

import React, { forwardRef, useState } from 'react';
import { Flex, Text, RevealFx } from '../../generic';
import { Form, Slider, Button } from 'antd';
import { Exercise } from './CalisthenicsTracker';


type GoalSubmission = {
  goal: number;
}

type GoalSetterProps = {
  userId: string;
  exercise: Exercise;
  onGoalSet: (newGoal: number) => void;
};

const GoalSetter = forwardRef<HTMLDivElement, GoalSetterProps>(({
  userId,
  exercise,
  onGoalSet
}, ref) => {
  const [form] = Form.useForm();
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (values: GoalSubmission) => {
    console.log("Goal Submission (goal): " + JSON.stringify(values, null, 2));
    console.log("Goal Submission (id): " + JSON.stringify(exercise, null, 2));

    setIsLoading(true);

    try {
      const response = await fetch('/api/exercise', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          userId,
          exerciseId: exercise.id,
          goal: values.goal,
        }),
      });

      if (response.ok) {
        console.log('Goal updated!');
        onGoalSet(values.goal);
      } else {
        console.error('Failed to update goal.');
      }
    } catch (error) {
      console.error('Error submitting goal:', error);
    }

    setIsLoading(false);
  };

  return (

        <Flex direction="column" fillWidth paddingY='l'>
          <RevealFx
            speed="medium"
            delay={0}
            translateY={0}
          >
            <Flex fillWidth paddingBottom='xl' justifyContent='center'>
              <Text variant="display-default-xxs">
                To get started set a goal for this exercise for the calendar year
              </Text>
            </Flex>
          </RevealFx>


          <Form
            form={form}
            name={`set-goal-${exercise.id}`}
            onFinish={handleSubmit}
            initialValues={{ ["goal"]: 10000 }}
          >
            <Form.Item name="goal" style={{ marginBottom: 0 }}>
              <Slider autoFocus min={1000} max={50000} step={100} />
            </Form.Item>
            <Flex fillWidth justifyContent='center'>
              <Text variant="label-default-m" onBackground="neutral-medium" style={{ fontStyle: "italic" }}>
                (number of total reps)
              </Text>
            </Flex>

            <Flex fillWidth justifyContent='center' paddingTop='l'>
              <Form.Item style={{ paddingTop: "8px" }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>SET</Button>
              </Form.Item>

            </Flex>
          </Form>


        </Flex>

  );
});

GoalSetter.displayName = 'GoalSetter';

export { GoalSetter };
