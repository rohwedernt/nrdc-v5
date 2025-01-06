'use client';

import React, { forwardRef, useEffect, useState, useMemo } from 'react';
import { Flex, Grid, IconButton, Spinner } from '../../generic';
import { CategoryGroup } from './CategoryGroup';
import { CategoryCard } from './CategoryCard';
import { defaultCategoryOrder } from '@/components/resources/content';
import { CategoryAdd } from './CategoryAdd';
import { WeekSelector } from './WeekSelector';
import { FoodForm } from './FoodForm';
import { FoodLog } from './FoodLog';
import { MoreInfoDialog } from '@/components/generic/MoreInfoDialog';
import { useRouter } from 'next/navigation';


export type Category = {
  id: string;
  name: string;
  type: string | null;
  unit: string;
  target: number;
  isDefault: boolean;
  createdAt: string;
};

type NutritionTrackerProps = {
  userId: string;
  userStartDate: string;
};

const getDefaultCurrentWeek = (): Date => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - today.getDay())); // Sunday of this week
}

const NutritionTracker = forwardRef<HTMLDivElement, NutritionTrackerProps>(({
  userId,
  userStartDate
}, ref) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesWithProgress, setCategoriesWithProgress] = useState<Array<Category & { progressCount: number }>>([]);
  const [selectedWeek, setSelectedWeek] = useState<Date>(getDefaultCurrentWeek());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);

  useEffect(() => {
    getProgressForSelectedWeek();
    getCategories();
  }, [selectedWeek]);

  const getCategories = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/nutrition/categories?userId=${userId}`);

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        setIsLoading(false);
        router.refresh();
      } else {
        console.error("Failed to fetch category data");
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const getProgressForSelectedWeek = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/nutrition/progress', {
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

  const updateCategoryWithProgress = (categoryId: string) => {
    setCategoriesWithProgress((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            progressCount: category.progressCount + 1,
          };
        }
        return category;
      })
    );
  };

  const { orderedCategories, groupedCategories, untypedCategories } = useMemo(() => {
    // Normalize category names for comparison
    const normalize = (str: string) => str.trim().toLowerCase();

    // Assign order indices to categories
    const ordered = categoriesWithProgress.map((category, index) => {
      const orderIndex = defaultCategoryOrder
        .map(normalize) // Normalize defaultCategoryOrder
        .indexOf(normalize(category.name)); // Compare with normalized category.name

      return {
        ...category,
        orderIndex: orderIndex === -1 ? Infinity + index : orderIndex, // Handle unmatched names
      };
    });

    // Sort categories
    ordered.sort((a, b) => {
      if (a.orderIndex === b.orderIndex) {
        return a.name.localeCompare(b.name); // Fallback sorting
      }
      return a.orderIndex - b.orderIndex;
    });

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
  }, [categoriesWithProgress]);

  if (isLoading) {
    return (
      <Flex fillWidth justifyContent='center'>
        <Spinner size="xl" />
      </Flex>
    );
  } else {
    return (
      <Flex direction="column" gap="24" padding="m" fillWidth>
        <FoodForm
          categories={categories}
          userId={userId}
          weekStartDate={selectedWeek}
          updateCategoryWithProgress={(category) => updateCategoryWithProgress(category)}
        />
        <Flex alignItems='end' justifyContent='space-between' fillWidth paddingX='s'>
          <WeekSelector
            userStartDate={new Date(userStartDate)}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            updateProgress={getProgressForSelectedWeek}
          />
          <Flex>
            <IconButton
              onClick={() => setIsLogDialogOpen(true)}
              icon="log"
              size="l"
              tooltip="Log"
              tooltipPosition="top"
              variant="ghost"
            />
            <IconButton
              onClick={() => setIsHelpDialogOpen(true)}
              icon="helpCircle"
              size="l"
              tooltip="More info"
              tooltipPosition="top"
              variant="ghost"
            />
          </Flex>
        </Flex>
        <Grid
          radius="l"
          columns="repeat(3, 1fr)"
          tabletColumns="2col"
          mobileColumns="1col"
          fillWidth
          gap="20"
          style={{ perspective: "800px" }}
        >

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

          <CategoryAdd userId={userId} getCategories={getCategories} />
        </Grid>
        <FoodLog userId={userId} isDialogOpen={isLogDialogOpen} setIsDialogOpen={setIsLogDialogOpen} />
        <MoreInfoDialog
          title="How to use the Nutrition Tracker"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          isDialogOpen={isHelpDialogOpen}
          setIsDialogOpen={setIsHelpDialogOpen}
        />
      </Flex>
    );
  }

});

NutritionTracker.displayName = 'NutritionTracker';

export { NutritionTracker };
