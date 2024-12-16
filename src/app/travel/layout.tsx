'use client';

//import useTheme, { Theme } from "../hooks/useTheme";
import { useSession } from "next-auth/react";
import { Toolbar } from "@/components/custom/toolbar/Toolbar"
import { Flex } from "@/components/generic"


export default function TravelLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession();
  //const [theme] = useTheme();

  return (
    <Flex
      //data-theme={theme as Theme}
      fillWidth paddingX="l"
      direction="column"
      alignItems="center"
      flex={1}>
      <Toolbar authenticated={!!session} showNav />
      {children}
    </Flex>
  )
}
