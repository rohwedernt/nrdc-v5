'use client';

import React, { forwardRef } from 'react';
import { Dialog } from '../generic';
import Markdown from 'react-markdown';


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
      <Markdown>{text}</Markdown>
    </Dialog>
  );
});

MoreInfoDialog.displayName = 'MoreInfoDialog';

export { MoreInfoDialog };
