'use client';

import React, { forwardRef } from 'react';
import { Flex, SmartImage, Badge } from '../../generic';
import styles from './Travel.module.scss';
import { ModuleLink } from '../../generic/ModuleLink';

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
      <div
        style={{ height: '150px' }}
        href={'/travel'}
        className={styles.hoverlink}
        id="travel_module"
      >
        <Badge
          arrow
          effect
          className={styles.travelbadge}
          title="Travel Blog"
          trigger='#travel_module'
          radius="0% 20px 20px 0%"
        />
        <SmartImage
          radius="l"
          src="/images/travel.jpg"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="travel"
          style={{ cursor: "pointer" }}
        />
      </div>
    </Flex>
  );
});

Travel.displayName = 'Travel';

export { Travel };
