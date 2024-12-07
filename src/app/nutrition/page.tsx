import { FoodSelector } from "@/components/custom/nutrition/FoodSelector";
import { HealthTracker } from "@/components/custom/nutrition/HealthTracker";
import { Accordion, Flex } from "@/components/generic";
import { handleFoodSelection } from "@/db/queries/insert";
import { getCategories, getFoodItems, getUserWeeklyProgress } from "@/db/queries/select";
import { InputNumber } from "antd";


export async function getUserDataForCategoryCards(userId: number, weekStartDate: string) {
  const [categories, progress] = await Promise.all([
    getCategories(userId, weekStartDate),
    getUserWeeklyProgress(userId, weekStartDate),
  ]);

  // Merge categories with progress data
  const categoriesWithProgress = categories.map((category) => {
    const progressForCategory = progress.find((p) => p.categoryId === category.id);
    return {
      ...category,
      progressCount: progressForCategory ? progressForCategory.count : 0, // Default to 0 if no progress
    };
  });

  return categoriesWithProgress;
}

export default async function NutritionTracker() {
  const userId = 1; // Replace with actual user ID from session or auth
  const weekStartDate = '2024-12-1'; // Replace with logic to calculate the current week
  const foodItems = await getFoodItems(userId);
  const categories = await getUserDataForCategoryCards(userId, weekStartDate);

  return (
    <Flex fillWidth padding="xl" direction="column">
      {/* <Accordion title="Nutrition Tracker" open> */}
        <FoodSelector foodItems={foodItems} userId={userId} weekStartDate={weekStartDate} />
        <Flex padding="l">
          <HealthTracker categories={categories}  />
        </Flex>
      {/* </Accordion>
      <Accordion title="P-Ups & S-Ups Tracker">
        <Flex gap="20">
          <InputNumber min={1} defaultValue={50} changeOnWheel />
          <InputNumber min={1} defaultValue={20} changeOnWheel />
        </Flex>
      </Accordion> */}
    </Flex>
  );
}
