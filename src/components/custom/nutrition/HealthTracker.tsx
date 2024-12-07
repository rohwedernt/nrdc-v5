'use client';

import React, { forwardRef } from 'react';
import { Grid } from '../../generic';
import { CategoryGroup } from './CategoryGroup';
import { CategoryCard } from './CategoryCard';
import { defaultCategoryOrder } from '@/components/resources/content';
import { CategoryAdd } from './CategoryAdd';


type Category = {
  name: string;
  unit: string;
  target: number;
  type: string | null; // Type is nullable
};

type HealthTrackerProps = {
  categories: any[]; // TODO
};

const HealthTracker = forwardRef<HTMLDivElement, HealthTrackerProps>(({
  categories
}, ref) => {
 // Assign order indices to categories
 const orderedCategories = categories.map((category, index) => ({
  ...category,
  orderIndex: defaultCategoryOrder.includes(category.name)
    ? defaultCategoryOrder.indexOf(category.name)
    : Infinity + index, // User-created categories maintain insertion order
}));

// Sort the categories
orderedCategories.sort((a, b) => a.orderIndex - b.orderIndex);

// Group categories by type after ordering
const groupedCategories = orderedCategories.reduce<Record<string, Category[]>>((acc, category) => {
  if (category.type) {
    if (!acc[category.type]) {
      acc[category.type] = [];
    }
    acc[category.type].push(category);
  }
  return acc;
}, {});

// Separate untyped categories
const untypedCategories = orderedCategories.filter((category) => !category.type);


  return (
    <Grid
      radius="l"
      columns="repeat(3, 1fr)"
      tabletColumns="1col"
      mobileColumns="1col"
      fillWidth
      gap="20">

      {Object.entries(groupedCategories).map(([type, group]) => (
        <CategoryGroup key={type} type={type} categories={group} />
      ))}

      {untypedCategories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          unit={category.unit}
          progressCount={category.progressCount}
          target={category.target}
          type={category.type}
        />
      ))}

      <CategoryAdd />
      
    </Grid>
  );
});

HealthTracker.displayName = 'HealthTracker';

export { HealthTracker };
