'use client';

//import useTheme, { Theme } from "../hooks/useTheme";
import { Toolbar } from "@/components/custom/toolbar/Toolbar"
import { Flex } from "@/components/generic"


export default function HealthLayout({
  children
}: {
  children: React.ReactNode
}) {
  //const [theme] = useTheme();

  return (
      <Flex
        //data-theme={theme as Theme}
        fillWidth paddingX="l"
        direction="column"
        alignItems="center"
        flex={1}>
        <Toolbar showNav />
        {children}
      </Flex>
  )
}
