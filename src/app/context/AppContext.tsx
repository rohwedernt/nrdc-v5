"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserSettings } from "../layout";

// Define the shape of the context value
interface AppContextValue {
  settings: UserSettings;
  setSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}

// Create the context with a default value of null
const AppContext = createContext<AppContextValue | null>(null);

// Define the provider component
interface AppContextProviderProps {
  initialSettings: any; // Replace `any` with the type for settings
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  initialSettings,
  children,
}) => {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};
