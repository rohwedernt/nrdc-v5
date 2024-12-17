'use client';

import React, { forwardRef, useState } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import { updateUserSetting } from '@/app/api/settings/fetch';
import { UserSettings } from '@/app/layout';
import { Switch } from '@/components/generic';


type FeatureSelectProps = {
  userId: string;
  settingKey: string;
  settingVals: string[];
  label: string;
  description: string;
};

const FeatureSelect = forwardRef<HTMLDivElement, FeatureSelectProps>(({ 
  userId,
  settingKey,
  settingVals,
  label,
  description
 }, ref) => {
  const { settings, setSettings } = useAppContext();
    //const [isChecked, setIsChecked] = useState(false);

  const handleFeatureChange = async () => {
    const newSettingVal = settings[settingKey as keyof UserSettings] === settingVals[1] ? settingVals[0] : settingVals[1];

    // Update local settings state
    setSettings((prevSettings: UserSettings) => ({
      ...prevSettings,
      [settingKey]: newSettingVal,
    }));

    try {
      // Persist change in database
      const result = await updateUserSetting({
        userId,
        key: settingKey,
        value: newSettingVal,
      });

      if (!result.success) {
        console.error(result.message || 'Failed to update theme setting.');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  return (
    <Switch
      label={label}
      description={description}
      isChecked={settings[settingKey as keyof UserSettings] === settingVals[1]}
      reverse
      onToggle={handleFeatureChange}
    />
  );
});

FeatureSelect.displayName = 'FeatureSelect';

export { FeatureSelect };
