'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../generic/Flex';
import { IconButton } from '../generic/IconButton';
import { SegmentedControl } from '../generic/SegmentedControl';
import { social } from "@/components/resources/config"


type ToolbarProps = {};

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({ }, ref) => {
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
            value: 'Light'
          },
          {
            label: '',
            prefixIcon: 'moon',
            suffixIcon: '',
            value: 'Dark'
          },
          {
            label: '',
            prefixIcon: 'laptop',
            suffixIcon: '',
            value: 'System'
          }
        ]}
        onToggle={() => { }}
        defaultSelected="Dark"
      />
      <IconButton
        onClick={() => { }}
        icon="cog"
        size="xl"
        tooltip="Settings"
        tooltipPosition="bottom"
        variant="ghost"
      />
    </Flex>
  </Flex>
  );
});

Toolbar.displayName = 'Toolbar';

export { Toolbar };
