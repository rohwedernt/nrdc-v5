'use client';

import React from 'react';
import { Flex } from './Flex';
import { Spinner } from './Spinner';

export const LoadingSpinner = () => {
  return (
    <Flex 
      fillWidth 
      fillHeight 
      justifyContent="center" 
      alignItems="center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'var(--neutral-background-medium)',
        zIndex: 9999,
        opacity: 0.8,
        backdropFilter: 'blur(4px)',
      }}
    >
      <Spinner size="xl" />
    </Flex>
  );
}; 