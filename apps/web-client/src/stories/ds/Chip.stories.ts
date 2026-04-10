import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";

import DsChip from "@components/ds/Chip";
import {
  themes,
  sizes,
} from "@components/ds/Chip/definitions";

const meta = {
  title: "Design System/Chip",
  component: DsChip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    theme: {
      control: "select",
      options: themes,
    },
    size: {
      control: "select",
      options: sizes,
    },
  },
  args: {
    children: "Hello",
  },
} satisfies Meta<typeof DsChip>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
