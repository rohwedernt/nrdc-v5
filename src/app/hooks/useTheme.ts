'use client';

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const useTheme = (): [Theme, React.Dispatch<React.SetStateAction<Theme>>] => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (currentTheme: Theme) => {
      root.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
    };

    applyTheme(theme);

    console.log("Theme changed to " + theme);
    return () => {
      root.removeAttribute('data-theme');
    };

  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
