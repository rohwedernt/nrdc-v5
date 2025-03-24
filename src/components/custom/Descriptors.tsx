'use client';

import React, { forwardRef } from 'react';
import { Flex } from '../generic/Flex';
import { Heading } from '../generic/Heading';
import { LetterFxMultiWord } from '../generic/LetterFxMultiWord';
import styles from './Descriptors.module.scss';


type DescriptorsProps = {};

const Descriptors = forwardRef<HTMLDivElement, DescriptorsProps>(({ }, ref) => {
  return (
    <Flex
      position="relative"
      flex={4}
      direction="column"
      className={styles.wrapper}
    >
      <Heading
        wrap="balance"
        variant="display-strong-xs" paddingBottom='24' className={styles.heading}>
        <span className="font-code" style={{ display: "block" }}>
          <LetterFxMultiWord
            speed="slow" wordSet={["Leader", "Collaborator", "Engineer", "Agilist"]}>
          </LetterFxMultiWord>
        </span>
        <span className="font-code" style={{ display: "block" }}>
          <LetterFxMultiWord
            speed="medium" wordSet={["Hobbyist", "Musician", "Creator"]}>
          </LetterFxMultiWord>
        </span>
        <span className="font-code" style={{ display: "block" }}>
          <LetterFxMultiWord
            speed="fast" wordSet={["Mentor", "Learner", "Mentee", "Coach"]}>
          </LetterFxMultiWord>
        </span>
      </Heading>
    </Flex>
  );
});

Descriptors.displayName = 'Descriptors';

export { Descriptors };
