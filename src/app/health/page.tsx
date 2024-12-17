import { auth } from "@/app/auth"
import { getFoodItems, getUserById } from "@/db/queries/select";
import { Flex } from "@/components/generic";
import { NutritionTracker } from "@/components/custom/nutrition/NutritionTracker";


export default async function HealthPage() {
  const session = await auth();
  const user = await getUserById(session?.user?.id ?? "");
  const foodItems = await getFoodItems();
  console.log("Server session: " + JSON.stringify(session, null, 2));

  return (
    <Flex fillWidth padding="xl" direction="column">
      <Flex padding="l">
        {(session && user) ? (
          <NutritionTracker userId={user.id} userStartDate={user.createdAt} foodItems={foodItems} />
        ) : (
          "Please Sign in for fucks sake"
        )}
      </Flex>
    </Flex>
  );
}
