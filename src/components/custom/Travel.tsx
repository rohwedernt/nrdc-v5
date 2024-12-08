'use client';

import React, { forwardRef, useRef } from 'react';
import { Flex, Text, SmartImage, Badge } from '../generic';
import styles from './Travel.module.scss';
import Link from 'next/link';


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
      <Link
        target="_blank"
        style={{ height: '150px' }}
        href={'http://localhost:3000/travel'}
        className={styles.hoverlink}
        id="travel_module"
        >
        <Badge
          arrow
          effect
          className={styles.travelbadge}
          title="Travel Blog"
          trigger='#travel_module'
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
          style={{ cursor: "pointer" }}
          //onMouseEnter={handleMouseEnter}
          //onMouseLeave={handleMouseLeave}
        //sizes={`${sizeMapping['xl']}px`}
        />
      </Link>
    </Flex>
  );
});

Travel.displayName = 'Travel';

export { Travel };
