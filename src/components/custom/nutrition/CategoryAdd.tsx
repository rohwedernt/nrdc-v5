'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../../generic/Flex';
import { IconButton, Text } from '../../generic';
import styles from './Category.module.scss';
import classNames from 'classnames';


type CategoryAddProps = {};

const CategoryAdd = forwardRef<HTMLDivElement, CategoryAddProps>(({ }, ref) => {
  return (
    <Flex
      fillWidth
      className={classNames(styles.container, styles.add)}
      direction="column"
      justifyContent='center'
      alignItems='center'
      border='neutral-strong'
      borderStyle='solid-1'
      radius='l'
      style={{ cursor: "pointer" }}>
      <Text variant="display-default-xl" onBackground="neutral-medium">
        +
      </Text>
    </Flex>
  );
});

CategoryAdd.displayName = 'CategoryAdd';

export { CategoryAdd };
