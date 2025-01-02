'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from "next-auth/react";
import { Button, Dialog, Flex } from '@/components/generic';
import { CustomUserMenu } from './CustomUserMenu';


type SignInProps = {};

const SignIn = forwardRef<HTMLDivElement, SignInProps>(({}, ref) => {
  const { data: session, status } = useSession(); // Adjust to match your session setup
  const [content, setContent] = useState<JSX.Element | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const getUserMetaData = () => {
    const user = session?.user || {};
    return {
      userId: user.id || '0',
      username: user.name || 'Unknown',
      userEmail: user.email || 'Unknown',
      userAvatar: user.image || undefined,
    };
  };

  useEffect(() => {
    const { userId, username, userEmail, userAvatar } = getUserMetaData();

    switch (status) {
      case 'loading':
        setContent(<CustomUserMenu userId={userId} isLoading />);
        break;
      case 'authenticated':
        setContent(
          <CustomUserMenu
            userId={userId}
            name={username}
            subline={userEmail}
            avatar={userAvatar}
          />
        );
        break;
      case 'unauthenticated':
        setContent(
          <Flex alignItems="center" gap="8">
            <Button
              size="s"
              variant="accent-light"
              label="Sign In"
              style={{ width: "75px" }}
              onClick={() => setIsLoginDialogOpen(true)}
            />
          </Flex>
        );
        break;
      default:
        setContent(
          <Flex alignItems="center" gap="8">
            <Button
              size="s"
              variant="accent-light"
              label="Sign In"
              style={{ width: "75px" }}
              onClick={() => setIsLoginDialogOpen(true)}
            />
          </Flex>
        );
    }
  }, [status, session]);


  return (
    <>
      {content}

      {/* Sign in Dialog */}
      <Dialog
        onClose={() => setIsLoginDialogOpen(false)}
        isOpen={isLoginDialogOpen}
        title="Sign In"
      >
        <Flex direction='column' gap="l" padding='xl'>
          <Button
            onClick={() => signIn("google")}
            disabled
            variant="white"
            size="l"
            label="Sign In With Google"
            prefixIcon="google"
            fillWidth
          />
          <Button
            onClick={() => signIn("apple")}
            disabled
            variant="white"
            size="l"
            label="Sign In With Apple"
            prefixIcon="apple"
            fillWidth
          />
          <Button
            onClick={() => signIn("github")}
            variant="white"
            size="l"
            label="Sign In With Github"
            prefixIcon="github"
            fillWidth
          />
        </Flex>
      </Dialog>
    </>
  );
});

SignIn.displayName = 'SignIn';

export { SignIn };
