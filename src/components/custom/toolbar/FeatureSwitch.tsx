'use client';

import React, { forwardRef, useState } from 'react';
import { Switch } from '../../generic';


type FeatureSwitchProps = {
  label: string;
  description: string;
};

const FeatureSwitch = forwardRef<HTMLDivElement, FeatureSwitchProps>(({
  label,
  description
}, ref) => {
  const [isChecked, setIsChecked] = useState(false);

  return (

    <Switch
      label={label}
      description={description}
      isChecked={isChecked}
      reverse
      onToggle={() => setIsChecked(isChecked => !isChecked)}
      iconButtonProps={{
        onClick: () => { },
        tooltip: 'Learn more',
        tooltipPosition: 'top'
      }}
    />
  );
});

FeatureSwitch.displayName = 'FeatureSwitch';

export { FeatureSwitch };
