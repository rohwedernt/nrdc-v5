'use client';

import React, { forwardRef } from 'react';
import { SegmentedControl } from '../../generic/SegmentedControl';
import useTheme, { Theme } from '@/app/hooks/useTheme';


type ThemeSelectProps = {};

const ThemeSelect = forwardRef<HTMLDivElement, ThemeSelectProps>(({ }, ref) => {
  const [theme, setTheme] = useTheme();

  return (
    <SegmentedControl
      buttons={[
        {
          label: 's',
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
  );
});

ThemeSelect.displayName = 'ThemeSelect';

export { ThemeSelect };
