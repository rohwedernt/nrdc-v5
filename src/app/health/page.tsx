import { auth } from "@/app/auth"
import { getUserById } from "@/db/queries/select";
import { Flex, IconButton } from "@/components/generic";
import { NutritionTracker } from "@/components/custom/nutrition/NutritionTracker";
import { Tabs, TabsProps } from 'antd';
import { AiOutlineDribbble, AiOutlineApple } from 'react-icons/ai';
import { CalisthenicsTracker, Exercise } from "@/components/custom/calisthenics/CalisthenicsTracker";
import { getExercisesByUser } from "@/db/queries/select";
import { addExercise } from "@/db/queries/insert";


async function fetchOrCreateExercises(userId?: string): Promise<Exercise[]> {
  if (!userId) {
    console.log("No userId when invoking fetchOrCreateExercises");
    return [];
  }

  try {
    const exercises = await getExercisesByUser(userId);

    if (exercises.length > 0) {
      return exercises;
    }

    const defaultExercises = [
      { name: "Push-ups", goal: null, isDefault: true },
      { name: "Crunches", goal: null, isDefault: true },
    ];

    const createdExercises = await Promise.all(
      defaultExercises.map((exercise) =>
        addExercise(userId, exercise.name, exercise.goal, exercise.isDefault)
      )
    );

    return createdExercises; // Return the created exercises
  } catch (error) {
    console.error("Error in fetchOrCreateExercises:", error);
    return []; // Always return an empty array on error
  }
}

export default async function HealthPage() {
  const session = await auth();
  const user = await getUserById(session?.user?.id ?? "");
  const exercises = (await fetchOrCreateExercises(user?.id)) ?? []; // Default to an empty array if undefined

  console.log("Server session: " + JSON.stringify(session, null, 2));

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Exercise',
      children: user && <CalisthenicsTracker userId={user.id} userExercises={exercises} />,
      icon: <AiOutlineDribbble />,
    },
    {
      key: '2',
      label: 'Nutrition',
      children: user && <NutritionTracker userId={user.id} userStartDate={user.createdAt} />,
      icon: <AiOutlineApple />,
    },
  ];

  return (
    <Flex fillWidth padding="m" direction="column">
      {(session && user) ? (
        <Tabs
          defaultActiveKey="1"
          size="large"
          style={{ marginBottom: 32 }}
          tabBarGutter={30}
          items={items}
          tabBarExtraContent={
            <IconButton
              href="mailto:rohwedernt@gmail.com?subject=Feature%20or%20Bug%20Report&body=Details:"
              icon="bug"
              tooltip="Request a feature or file a bug"
              tooltipPosition="left"
              variant="ghost"
            />
          }
        />
      ) : (
        "Please Sign in for fucks sake"
      )}
    </Flex>
  );
}
