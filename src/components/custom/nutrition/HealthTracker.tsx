'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { Flex, Grid, Spinner } from '../../generic';
import { CategoryGroup } from './CategoryGroup';
import { CategoryCard } from './CategoryCard';
import { defaultCategoryOrder } from '@/components/resources/content';
import { CategoryAdd } from './CategoryAdd';
import { WeekSelector } from './WeekSelector';
import { FoodItem, FoodSelector } from './FoodSelector';


type Category = {
  name: string;
  unit: string;
  target: number;
  type: string | null; // Type is nullable
};

type HealthTrackerProps = {
  userId: number;
  userStartDate: string;
  foodItems: Array<FoodItem>;
};

const getDefaultCurrentWeek = (): Date => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - today.getDay())); // Sunday of this week
}

const HealthTracker = forwardRef<HTMLDivElement, HealthTrackerProps>(({
  userId,
  userStartDate,
  foodItems
}, ref) => {
  const [categoriesWithProgress, setCategoriesWithProgress] = useState<Array<Category & { progressCount: number }>>([]);
  const [selectedWeek, setSelectedWeek] = useState<Date>(getDefaultCurrentWeek());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getProgressForSelectedWeek();
  }, [selectedWeek]);

  const getProgressForSelectedWeek = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/health/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, selectedWeek }),
      });

      if (response.ok) {
        const data = await response.json();

        // Ensure `progressCount` is 0 if null
        const normalizedData = data.map((category: Category & { progressCount: number | null }) => ({
          ...category,
          progressCount: category.progressCount ?? 0, // Default progress to 0
        }));

        setCategoriesWithProgress(normalizedData);

        setIsLoading(false);
      } else {
        console.error("Failed to fetch progress data");
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  // Callback to update a single category's progress
  const updateCategoriesWithProgress = (selectedFoods: string[]) => {
    setCategoriesWithProgress((prev) =>
      prev.map((category) =>
        selectedFoods.includes(category.name)
          ? { ...category, progressCount: category.progressCount + 1 }
          : category
      )
    );
  };

  // Memoize ordered and grouped categories to avoid unnecessary recalculations
  const { orderedCategories, groupedCategories, untypedCategories } = useMemo(() => {
    // Assign order indices to categories
    const ordered = categoriesWithProgress.map((category, index) => ({
      ...category,
      orderIndex: defaultCategoryOrder.includes(category.name)
        ? defaultCategoryOrder.indexOf(category.name)
        : Infinity + index, // User-created categories maintain insertion order
    }));

    // Sort the categories
    ordered.sort((a, b) => a.orderIndex - b.orderIndex);

    // Group categories by type
    const grouped = ordered.reduce<Record<string, Category[]>>((acc, category) => {
      if (category.type) {
        if (!acc[category.type]) {
          acc[category.type] = [];
        }
        acc[category.type].push(category);
      }
      return acc;
    }, {});

    // Separate untyped categories
    const untyped = ordered.filter((category) => !category.type);

    return {
      orderedCategories: ordered,
      groupedCategories: grouped,
      untypedCategories: untyped,
    };
  }, [categoriesWithProgress]); // Only recalculate when categoriesWithProgress changes

  if (isLoading) {
    return (
      <Flex fillWidth justifyContent='center'>
        <Spinner size="xl" />
      </Flex>
    );
  } else {
    return (
      <Flex direction="column" gap="8" fillWidth>
        <FoodSelector
          foodItems={foodItems}
          userId={userId}
          weekStartDate={selectedWeek}
          updateCategoriesWithProgress={updateCategoriesWithProgress} // Pass callback
        />
        <WeekSelector
          userStartDate={new Date(userStartDate)}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          updateProgress={getProgressForSelectedWeek}
        />
        <Grid
          radius="l"
          columns="repeat(3, 1fr)"
          tabletColumns="2col"
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
              type={category.type ?? undefined} // Convert null to undefined
            />
          ))}

          <CategoryAdd />
        </Grid>
      </Flex>
    );
  }

});

HealthTracker.displayName = 'HealthTracker';

export { HealthTracker };
