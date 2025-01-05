'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../../generic/Flex';
import { Text } from '../../generic';
import styles from './Calisthenic.module.scss';
import classNames from 'classnames';


type CalisthenicCardProps = {
  name: string;
  count: number;
  shadow?: boolean;
};

const CalisthenicCard = forwardRef<HTMLDivElement, CalisthenicCardProps>(({
  name,
  count,
  shadow = false
}, ref) => {
  return (
    <Flex
      fillWidth
      className={classNames(styles.container, { [styles.cardShadow]: shadow })}
      direction="column"
      justifyContent='space-around'
      border='neutral-strong'
      borderStyle='solid-1'
      radius='l'>
      <Flex direction='column' justifyContent='center' paddingTop='m'>
        <Flex
          justifyContent='center'>
          <Text
            variant={shadow ? "display-default-xs" : "heading-default-m"} onBackground="neutral-medium" align="center" paddingX='8'>
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
