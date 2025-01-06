'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../../generic/Flex';
import { Text } from '../../generic';
import styles from './Calisthenic.module.scss';
import classNames from 'classnames';
import { formatNumber } from '@/app/utils/utils';


type CalisthenicCardProps = {
  name: string;
  count: number;
  description?: string;
  shadow?: boolean;
};

const CalisthenicCard = forwardRef<HTMLDivElement, CalisthenicCardProps>(({
  name,
  count,
  description,
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
          variant="body-default-s" onBackground="neutral-weak" align='center'>
          {description}
        </Text>
        <Text
          variant="display-default-s" onBackground="neutral-strong" align='center' paddingY='m'>
          {formatNumber(count)}
        </Text>

      </Flex>
    </Flex>
  );
});

CalisthenicCard.displayName = 'CalisthenicCard';

export { CalisthenicCard };
