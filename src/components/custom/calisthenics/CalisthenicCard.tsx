'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../../generic/Flex';
import { Text } from '../../generic';
import styles from '../nutrition/Category.module.scss';


type CalisthenicCardProps = {
  name: string;
  count: number;
};

const CalisthenicCard = forwardRef<HTMLDivElement, CalisthenicCardProps>(({
  name,
  count,
}, ref) => {
  return (
    <Flex
      fillWidth
      className={styles.container}
      direction="column"
      justifyContent='space-around'
      border='neutral-strong'
      borderStyle='solid-1'
      radius='l'>
      <Flex direction='column' justifyContent='center' paddingTop='m'>
        <Flex
          justifyContent='center'>
          <Text
            variant="display-default-xs" onBackground="neutral-medium" align="center" paddingX='8'>
            {name}
          </Text>
        </Flex>
        <Text
          variant="display-default-s" onBackground="neutral-strong" align='center' paddingY='m'>
          {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Text>
      </Flex>
    </Flex>
  );
});

CalisthenicCard.displayName = 'CalisthenicCard';

export { CalisthenicCard };
