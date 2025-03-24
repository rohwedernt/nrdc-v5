'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { Flex } from '../generic/Flex';
import { Heading } from '../generic/Heading';
import { Arrow } from '../generic/Arrow';
import { Button } from '../generic/Button';
import { Dialog } from '../generic/Dialog';
import { Grid } from '../generic/Grid';
import { ProfileImage } from '../generic/ProfileImage';
import { IconButton } from '../generic/IconButton';
import { Text } from '../generic/Text';
import { social } from "@/components/resources/config"
import styles from './Hello.module.scss';


type HelloProps = {};

const Hello = forwardRef<HTMLDivElement, HelloProps>(({ }, ref) => {
  const [isHelloDialogOpen, setIsHelloDialogOpen] = useState(false);

  useEffect(() => {
    if (isHelloDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure we restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isHelloDialogOpen]);

  return (
    <>
      <Flex fillWidth justifyContent='center' paddingBottom='xl'>
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
        animate
      >
        <Grid
          columns="repeat(1, 1fr)"
          tabletColumns="1col"
          mobileColumns="1col"
          fillWidth
          gap="s">
          <Flex className={styles.wrapper} gap="s" direction="row" alignItems="center" fillWidth>
            <Flex direction="column" justifyContent='center' fillWidth>
              <div className={styles.textContainer}>
                <Text className={styles.text} variant="body-default-s">I'm a software engineering leader who believes that great teams build great systems—and that good management is about more than just process and delivery. It's about coaching humans to grow, thrive, and do the best work of their lives.</Text>
                <Text className={styles.text} variant="body-default-s">I've led teams across the stack, coached people of all levels through growth, helped rewrite platforms without (completely) breaking everything, worked side by side with product and design teams, overhauled hiring systems and helped teams find clarity in chaos.</Text>
                <Text className={styles.text} variant="body-default-s">As our world becomes increasingly automated the most valuable things we can invest in are still deeply human: trust, curiosity, resilience, empathy, thoughtful leadership, and occasionally saying, "That's a weird idea… let's try it."</Text>
                <Text className={styles.text} variant="body-default-s" align='center' style={{ fontStyle: 'italic', paddingBottom: '1rem', paddingTop: '1rem' }}>Former developer - part-time process nerd - full-time advocate for teams that work well and care deeply - lifelong believer that the best engineering cultures are the ones that value both high standards and high trust.</Text>
                <Text className={styles.text} variant="body-default-s">When I'm not helping teams build things that (hopefully) don't crash in production, I'm making music—a passion I've been chasing for over 20 years. I love cooking elaborate meals just to use my favorite knife and justify caring for my cast iron like it's a member of the family. I am always searching for the next historical fiction to read, because apparently I enjoy stress but prefer it set in the 12th century. I'm married to an incredible partner, part of a wonderfully chaotic extended family, learning Spanish, and always planning the next travel adventure to keep perspective wide and curiosity sharp.</Text>
              </div>
            </Flex>
            <ProfileImage src="/images/profile.jpg" />
          </Flex>
          <Flex direction="row" justifyContent="space-evenly" paddingTop='32' fillWidth>
            <IconButton
              href={social.linkedin}
              icon="linkedin"
              size="l"
              tooltip="LinkedIn"
              tooltipPosition="top"
              variant="ghost"
              className={styles.icon}
            />
            <IconButton
              href={social.github}
              icon="github"
              size="l"
              tooltip="GitHub"
              tooltipPosition="top"
              variant="ghost"
              className={styles.icon}
            />
            <IconButton
              onClick={()=>{}}
              icon="resume"
              size="l"
              tooltip="Resume"
              tooltipPosition="top"
              variant="ghost"
              className={styles.icon}
            />
          </Flex>
        </Grid>
      </Dialog>
    </>
  );
});

Hello.displayName = 'Hello';

export { Hello };
