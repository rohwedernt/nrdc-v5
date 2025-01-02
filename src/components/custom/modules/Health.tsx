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
        style={{ height: '150px' }}
        href={'/health'}
        className={styles.hoverlink}
        id="travel_module"
        >
        <Badge
          effect
          className={styles.healthbadge}
          title="Health Trackers"
        />
        <SmartImage
          radius="l"
          src="/images/nutrition.jpg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="travel"
          style={{ cursor: "pointer" }}
        />
      </Link>
    </Flex>
  );
});

HealthModule.displayName = 'HealthModule';

export { HealthModule };
