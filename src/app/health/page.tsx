import { HealthTracker } from "@/components/custom/HealthTracker";
import { Accordion, Flex, IconButton } from "@/components/generic";
import { Select, InputNumber } from "antd";
import type { SelectProps } from 'antd';


const options: SelectProps['options'] = [
  {
    label: <span>Protein</span>,
    title: 'protein',
    options: [
      { label: <span>Fish</span>, value: 'Fish' },
      { label: <span>Poultry</span>, value: 'Poultry' },
      { label: <span>Red or Game Meat</span>, value: 'Red or Game Meat' },
      { label: <span>Eggs</span>, value: 'Eggs' },

    ],
  },
  {
    label: <span>Veggies</span>,
    title: 'veggies',
    options: [
      { label: <span>Leafy</span>, value: 'Leafy' },
      { label: <span>Cruciferous</span>, value: 'Cruciferous' },
      { label: <span>Vibrant</span>, value: 'Vibrant' },
      { label: <span>Starchy</span>, value: 'Starchy' },

    ],
  },
  {
    label: <span>Fruits</span>,
    title: 'fruits',
    options: [
      { label: <span>Avocado</span>, value: 'Avocado' },
      { label: <span>Banana</span>, value: 'Banana' },
      { label: <span>Berries</span>, value: 'Berries' },
    ],
  },
  {
    label: <span>Grains & Legumes</span>,
    title: 'grains',
    options: [
      { label: <span>Whole Grains</span>, value: 'Whole Grains' },
      { label: <span>Legumes</span>, value: 'Legumes' },
    ],
  },
  {
    label: <span>Other</span>,
    title: 'other',
    options: [
      { label: <span>Nuts or Seeds</span>, value: 'Nuts or Seeds' },
      { label: <span>Dark Chocolate</span>, value: 'Dark Chocolate' },
      { label: <span>Antioxidant Tea</span>, value: 'Antioxidant Tea' },
      { label: <span>Fermented</span>, value: 'Fermented' },

    ],
  },
]

export default function Health() {
  return (
    <Flex fillWidth padding="xl" direction="column">
      <Accordion title="Nutrition Tracker">
        <Flex>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            variant="outlined"
            //onChange={handleChange}
            options={options}
          />
          <IconButton
            icon="plus"
            size="l"
            tooltip="Submit"
            tooltipPosition="top"
            variant="ghost"
            style={{ cursor: "pointer" }}
          />
        </Flex>
        <Flex padding="l">
          <HealthTracker />
        </Flex>
      </Accordion>
      <Accordion title="P-Ups & S-Ups Tracker">
        <Flex gap="20">
        <InputNumber min={1} defaultValue={50} changeOnWheel />
        <InputNumber min={1} defaultValue={20} changeOnWheel />
        </Flex>
      </Accordion>
    </Flex>
  );
}