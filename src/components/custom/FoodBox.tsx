'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../generic/Flex';
import { Grid, Text } from '../generic';
import { foodType } from '../resources/content';


type FoodBoxProps = {
  title: string;
  foods: foodType[];
  boxColSpan?: number;
  boxRowSpan?: number;
  itemCols?: number;
};

const FoodBox = forwardRef<HTMLDivElement, FoodBoxProps>(({
  title,
  foods,
  boxColSpan=1,
  boxRowSpan=1,
  itemCols=1
}, ref) => {
  return (
    <Flex
      fillWidth
      //paddingY="xs"
      //gap="4"
      direction="column"
      justifyContent='space-around'
      border='neutral-strong'
      borderStyle='solid-1'
      radius='l'
      style={{ gridColumn: `span ${boxColSpan}`, gridRow: `span ${boxRowSpan}` }}>
      <Text
        variant="heading-default-xl" onBackground="neutral-strong" align='center' paddingTop='m'>
        {title}
      </Text>
      <Grid
        radius="l"
        columns={`repeat(${itemCols}, 1fr)`}
        tabletColumns="1col"
        mobileColumns="1col"
        paddingY={foods.length > 1 ? "m": undefined}
        fillWidth
        //border='neutral-strong'
        //borderStyle='solid-1'
        gap="20"
        style={{ gridColumn: `span ${itemCols}` }}>
        {foods.map((food) => (
          <Flex direction='column' justifyContent='center'>
            <Flex
              gap="12"
              justifyContent='center'>
              {/* {getLinkIcon(category)} */}
              <Text
                variant="heading-strong-s" onBackground="neutral-medium">
                {food.title && food.title}
              </Text>
            </Flex>
            <Text
              variant="body-default-s" onBackground="neutral-weak" align='center'>
              {food.unit}
            </Text>
            <Text
              variant="display-default-s" onBackground="neutral-strong" align='center' paddingY='m'>
              /{food.target}
            </Text>
          </Flex>
        ))}
      </Grid>
    </Flex>
  );
});

FoodBox.displayName = 'FoodBox';

export { FoodBox };
