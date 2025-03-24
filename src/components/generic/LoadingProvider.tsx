'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoadingSpinner } from './LoadingSpinner';

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleEnd = () => {
      setIsLoading(false);
    };

    // Listen for route change start
    window.addEventListener('beforeunload', handleStart);
    
    // Listen for route change end
    window.addEventListener('load', handleEnd);

    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleEnd);
    };
  }, []);

  // Reset loading state when pathname or search params change
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <LoadingSpinner />}
    </LoadingContext.Provider>
  );
}; 