'use client';

import React, { forwardRef } from 'react';
import { Flex, Grid } from '../generic';
import { ChatBot } from './ChatBot';
import { MusicPlayer } from './MusicPlayer';
import { Travel } from './Travel';


type ModulesProps = {};

const Modules = forwardRef<HTMLDivElement, ModulesProps>(({ }, ref) => {
  return (
    <Grid
      columns="repeat(1, 1fr)"
      tabletColumns="1col"
      mobileColumns="1col"
      fillWidth
      gap="l">
      <Flex gap="l" direction="row" mobileDirection="column" fillWidth>
        <Flex gap="l" direction="column" alignItems="stretch" fillWidth>
          <MusicPlayer />
          <Travel />
        </Flex>
        <ChatBot />
      </Flex>
      {/* <Flex
        radius="l"
        shadow="s"
        padding="m"
        direction="column"
        fillWidth
        background="info-medium"
      >
        4
      </Flex> */}
    </Grid>
  );
});

Modules.displayName = 'Modules';

export { Modules };
