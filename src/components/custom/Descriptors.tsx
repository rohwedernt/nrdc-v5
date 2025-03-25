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
      ref={ref}
    >
      <Flex direction="column" gap="8">
        <Flex justifyContent="flex-start" style={{ width: '100%' }}>
          <Heading variant="display-strong-l" className={styles.heading}>
            <span className="font-label">
              <LetterFxMultiWord
                speed="slow" wordSet={["leader", "collaborator", "engineer", "agilist"]}
              />
            </span>
          </Heading>
        </Flex>
        <Flex justifyContent="flex-end" style={{ width: '80%' }}>
          <Heading variant="display-strong-s" className={styles.heading}>
            <span className="font-label">
              <LetterFxMultiWord
                speed="medium" wordSet={["hobbyist", "musician", "creator"]}
              />
            </span>
          </Heading>
        </Flex>
        <Flex justifyContent="center" style={{ width: '100%', paddingRight: '15%' }}>
          <Heading variant="display-strong-m" className={styles.heading}>
            <span className="font-label">
              <LetterFxMultiWord
                speed="fast" wordSet={["mentor", "learner", "mentee", "coach"]}
              />
            </span>
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
});

Descriptors.displayName = 'Descriptors';

export { Descriptors };
