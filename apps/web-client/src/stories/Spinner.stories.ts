import type { Meta, StoryObj } from "@storybook/react-vite";

import DsSpinner from "@components/ds/Spinner";

const meta = {
  title: "Design System/Spinner",
  component: DsSpinner,
  parameters: {
    layout: "centered",
  },
  argTypes: {
  },
  args: {
    className: "size-12",
  },
} satisfies Meta<typeof DsSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
