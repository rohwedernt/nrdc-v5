'use client';

//import useTheme, { Theme } from "../hooks/useTheme";
import { useSession } from 'next-auth/react';
import { Toolbar } from "@/components/custom/toolbar/Toolbar"
import { Flex, Spinner } from "@/components/generic"


export default function HealthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = useSession();
  //const [theme] = useTheme();

  const renderContent = () => (
    (session.status === "loading") ? (
      <Spinner size="xl" />
    ) : (
      children
    )
  );

  return (
      <Flex
        //data-theme={theme as Theme}
        fillWidth paddingX="l"
        direction="column"
        alignItems="center"
        flex={1}>
        <Toolbar showNav />
        {renderContent()}
      </Flex>
  )
}
