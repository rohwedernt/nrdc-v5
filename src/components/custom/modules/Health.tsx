'use client';

import React, { forwardRef } from 'react';
import { Flex, Text, SmartImage, Badge } from '../../generic';
import styles from './Health.module.scss';
import Link from 'next/link';


type HealthModuleProps = {};

const HealthModule = forwardRef<HTMLDivElement, HealthModuleProps>(({ }, ref) => {
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
        //target="_blank"
        style={{ height: '150px' }}
        href={'/nutrition'}
        className={styles.hoverlink}
        id="travel_module"
        >
        <Badge
          //arrow
          effect
          className={styles.healthbadge}
          title="Health Trackers"
        />
        {/* <Text
        variant="display-default-m"
        style={{ position: "absolute", top: "15px", left: "5px", zIndex: "5" }}
      >
        Travel
      </Text> */}
        <SmartImage
          radius="l"
          src="/images/nutrition.jpg"
          fill
          alt="travel"
          style={{ cursor: "pointer" }}
        />
      </Link>
    </Flex>
  );
});

HealthModule.displayName = 'HealthModule';

export { HealthModule };
