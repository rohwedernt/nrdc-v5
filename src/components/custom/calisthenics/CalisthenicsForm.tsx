'use client';

import React, { forwardRef, useState } from 'react';
import dayjs from 'dayjs';
import { Flex } from "@/components/generic";
import {
  Button,
  DatePicker,
  Form,
  InputNumber
} from 'antd';
import { Exercise } from './CalisthenicsTracker';


type CalisthenicSubmission = {
  count: number;
  date: Date;
}

type CalisthenicsFormProps = {
  userId: string;
  exercise: Exercise;
  onCountSet: (newGoal: number) => void;
};

const CalisthenicsForm = forwardRef<HTMLDivElement, CalisthenicsFormProps>(({
  userId,
  exercise,
  onCountSet
}, ref) => {
  const [form] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const handleSubmit = async (values: CalisthenicSubmission) => {
    console.log("Calisthenic Submission: " + JSON.stringify(values, null, 2));
    setIsLoadingSubmit(true);
    form.resetFields();

    try {
      const response = await fetch('/api/exercise', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          userId,
          exerciseId: exercise.id,
          count: values.count,
          timestamp: values.date
        }),
      });

      if (response.ok) {
        console.log('Count updated!');
        onCountSet(values.count); // Trigger parent state update
      } else {
        console.error('Failed to update count.');
      }
    } catch (error) {
      console.error('Error submitting count:', error);
    }

    setIsLoadingSubmit(false);
  };

  return (
    <Flex>
      <Form
        layout="inline"
        form={form}
        name={`add-reps-${exercise.id}`}
        onFinish={handleSubmit}
        variant="filled"
        initialValues={{
          ["count"]: 50,
          ["date"]: dayjs()

        }}
      >
        <Form.Item
          name="count"
          label="Reps"
          required={false}
          rules={[{ required: true }]}
          style={{ paddingTop: "8px" }}
        >
          <InputNumber keyboard style={{ width: "62px" }} />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          required={false}
          rules={[{ required: true }]}
          style={{ paddingTop: "8px" }}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item style={{ paddingTop: "8px" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoadingSubmit}
          >
            +
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
});

CalisthenicsForm.displayName = 'CalisthenicsForm';

export { CalisthenicsForm };
