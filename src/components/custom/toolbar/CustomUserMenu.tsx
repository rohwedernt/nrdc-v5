'use client';

import React, { forwardRef, useState } from 'react';
import { signOut } from "next-auth/react";
import { Dialog, DropdownOptions, Flex, SegmentedControl, UserMenu } from '@/components/generic';
import { FeatureSwitch } from './FeatureSwitch';
import { ThemeSelect } from './ThemeSelect';


type CustomUserMenuProps = {
  isLoading?: boolean;
  avatar?: string;
  name?: string;
  subline?: string;
};

const CustomUserMenu = forwardRef<HTMLDivElement, CustomUserMenuProps>(({
  isLoading,
  avatar,
  name,
  subline
}, ref) => {
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);


  const handleOptionSelect = (option: DropdownOptions) => {
    switch (option.value) {
      case 'profile':
        return console.log("Action not implemented");
      case 'settings':
        return setIsSettingsDialogOpen(true);
      case 'logout':
        return signOut({ redirectTo: "/home" });
      default:
        return console.log("Action not implemented");
    }
  }

  return (
    <Flex as="nav">
      <Flex
        hide="s">
        <UserMenu
          name={name}
          subline={subline}
          avatarProps={{
            empty: !avatar,
            src: avatar
          }}
          loading={isLoading}
          dropdownOptions={[
            {
              label: 'Settings',
              value: 'settings'
            },
            {
              label: 'Log out',
              value: 'logout'
            }
          ]}
          dropdownProps={{ onOptionSelect: handleOptionSelect }}
        />
      </Flex>
      <Flex
        show="s">
        <UserMenu
          avatarProps={{
            empty: !avatar,
            src: avatar
          }}
          dropdownOptions={[
            {
              label: 'Settings',
              value: 'settings'
            },
            {
              label: 'Log out',
              value: 'logout'
            }
          ]}
        />
      </Flex>

      {/* Settings Dialog */}
      <Dialog
        onClose={() => setIsSettingsDialogOpen(false)}
        isOpen={isSettingsDialogOpen}
        title="Settings"
      >
        <Flex direction='column' gap="l" padding='l'>
          {/* <ThemeSelect /> */}
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
    </Flex>
  );
});

CustomUserMenu.displayName = 'CustomUserMenu';

export { CustomUserMenu };
