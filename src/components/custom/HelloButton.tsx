'use client';

import React, { forwardRef, useState } from 'react';
import { Flex } from '../generic/Flex';
import { Heading } from '../generic/Heading';
import { Arrow } from '../generic/Arrow';
import { Button } from '../generic/Button';
import { Dialog } from '../generic/Dialog';
import { Grid } from '../generic/Grid';
import { Avatar } from '../generic/Avatar';
import { IconButton } from '../generic/IconButton';
import { Text } from '../generic/Text';


type HelloButtonProps = {};

const HelloButton = forwardRef<HTMLDivElement, HelloButtonProps>(({ }, ref) => {
  const [isHelloDialogOpen, setIsHelloDialogOpen] = useState(false);

  return (
    <>
      <Flex fillWidth justifyContent='center' paddingBottom='l'>
        <Button
          id="helloBtn"
          variant="accent"
          size="l"
          onClick={() => setIsHelloDialogOpen(true)}
        >
          <Flex alignItems="center">
            Hello 👋
            <Arrow trigger="#helloBtn" />
          </Flex>
        </Button>
      </Flex>

      {/* Card Dialog */}
      <Dialog
        onClose={() => setIsHelloDialogOpen(false)}
        isOpen={isHelloDialogOpen}
        title="Nate Rohweder"
        data-border="conservative"
      >
        <Grid
          columns="repeat(1, 1fr)"
          tabletColumns="1col"
          mobileColumns="1col"
          fillWidth
          gap="s">
          <Flex gap="s" direction="row" alignItems="center" fillWidth>
            <Flex direction="column" justifyContent='center' fillWidth>
              <Heading
                as="h3"
                variant="heading-default-l"
                paddingBottom='12'
              >
                Engineering Manager
              </Heading>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </Flex>
            <Avatar size="xl" src="/images/profile.jpg" />
          </Flex>
          <Flex direction="row" justifyContent="space-evenly" paddingTop='32' fillWidth>
            <IconButton
              onClick={() => { }}
              icon="linkedin"
              size="l"
              tooltip="LinkedIn"
              tooltipPosition="top"
              variant="ghost"
            />
            <IconButton
              onClick={() => { }}
              icon="github"
              size="l"
              tooltip="GitHub"
              tooltipPosition="top"
              variant="ghost"
            />
            <IconButton
              onClick={() => { }}
              icon="resume"
              size="l"
              tooltip="Resume"
              tooltipPosition="top"
              variant="ghost"
            />
          </Flex>
        </Grid>
      </Dialog>
    </>
  );
});

HelloButton.displayName = 'HelloButton';

export { HelloButton };
