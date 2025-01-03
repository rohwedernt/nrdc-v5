'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { Dialog, Flex, Spinner } from '../generic';
import { List } from 'antd';


type MoreInfoDialogProps = {
  title: string;
  text: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

const MoreInfoDialog = forwardRef<HTMLDivElement, MoreInfoDialogProps>(({
  title,
  text,
  isDialogOpen,
  setIsDialogOpen
}, ref) => {
  return (
    <Dialog
      onClose={() => setIsDialogOpen(false)}
      isOpen={isDialogOpen}
      title={title}
      wide
    >
      {text}
    </Dialog>
  );
});

MoreInfoDialog.displayName = 'MoreInfoDialog';

export { MoreInfoDialog };
