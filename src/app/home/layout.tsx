//import useTheme, { Theme } from "../hooks/useTheme";
import { auth } from "@/app/auth"
import { Toolbar } from "@/components/custom/toolbar/Toolbar"
import { Flex } from "@/components/generic"


export default async function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  //const [theme] = useTheme();
  const session = await auth();

  return (
    <Flex
      //data-theme={theme as Theme}
      fillWidth paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}>
      <Toolbar />
      {children}
    </Flex>
  )
}
