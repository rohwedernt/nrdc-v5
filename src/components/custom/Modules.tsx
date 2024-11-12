'use client';

import React, { forwardRef } from 'react';
import { Flex, Grid } from '../generic';
import { ChatBot } from './ChatBot';


type ModulesProps = {};

const Modules = forwardRef<HTMLDivElement, ModulesProps>(({ }, ref) => {
  return (
    <Grid
      columns="repeat(1, 1fr)"
      tabletColumns="1col"
      mobileColumns="1col"
      fillWidth
      gap="m"
      paddingBottom="24">
      <Flex gap="m" direction="row" mobileDirection="column" fillWidth>
        <Flex gap="m" direction="column" alignItems="stretch" fillWidth>
          <Flex
            radius="l"
            padding="m"
            direction="column"
            fillWidth
            fillHeight
            background="neutral-weak"
            borderStyle="solid-1"
            border="neutral-weak"
          >
            1
          </Flex>
          <Flex
            radius="l"
            shadow="l"
            padding="m"
            direction="column"
            fillWidth
            fillHeight
            style={{ background: "linear-gradient(150deg, var(--brand-background-strong), var(--accent-background-strong))" }}
          >
            2
          </Flex>
        </Flex>
        <ChatBot />
      </Flex>
      <Flex
        radius="l"
        shadow="s"
        padding="m"
        direction="column"
        fillWidth
        background="info-medium"
      >
        4
      </Flex>
    </Grid>
  );
});

Modules.displayName = 'Modules';

export { Modules };
