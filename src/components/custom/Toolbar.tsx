'use client';

import React, { forwardRef, useState } from 'react';
import { Flex } from '../generic/Flex';
import { IconButton } from '../generic/IconButton';
import { SegmentedControl } from '../generic/SegmentedControl';
import { social } from "@/components/resources/config"
import useTheme, { Theme } from '@/app/hooks/useTheme';
import { Dialog, Switch } from '../generic';


type ToolbarProps = {};

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({ }, ref) => {
  const [theme, setTheme] = useTheme();
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);


  return (
    <Flex
      as="header"
      position="relative"
      fillWidth paddingTop="s"
      justifyContent="space-between">
      <Flex gap="l">
        <IconButton
          onClick={() => { }}
          icon="linkedin"
          size="l"
          tooltip="LinkedIn"
          tooltipPosition="bottom"
          variant="ghost"
          href={social.linkedin}
        />
        <IconButton
          onClick={() => { }}
          icon="github"
          size="l"
          tooltip="GitHub"
          tooltipPosition="bottom"
          variant="ghost"
          href={social.github}
        />
        <IconButton
          onClick={() => { }}
          icon="email"
          size="l"
          tooltip="Email Me"
          tooltipPosition="bottom"
          variant="ghost"
          href={social.email}
        />
      </Flex>
      <Flex gap="l">
        <SegmentedControl
          buttons={[
            {
              label: '',
              prefixIcon: 'sun',
              suffixIcon: '',
              value: 'light'
            },
            {
              label: '',
              prefixIcon: 'moon',
              suffixIcon: '',
              value: 'dark'
            }
          ]}
          onToggle={(selected) => setTheme(selected as Theme)}
          defaultSelected={"dark"}
          selected={theme.toString()}
        />
        <IconButton
          onClick={() => setIsSettingsDialogOpen(true)}
          icon="cog"
          size="xl"
          tooltip="Settings"
          tooltipPosition="bottom"
          variant="ghost"
        />
      </Flex>

      {/* Card Dialog */}
      <Dialog
        onClose={() => setIsSettingsDialogOpen(false)}
        isOpen={isSettingsDialogOpen}
        title="Settings"
      >
        <Flex direction='column' gap="l" padding='l'>
          <Switch
            label="Enable Feature"
            description="Feature description"
            isChecked={false}
            reverse
            onToggle={() => { }}
            iconButtonProps={{
              onClick: () => { },
              tooltip: 'Learn more',
              tooltipPosition: 'top'
            }}
          />
          <Switch
            label="Enable Feature"
            description="Feature description"
            isChecked={true}
            reverse
            onToggle={() => { }}
            iconButtonProps={{
              onClick: () => { },
              tooltip: 'Learn more',
              tooltipPosition: 'top'
            }}
          />
          <Switch
            label="Enable Feature"
            description="Feature description"
            isChecked={false}
            reverse
            onToggle={() => { }}
            iconButtonProps={{
              onClick: () => { },
              tooltip: 'Learn more',
              tooltipPosition: 'top'
            }}
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
    </Flex>
  );
});

Toolbar.displayName = 'Toolbar';

export { Toolbar };
