import { FoodSelector } from "@/components/custom/nutrition/FoodSelector";
import { HealthTracker } from "@/components/custom/nutrition/HealthTracker";
import { WeekSelector } from "@/components/custom/nutrition/WeekSelector";
import { Accordion, Flex } from "@/components/generic";
import { handleFoodSelection } from "@/db/queries/insert";
import { getCategories, getFoodItems, getUserById, getUserWeeklyProgress } from "@/db/queries/select";
import { InputNumber, Radio } from "antd";


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
  const user = await getUserById(userId);
  const foodItems = await getFoodItems(userId);
  const categories = await getUserDataForCategoryCards(userId, weekStartDate);

  return (
    <Flex fillWidth padding="xl" direction="column">
      {/* <Accordion title="Nutrition Tracker" open> */}
      <FoodSelector foodItems={foodItems} userId={userId} weekStartDate={weekStartDate} />
      {user && <WeekSelector userStartDate={user?.createdAt} />}
      <Flex padding="l">
        <HealthTracker categories={categories} />
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
