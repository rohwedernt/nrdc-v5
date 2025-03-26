'use client';

import React, { forwardRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Flex } from "@/components/generic";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  TreeSelect,
} from 'antd';
import { Category } from './NutritionTracker';

// Initialize dayjs with UTC plugin
dayjs.extend(utc);

type TreeNode = {
  title: string;
  value: string;
  children?: TreeNode[];
  selectable?: boolean
};

type FoodSubmission = {
  category: string;
  count: number;
  food: string;
  date: Date;
}

type FoodFormProps = {
  categories: Category[];
  userId: string;
  weekStartDate: Date;
  updateCategoryWithProgress: (category: string) => void;
};

function shapeCategoriesForTreeSelect(categories: Category[]): TreeNode[] {
  const groupedCategories: Record<string, TreeNode> = categories.reduce(
    (acc: Record<string, TreeNode>, category: Category) => {
      if (!category.type) {
        // Categories with `type` as null are root nodes
        acc[category.id] = {
          title: category.name,
          value: category.id,
          children: [],
        };
      } else {
        // Categories with a `type` are children of that `type`
        if (!acc[category.type]) {
          acc[category.type] = {
            title: category.type,
            value: category.type,
            children: [],
            selectable: false,
          };
        }
        acc[category.type].children!.push({
          title: category.name,
          value: category.id,
        });
      }
      return acc;
    },
    {}
  );

  // Sort root nodes and their children alphabetically by title
  const sortedCategories = Object.values(groupedCategories)
    .map((group) => ({
      ...group,
      children: group.children?.sort((a, b) => a.title.localeCompare(b.title)) || [],
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return sortedCategories;
}

const FoodForm = forwardRef<HTMLDivElement, FoodFormProps>(({
  categories,
  userId,
  weekStartDate,
  updateCategoryWithProgress
}, ref) => {
  const [form] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  // const onFinish = (values: FoodSubmission) => {
  //   console.log(values);
  //   form.resetFields();
  // };

  const handleSubmit = async (values: FoodSubmission) => {
    console.log("Food Submission: " + values);
    setIsLoadingSubmit(true);
    form.resetFields();

    try {
      // Convert the local date to UTC
      const utcTimestamp = dayjs(values.date).utc().toISOString();

      const response = await fetch('/api/nutrition/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          userId,
          weekStartDate,
          categoryId: values.category,
          count: values.count,
          foodName: values.food,
          timeStamp: utcTimestamp
        }),
      });

      if (response.ok) {
        console.log('Progress updated!');
        updateCategoryWithProgress(values.category); // Trigger parent state update
      } else {
        console.error('Failed to update progress.');
      }
    } catch (error) {
      console.error('Error submitting progress:', error);
    }

    setIsLoadingSubmit(false);
  };

  return (
    <Flex
      justifyContent="center"
      border="neutral-medium"
      padding='m'
      fillWidth
      style={{ borderBottom: "1px solid var(--neutral-border-medium)" }}
    >
      <Form
        layout="inline"
        form={form}
        name="control-hooks"
        onFinish={handleSubmit}
        variant="filled"
        initialValues={{
          ["count"]: 1,
          ["date"]: dayjs()

        }}
      >
        <Form.Item
          name="food"
          label="Food"
          colon={false}
          required={false}
          rules={[{ required: true }]}
          style={{ paddingTop: "8px" }}
        >
          <Input
            placeholder="What did you eat?"
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          colon={false}
          required={false}
          rules={[{ required: true }]}
          style={{ paddingTop: "8px" }}
        >
          <TreeSelect
            showSearch
            style={{ minWidth: 180 }}
            //value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Select a category"
            allowClear
            treeDefaultExpandAll
            //onChange={onChange}
            treeData={shapeCategoriesForTreeSelect(categories)}
          />
        </Form.Item>
        <Form.Item
          name="count"
          label="#"
          colon={false}
          required={false}
          rules={[{ required: true }]}
          style={{ paddingTop: "8px" }}
        >
          <InputNumber
            keyboard
            step={0.5}
            min={0}
            max={5}
            formatter={(value) => {
              if (value === undefined || value === null) return ''; // Handle undefined or null
              const parsedValue = parseFloat(value.toString());
              return Number.isInteger(parsedValue) ? `${parsedValue}` : `${parsedValue.toFixed(1)}`;
            }}
          />
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
            style={{ paddingTop: "8px" }}
          >
            ➤
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
});

FoodForm.displayName = 'FoodForm';

export { FoodForm };
