'use client';

import React, { forwardRef } from 'react';
import { Grid, Icon } from '../generic';
import { FoodBox } from './FoodBox';
import { nutrition, foodType } from '../resources/content';


type HealthTrackerProps = {};

const HealthTracker = forwardRef<HTMLDivElement, HealthTrackerProps>(({ }, ref) => {
  const getLinkIcon = (link: foodType) => {
    switch (true) {
      case (link.title == "Dev Goodies"):
        return <Icon size="s" name="code" />;
      case (link.title == "Music"):
        return <Icon size="s" name="music" />;
      case (link.title == "Travel"):
        return <Icon size="s" name="travel" />;
      default:
        return <Icon size="s" name="arrowUpRight" />;
    }
  };

  return (
    <Grid
      radius="l"
      columns="repeat(3, 1fr)"
      tabletColumns="1col"
      mobileColumns="1col"
      fillWidth
      gap="20">
      <FoodBox title={nutrition.proteins.title} foods={nutrition.proteins.data} boxColSpan={3} itemCols={3} />
      <FoodBox title={nutrition.grains.title} foods={nutrition.grains.data} boxColSpan={1} />
      <FoodBox title={nutrition.fruits.title} foods={nutrition.fruits.data} boxColSpan={1} />
      <FoodBox title={nutrition.eggs.title} foods={nutrition.eggs.data} boxColSpan={1} />
      <FoodBox title={nutrition.veggies.title} foods={nutrition.veggies.data} boxColSpan={2} boxRowSpan={2} itemCols={2} />
      <FoodBox title={nutrition.avocados.title} foods={nutrition.avocados.data} boxColSpan={1} />
      <FoodBox title={nutrition.legumes.title} foods={nutrition.legumes.data} boxColSpan={1} />
      <FoodBox title={nutrition.nuts.title} foods={nutrition.nuts.data} boxColSpan={1} />
      <FoodBox title={nutrition.chocolate.title} foods={nutrition.chocolate.data} boxColSpan={1} />
      <FoodBox title={nutrition.tea.title} foods={nutrition.tea.data} boxColSpan={1} />
      <FoodBox title={nutrition.fermented.title} foods={nutrition.fermented.data} boxColSpan={1} />
    </Grid>
  );
});

HealthTracker.displayName = 'HealthTracker';

export { HealthTracker };
