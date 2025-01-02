'use client';

import React, { forwardRef, useState } from 'react';
import dayjs from 'dayjs';
import { Flex } from "@/components/generic";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
} from 'antd';


type CalisthenicSubmission = {
  count: number;
  type: string;
  date: Date;
}

type CalisthenicsFormProps = {
  userId: string;
};

const CalisthenicsForm = forwardRef<HTMLDivElement, CalisthenicsFormProps>(({
  userId,
}, ref) => {
  const [form] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  // const handleSubmit = async (values: CalisthenicSubmission) => {
  //   console.log("Calisthenic Submission: " + values);
  //   setIsLoadingSubmit(true);
  //   form.resetFields();

  //   try {
  //     const response = await fetch('/api/health/add', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json', },
  //       body: JSON.stringify({
  //         userId,
  //         count: values.count,
  //         type: values.type,
  //         timeStamp: values.date
  //       }),
  //     });

  //     if (response.ok) {
  //       console.log('Progress updated!');
  //       //updateCategoryWithProgress(values.category); // Trigger parent state update
  //     } else {
  //       console.error('Failed to update progress.');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting progress:', error);
  //   }

  //   setIsLoadingSubmit(false);
  // };

  return (
    <Flex>
      <Form
        layout="inline"
        form={form}
        name="control-hooks"
        //onFinish={handleSubmit}
        variant="filled"
        initialValues={{
          ["count"]: 1,
          ["date"]: dayjs()

        }}
      >
        <Form.Item
          name="count"
          label="Reps"
          colon={false}
          required={false}
          rules={[{ required: true }]}
          style={{ paddingTop: "8px" }}
        >
          <InputNumber keyboard style={{ width: "62px" }} />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          colon={false}
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
            //style={{ paddingTop: "8px" }}
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
