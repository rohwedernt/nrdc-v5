'use client';

import React, { useEffect } from "react";
import { useAppContext } from "@/app/context/AppContext";

export const DynamicThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useAppContext();

  useEffect(() => {
    const root = document.documentElement;

    // Update the `data-theme` dynamically
    root.setAttribute("data-theme", settings.theme);

    return () => {
      root.removeAttribute("data-theme");
    };
  }, [settings.theme]);

  return <>{children}</>;
};
