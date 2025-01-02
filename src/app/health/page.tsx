import { auth } from "@/app/auth"
import { getUserById } from "@/db/queries/select";
import { Flex, Icon, IconButton } from "@/components/generic";
import { NutritionTracker } from "@/components/custom/nutrition/NutritionTracker";
import { Tabs, TabsProps } from 'antd';
import { AiOutlineDribbble, AiOutlineApple } from 'react-icons/ai';
import { CalisthenicsTracker } from "@/components/custom/calisthenics/CalisthenicsTracker";



export default async function HealthPage() {
  const session = await auth();
  const user = await getUserById(session?.user?.id ?? "");
  console.log("Server session: " + JSON.stringify(session, null, 2));

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Nutrition',
      children: user && <NutritionTracker userId={user.id} userStartDate={user.createdAt} />,
      icon: <AiOutlineApple />,
    },
    {
      key: '2',
      label: 'Calisthenics',
      children: user && <CalisthenicsTracker userId={user.id} />,
      icon: <AiOutlineDribbble />,
    }
  ];

  return (
    <Flex fillWidth padding="m" direction="column">
      {/* <Flex> */}
      {(session && user) ? (
        <Tabs
          defaultActiveKey="1"
          //type="card"
          size="large"
          style={{ marginBottom: 32 }}
          tabBarGutter={30}
          items={items}
          tabBarExtraContent={
            <IconButton
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
      {/* </Flex> */}
    </Flex>
  );
}
