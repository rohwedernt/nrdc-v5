'use client';

import React, { forwardRef, useState } from 'react';
import { signIn } from "next-auth/react";
import { Button, Dialog, Flex } from '@/components/generic';
import { CustomUserMenu } from './CustomUserMenu';


type SignInProps = {
  sessionStatus: 'loading' | 'authenticated' | 'unauthenticated';
  avatar?: string;
  name?: string;
  subline?: string;
};

const SignIn = forwardRef<HTMLDivElement, SignInProps>(({
  sessionStatus,
  name,
  avatar,
  subline
}, ref) => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const renderContent = () => {
    switch (sessionStatus) {
      case 'loading':
        return (
          <CustomUserMenu
            isLoading
            avatar={avatar}
            name={name}
            subline={subline}
          />
        );
      case 'authenticated':
        return (
          <CustomUserMenu
            avatar={avatar}
            name={name}
            subline={subline}
          />
        );
      case 'unauthenticated':
        return (
          <Flex
            alignItems="center"
            gap="8">
            <Button
              size="s"
              variant="accent-light"
              label="Sign In"
              onClick={() => setIsLoginDialogOpen(true)}
            />
          </Flex>
        );
      default:
        return (
          <Flex
            alignItems="center"
            gap="8">
            <Button
              size="s"
              variant="accent-light"
              label="Sign In"
              onClick={() => setIsLoginDialogOpen(true)}
            />
          </Flex>
        );
    }
  }

  return (
    <>
      {renderContent()}

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
