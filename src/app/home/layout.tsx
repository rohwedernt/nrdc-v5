import { Toolbar } from "@/components/custom/toolbar/Toolbar"
import { Flex } from "@/components/generic"


export default async function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <Flex
      fillWidth paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}>
      <Toolbar />
      {children}
    </Flex>
  )
}
