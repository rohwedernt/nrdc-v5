'use client';

import React, { forwardRef, useState } from 'react';
import { Flex, IconButton, Text } from '../../generic';
import { CalisthenicsForm } from './CalisthenicsForm';
import { CalisthenicStats } from './CalisthenicStats';
import { Alert, Button, InputNumber } from 'antd';
import { MoreInfoDialog } from '@/components/generic/MoreInfoDialog';


type CalisthenicViewProps = {
  userId: string;
};

const CalisthenicView = forwardRef<HTMLDivElement, CalisthenicViewProps>(({
  userId
}, ref) => {
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);

  return (
    <Flex direction='column'>
      <Alert
        message="To get started set an annual goal for this exercise 😎"
        description={
          <Flex fillWidth justifyContent='start' paddingTop='s'>
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
          onClick={() => setIsHelpDialogOpen(true)}
          icon="helpCircle"
          size="l"
          tooltip="More info"
          tooltipPosition="top"
          variant="ghost"
        />
      </Flex>
      <CalisthenicStats />
      <MoreInfoDialog
          title="How to use the Calisthenics Tracker"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isDialogOpen={isHelpDialogOpen}
          setIsDialogOpen={setIsHelpDialogOpen}
        />
    </Flex>
  );
});

CalisthenicView.displayName = 'CalisthenicView';

export { CalisthenicView };
