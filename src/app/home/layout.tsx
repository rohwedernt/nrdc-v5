'use client';

import useTheme from "../hooks/useTheme";
import { Toolbar } from "@/components/custom/Toolbar"
import { Flex } from "@/components/generic"


export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  	const [theme, setTheme] = useTheme();

  return (
    <Flex
      data-theme={theme}
      fillWidth paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}>
      <Toolbar />
      {children}
    </Flex>
  )
}
