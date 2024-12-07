'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../../generic/Flex';
import { Grid, IconButton, Text } from '../../generic';
import { foodType } from '../../resources/content';
import styles from './Category.module.scss';


type CategoryGroupProps = {
  type: string;
  categories: any[];
};

const CategoryGroup = forwardRef<HTMLDivElement, CategoryGroupProps>(({
  type,
  categories
}, ref) => {

  const getColsAndRows = () => {
    switch (true) {
      case (categories.length === 2):
        return {
          columns: 2,
          rows: 1
        }
      case (categories.length === 3):
        return {
          columns: 3,
          rows: 1
        }
      case (categories.length === 4):
        return {
          columns: 2,
          rows: 2
        }
      default:
        return {
          columns: 1,
          rows: 1
        }
    }
  };

  const { columns, rows } = getColsAndRows();

  return (
    <Flex
      fillWidth
      className={styles.container}
      direction="column"
      justifyContent='space-around'
      border='neutral-strong'
      borderStyle='solid-1'
      radius='l'
      style={{ gridColumn: `span ${columns}`, gridRow: `span ${rows}` }}>
      <Flex alignItems='center' justifyContent='space-between' paddingTop='s'>
        <Text
          variant="display-default-xs"
          onBackground="neutral-strong"
          align='center'
          style={{ margin: "0 auto" }}>
          {type}
        </Text>
      </Flex>
      <Grid
        radius="l"
        columns={`repeat(${columns}, 1fr)`}
        tabletColumns="1col"
        mobileColumns="1col"
        paddingY="m"
        fillWidth
        className={styles.type}
        style={{
          // @ts-ignore
          '--cols': columns,
          '--rows': rows,
          gridColumn: `span ${columns}`
        }}>
        {categories.map((category) => (
          <Flex direction='column' justifyContent='center' className={styles.item} key={category.name}>
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
                variant="heading-strong-s" onBackground="neutral-medium">
                {category.name}
              </Text>
            </Flex>
            <Text
              variant="body-default-s" onBackground="neutral-weak" align='center'>
              {category.unit}
            </Text>
            <Text
              variant="display-default-s" onBackground="neutral-strong" align='center' paddingY='m'>
              0/{category.target}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
});

CategoryGroup.displayName = 'CategoryGroup';

export { CategoryGroup };
