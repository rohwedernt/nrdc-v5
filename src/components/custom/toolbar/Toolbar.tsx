'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../../generic/Flex';
import { IconButton } from '../../generic/IconButton';
import { social } from "@/components/resources/config"
import { Settings } from './Settings';
import { SignIn } from './SignIn';
import { Header } from '@/components/modules';


type ToolbarProps = {
  showNav?: boolean;
};

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({
  showNav = false
}, ref) => {
  return (
    <Flex
      as="header"
      position="relative"
      fillWidth paddingTop="s"
      justifyContent="space-between">
      {showNav ? (
        <Header
          authenticated={false}
          name="Scott"
          subline="Infinite Inc."
          avatar="/images/demos/avatar_01.png"
        />
      ) : (
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
      )}
      <Flex gap="m">
        {!showNav && (
          <IconButton
            icon="person"
            size="xl"
            tooltip="Login"
            tooltipPosition="bottom"
            variant="ghost"
          />
        )}

        <Settings />
        {/* <SignIn /> */}
      </Flex>
    </Flex>
  );
});

Toolbar.displayName = 'Toolbar';

export { Toolbar };
