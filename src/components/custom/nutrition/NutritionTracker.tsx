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
title="🍎 How To"
text={`### 🥦 What is the Nutrition Tracker and Why Use It?

  ---

Most nutrition apps focus on restricting foods, counting calories, or cutting out entire food groups. But that's not what this tool is about.

---

This nutrition tracker was designed with a different goal in mind: helping you nourish your body by ensuring you're getting the full spectrum of essential macro- and micronutrients each week. Instead of telling you what *not* to eat, this tracker helps you focus on what your body *does* need—whole, nutrient-dense foods that support energy, performance, and long-term health.

---

Many people unknowingly fall short on key nutrients like fiber, potassium, magnesium, omega-3 fatty acids, or phytonutrients—not because they eat poorly, but because they simply aren’t tracking what's missing in a meaningful way. That’s where this tracker comes in.

---

🧠 The approach is grounded in nutrition science and dietary research from fields like functional medicine, nutritional epidemiology, and public health. The default food categories and targets in this tool reflect recommendations from reputable sources such as:
- The Harvard School of Public Health
- The Mediterranean and DASH dietary patterns
- Nutrient Density Index (ANDI) and other food quality scoring systems
- Evidence-based guidelines for anti-inflammatory, gut-friendly, and cardioprotective diets

---

By aiming for weekly intake goals across diverse food categories—like leafy greens, cruciferous vegetables, whole grains, legumes, omega-rich foods, and fermented items—you’re giving your body the foundational inputs it needs to support:
- Cellular repair and regeneration
- Immune system function
- Gut health and microbiome diversity
- Cognitive performance
- Hormonal balance
- Reduced inflammation and chronic disease risk

---

It’s not about perfection. It’s about developing awareness, building habits, and making nutrition more holistic and less restrictive.

---

You can also customize your own food groups and targets if you have personal nutrition goals beyond the defaults—whether that's for athletic performance, managing specific conditions, or simply experimenting with a new way of eating.

---


---


### 🍽️ How to Use the Nutrition Tracker

---

🗂 **View Your Weekly Categories**
- The main area displays all of your nutrition categories—everything from leafy greens and proteins to nuts, seeds, and even dark chocolate.
- Each category shows your progress for the current week, with the first number representing how many portions you've logged and the second number showing your weekly goal.

---

📅 **Navigate Weeks**
- At the top of the tracker, you can select which week you want to view. This allows you to review your nutrition history and see how your habits have changed over time.

---

📝 **Add a Food Entry**
- Just above the category grid, you’ll find the food submission form.
- Type the name of the food you ate
- Select the category it belongs to
- Enter how many portions you had (the serving unit is shown for each category)
- Choose the date of the entry (defaults to today, but you can backdate it)
- Hit the submit button to log your entry—it’ll update your weekly progress immediately.

---

📖 **View the Food Log**
- Click the “Log” button to view a list of all food submissions you’ve made, including dates, categories, and portion sizes.

---

➕ **Add Custom Categories**
- Scroll to the bottom of your category list and click “Add Category” to create a custom nutrition target.
- You’ll be asked to provide:
- A category name (e.g., “Smoothies” or “Herbs & Spices”)
- A serving unit (e.g., “servings” or “tablespoons”)
- A weekly target goal

---

❌ **Delete Custom Categories**
- To remove a category you’ve added, click the small ✕ icon on the category card.
- (Note: Default categories cannot be deleted.)

---

🐞 **Report a Bug or Suggest a Feature**
- Found something that isn’t working or have an idea to make this better?
- Click the bug icon in the top-right corner of the page to submit feedback or request a new feature. We’d love to hear from you.
`}
          isDialogOpen={isHelpDialogOpen}
          setIsDialogOpen={setIsHelpDialogOpen}
        />
      </Flex>
    );
  }

});

NutritionTracker.displayName = 'NutritionTracker';

export { NutritionTracker };
