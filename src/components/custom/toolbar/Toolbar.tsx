'use client';

import React, { forwardRef } from 'react';
import { useSession } from 'next-auth/react';
import { social } from "@/components/resources/config"
//import { Settings } from './Settings';
import { Header } from '@/components/modules';
import { Flex, IconButton } from '@/components/generic';
import { SignIn } from './SignIn';


type ToolbarProps = {
  showNav?: boolean;
};

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(({
  showNav = false
}, ref) => {
  const session = useSession();

  return (
    <Flex
      as="header"
      position="relative"
      fillWidth paddingTop="s"
      justifyContent="space-between">
      {showNav ? ( <Header authenticated={session.status === "authenticated"} /> ) : (
        <Flex gap="l">
          <IconButton
            onClick={() => { }}
            icon="linkedin"
            size="l"
            tooltip="LinkedIn"
            tooltipPosition="bottom"
            variant="ghost"
            href={social.linkedin}
          />
          <IconButton
            onClick={() => { }}
            icon="github"
            size="l"
            tooltip="GitHub"
            tooltipPosition="bottom"
            variant="ghost"
            href={social.github}
          />
          <IconButton
            onClick={() => { }}
            icon="email"
            size="l"
            tooltip="Email Me"
            tooltipPosition="bottom"
            variant="ghost"
            href={social.email}
          />
        </Flex>
      )}
      <SignIn
        sessionStatus={session.status}
        name={session.data?.user?.name ?? ""}
        subline={session.data?.user?.email ?? ""}
        avatar={session.data?.user?.image ?? ""}
      />
    </Flex>
  );
});

Toolbar.displayName = 'Toolbar';

export { Toolbar };
