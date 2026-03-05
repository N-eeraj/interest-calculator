import type { Meta, StoryObj } from "@storybook/react-vite";

import DsProgress from "@components/ds/Progress";

const meta = {
  title: "Design System/Progress",
  component: DsProgress,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: "number",
    },
  },
  args: {
    value: 30,
    className: "w-32",
  },
} satisfies Meta<typeof DsProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
