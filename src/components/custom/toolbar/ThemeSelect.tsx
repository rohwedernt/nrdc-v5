'use client';

import React, { forwardRef } from 'react';
import { SegmentedControl } from '../../generic/SegmentedControl';
import { useAppContext } from '@/app/context/AppContext';
import { updateUserSetting } from '@/app/api/settings/fetch';
import { UserSettings } from '@/app/layout';

type ThemeSelectProps = {
  userId: string;
};

const ThemeSelect = forwardRef<HTMLDivElement, ThemeSelectProps>(({ userId }, ref) => {
  const { settings, setSettings } = useAppContext();

  const handleThemeChange = async (selected: string) => {
    const newTheme = selected as 'light' | 'dark';

    // Update local settings state
    setSettings((prevSettings: UserSettings) => ({
      ...prevSettings,
      theme: newTheme,
    }));

    try {
      // Persist change in database
      const result = await updateUserSetting({
        userId,
        key: 'theme',
        value: newTheme,
      });

      if (!result.success) {
        console.error(result.message || 'Failed to update theme setting.');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  return (
    <SegmentedControl
      buttons={[
        {
          label: '',
          prefixIcon: 'sun',
          suffixIcon: '',
          value: 'light',
        },
        {
          label: '',
          prefixIcon: 'moon',
          suffixIcon: '',
          value: 'dark',
        },
      ]}
      onToggle={(selected) => handleThemeChange(selected)}
      defaultSelected={settings.theme || 'dark'}
      selected={settings.theme}
    />
  );
});

ThemeSelect.displayName = 'ThemeSelect';

export { ThemeSelect };
