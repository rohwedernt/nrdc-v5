'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../../generic/Flex';
import { IconButton, Text } from '../../generic';
import styles from './Category.module.scss';


type CategoryCardProps = {
  name: string;
  unit: string;
  progressCount: number;
  target: number;
  type?: string;
};

const CategoryCard = forwardRef<HTMLDivElement, CategoryCardProps>(({
  name,
  unit,
  progressCount,
  target,
  type,
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

      <Flex direction='column' justifyContent='center'>
        <Flex justifyContent='space-between' alignItems='center' gap='4' paddingTop='4' paddingX='4'>
          <IconButton
            icon="pencil"
            size="xs"
            tooltip="Edit"
            tooltipPosition="top"
            variant="ghost"
            style={{ color: 'var(--brand-on-solid-weak)', cursor: "pointer", marginLeft: "4px" }}
            />
          <IconButton
            icon="close"
            size="s"
            tooltip="Delete"
            tooltipPosition="top"
            variant="ghost"
            style={{ color: 'var(--brand-on-solid-weak)', cursor: "pointer" }}
            />
        </Flex>
        <Flex
          justifyContent='center'>
          <Text
            variant="display-default-xs" onBackground="neutral-medium">
            {!type ? name : ""}
          </Text>
        </Flex>
        <Flex
          justifyContent='center'>
          <Text
            variant="heading-strong-s" onBackground="neutral-medium">
            {type ? name : ""}
          </Text>
        </Flex>
        <Text
          variant="body-default-s" onBackground="neutral-weak" align='center'>
          {unit}
        </Text>
        <Text
          variant="display-default-s" onBackground="neutral-strong" align='center' paddingY='m'>
          {progressCount}/{target}
        </Text>
      </Flex>
    </Flex>
  );
});

CategoryCard.displayName = 'CategoryCard';

export { CategoryCard };
