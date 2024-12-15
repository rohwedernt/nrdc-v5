'use client';

import React, { forwardRef, useState } from 'react';
import { Flex, IconButton, Spinner } from "@/components/generic";
import { Select } from "antd";
import type { SelectProps } from 'antd';

export type FoodItem = {
  id: string;
  name: string;
  group: string;
}

type FoodSelectorProps = {
  foodItems: Array<FoodItem>;
  userId: string;
  weekStartDate: Date;
  updateCategoriesWithProgress: (selectedFoods: string[]) => void;
};

function getOptionsFromFoodItems(foodItems: Array<FoodItem>): SelectProps['options'] {
  // Group food items by their 'group' property
  const groupedItems = foodItems.reduce((acc, item) => {
    if (!acc[item.group]) {
      acc[item.group] = [];
    }
    acc[item.group].push({
      label: <span>{item.name}</span>,
      value: item.name,
    });
    return acc;
  }, {} as Record<string, Array<{ label: JSX.Element; value: string }>>);

  // Convert grouped items into the desired dropdown shape
  const options = Object.entries(groupedItems).map(([group, items]) => ({
    label: <span>{group}</span>,
    title: group.toLowerCase(),
    options: items,
  }));

  return options;
}

const FoodSelector = forwardRef<HTMLDivElement, FoodSelectorProps>(({
  foodItems,
  userId,
  weekStartDate,
  updateCategoriesWithProgress
}, ref) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);


  const handleSubmit = async (selectedFoods: string[]) => {
    setIsLoadingSubmit(true);
    setSelectedValues([]);

    try {
      const response = await fetch('/api/health/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({
          userId,
          weekStartDate,
          selectedFoods,
        }),
      });

      if (response.ok) {
        console.log('Progress updated!');
        updateCategoriesWithProgress(selectedFoods); // Trigger parent state update
      } else {
        console.error('Failed to update progress.');
      }
    } catch (error) {
      console.error('Error submitting progress:', error);
    }

    setIsLoadingSubmit(false);
  };

  const handleChange = (value: string[]) => {
    setSelectedValues(value)
  };

  return (
    <Flex justifyContent="center">
      <Select
        mode="multiple"
        allowClear
        style={{ width: '50%' }}
        placeholder="Please select"
        variant="outlined"
        onChange={handleChange}
        options={getOptionsFromFoodItems(foodItems)}
        value={selectedValues}
      />
      <Flex alignItems='center' minHeight={2}>
        {isLoadingSubmit ? (
          <Spinner size="l" />
        ) : (
          <IconButton
            icon="plus"
            size="l"
            tooltip="Submit"
            tooltipPosition="top"
            variant="ghost"
            style={{ cursor: "pointer" }}
            onClick={() => handleSubmit(selectedValues)}
          />
        )}
      </Flex>

    </Flex>
  );
});

FoodSelector.displayName = 'FoodSelector';

export { FoodSelector };
