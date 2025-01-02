'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { Flex, IconButton, Text } from '../../generic';
import { CalisthenicsForm } from './CalisthenicsForm';
import { CalisthenicStats } from './CalisthenicStats';
import { Alert, Button, InputNumber } from 'antd';


type CalisthenicViewProps = {
  userId: string;
};

const CalisthenicView = forwardRef<HTMLDivElement, CalisthenicViewProps>(({
  userId
}, ref) => {

  return (
    <Flex direction='column'>
      <Alert
        message="To get started set an annual goal for this exercise 😎"
        description={
          <Flex fillWidth justifyContent='center' paddingTop='s'>
            <Text variant="display-default-xs" style={{ fontStyle: 'italic' }} paddingRight='s'>I will do </Text>
            <InputNumber size="large" defaultValue={10000} />
            <Text variant="display-default-xs" style={{ fontStyle: 'italic' }} paddingX='s'>reps this year</Text>
            <Button
              type="default"
              htmlType="submit"
              size="large"
              loading={false}
            >
              ✓
            </Button>
          </Flex>
        }
        type="info"
        showIcon
      />
      <Flex justifyContent='space-between' fillWidth paddingY='m'>
        <CalisthenicsForm userId={userId} />
        <IconButton
          icon="helpCircle"
          size="l"
          tooltip="More info"
          tooltipPosition="top"
          variant="ghost"
        />
      </Flex>
      <CalisthenicStats />
    </Flex>
  );
});

CalisthenicView.displayName = 'CalisthenicView';

export { CalisthenicView };
