'use client';

import React, { forwardRef } from 'react';
import { Flex, Text, SmartImage, Badge } from '../generic';
import styles from './Travel.module.scss';


type TravelProps = {};

const Travel = forwardRef<HTMLDivElement, TravelProps>(({ }, ref) => {
  return (
    <Flex
      position="relative"
      radius="l"
      shadow="l"
      direction="column"
      fillWidth
      style={{ minHeight: "150px" }}
    >
      <Badge
        arrow
        effect
        className={styles.travelbadge}
        title="Travel Blog"
      />
      {/* <Text
        variant="display-default-m"
        style={{ position: "absolute", top: "15px", left: "5px", zIndex: "5" }}
      >
        Travel
      </Text> */}
      <SmartImage
        radius="l"
        src="/images/travel.jpg"
        fill
        alt="travel"
        //sizes={`${sizeMapping['xl']}px`}
      />
    </Flex>
  );
});

Travel.displayName = 'Travel';

export { Travel };
