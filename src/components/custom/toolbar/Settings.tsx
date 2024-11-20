'use client';

import React, { forwardRef, useState } from 'react';
import { Flex } from '../../generic/Flex';
import { IconButton } from '../../generic/IconButton';
import { SegmentedControl } from '../../generic/SegmentedControl';
import { Dialog, Switch } from '../../generic';
import { FeatureSwitch } from './FeatureSwitch';
import { ThemeSelect } from './ThemeSelect';


type SettingsProps = {};

const Settings = forwardRef<HTMLDivElement, SettingsProps>(({ }, ref) => {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setIsSettingsDialogOpen(true)}
        icon="cog"
        size="xl"
        tooltip="Settings"
        tooltipPosition="bottom"
        variant="ghost"
      />

      {/* Card Dialog */}
      <Dialog
        onClose={() => setIsSettingsDialogOpen(false)}
        isOpen={isSettingsDialogOpen}
        title="Settings"
      >
        <Flex direction='column' gap="l" padding='l'>
          <ThemeSelect />
          <FeatureSwitch
            label="Enable Feature 1"
            description="Feature description"
          />
          <FeatureSwitch
            label="Enable Feature 2"
            description="Feature description"
          />
          <FeatureSwitch
            label="Enable Feature 3"
            description="Feature description"
          />
          <SegmentedControl
            buttons={[
              {
                label: 'Option 1',
                prefixIcon: '',
                suffixIcon: '',
                value: 'Option 1'
              },
              {
                label: 'Option 2',
                prefixIcon: '',
                suffixIcon: '',
                value: 'Option 2'
              },
              {
                label: 'Option 3',
                prefixIcon: '',
                suffixIcon: '',
                value: 'Option 3'
              }
            ]}
            onToggle={() => { }}
            defaultSelected="Option 1"
          />
        </Flex>
      </Dialog>
    </>
  );
});

Settings.displayName = 'Settings';

export { Settings };
