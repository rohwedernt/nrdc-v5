'use client';

import React, { forwardRef, useState } from 'react';
import { Flex } from '../../generic/Flex';
import { Dialog, IconButton, Text } from '../../generic';
import styles from './Category.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, InputNumber } from 'antd';


type AddCategorySubmission = {
  name: string;
  unit: string;
  target: number;
}

type CategoryAddProps = {
  userId: string;
  getCategories: () => void;
};

const CategoryAdd = forwardRef<HTMLDivElement, CategoryAddProps>(({
  userId,
  getCategories
 }, ref) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const handleSubmit = async (values: AddCategorySubmission) => {
    setIsLoadingSubmit(true);
    try {
      const response = await fetch('/api/nutrition/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          userId,
          name: values.name,
          unit: values.unit,
          target: values.target
        }),
      });

      if (response.ok) {
        getCategories();
        form.resetFields();
        setIsDialogOpen(false);

        console.log('Category created!');
      } else {
        console.error('Failed to create category.');
      }
    } catch (error) {
      console.error('Error creating category:', error);
    }

    setIsLoadingSubmit(false);
  };

  return (
    <>
      <Flex
        fillWidth
        className={classNames(styles.add)}
        direction="column"
        justifyContent='center'
        alignItems='center'
        border='neutral-strong'
        borderStyle='solid-1'
        radius='l'
        style={{ cursor: "pointer" }}
        onClick={() => setIsDialogOpen(true)}
      >
        <Text variant="display-default-xl" onBackground="neutral-medium">
          +
        </Text>
      </Flex>
      <Dialog
        onClose={() => setIsDialogOpen(false)}
        isOpen={isDialogOpen}
        title="Add Category"
      >
        <Form
          layout="vertical"
          form={form}
          name={`add-category`}
          onFinish={handleSubmit}
          variant="filled"
          style={{ paddingTop: "24px" }}
        >
          <Form.Item
            name="name"
            required={true}
            rules={[{ required: true }]}
          >
            <Input placeholder='Category name' maxLength={15} />
          </Form.Item>
          <Form.Item
            name="unit"
            required={true}
            rules={[{ required: true }]}
          >
            <Input placeholder='Servings unit' maxLength={40} />
          </Form.Item>
          <Form.Item
            name="target"
            required={true}
            rules={[{ required: true }]}
          >
            <InputNumber placeholder='Weekly target' min={1} max={100} style={{ width: "60%" }} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoadingSubmit}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Dialog>
    </>
  );
});

CategoryAdd.displayName = 'CategoryAdd';

export { CategoryAdd };
