'use client';

import React, { forwardRef, useState } from 'react';
import { signOut } from "next-auth/react";
import { Dialog, DropdownOptions, Flex, UserMenu } from '@/components/generic';
import { ThemeSelect } from './ThemeSelect';
import { FeatureSelect } from './FeatureSelect';
import { useRouter } from 'next/navigation';


type CustomUserMenuProps = {
  userId: string;
  isLoading?: boolean;
  avatar?: string;
  name?: string;
  subline?: string;
};

const CustomUserMenu = forwardRef<HTMLDivElement, CustomUserMenuProps>(({
  userId,
  isLoading,
  avatar,
  name,
  subline
}, ref) => {
  const router = useRouter();
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

  const handleSettingsDialogClose = () => {
    setIsSettingsDialogOpen(false);
    router.refresh();
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
        onClose={handleSettingsDialogClose}
        isOpen={isSettingsDialogOpen}
        title="Settings"
      >
        <Flex direction='column' gap="l" padding='l'>
          <ThemeSelect userId={userId} />
          <FeatureSelect
            userId={userId}
            settingKey="backgroundMask"
            settingVals={["topLeft", "cursor"]}
            label="Background Mask Cursor"
            description="Background color will follow your cursor"
          />
        </Flex>
      </Dialog>
    </Flex>
  );
});

CustomUserMenu.displayName = 'CustomUserMenu';

export { CustomUserMenu };
