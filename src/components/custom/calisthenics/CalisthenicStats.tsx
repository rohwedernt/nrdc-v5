'use client';

import React, { forwardRef } from 'react';
import { Flex, Grid } from '../../generic';
import { Card } from 'antd';
import { CalisthenicCard } from './CalisthenicCard';


type CalisthenicStatsProps = {};

const CalisthenicStats = forwardRef<HTMLDivElement, CalisthenicStatsProps>(({ }, ref) => {

  return (
    <Grid
      radius="l"
      columns="repeat(3, 1fr)"
      tabletColumns="2col"
      mobileColumns="1col"
      fillWidth
      gap="20">
      <CalisthenicCard name="Completed" count={50} />
      <CalisthenicCard name="Remaining" count={9950} />
      <CalisthenicCard name="Per Day" count={28} />
    </Grid>
  );
});

CalisthenicStats.displayName = 'CalisthenicStats';

export { CalisthenicStats };
