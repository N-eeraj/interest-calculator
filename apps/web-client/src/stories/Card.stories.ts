import type { Meta, StoryObj } from "@storybook/react-vite";

import DsCard from "@components/ds/Card";

const meta = {
  title: "Design System/Card",
  component: DsCard,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Hello",
  },
} satisfies Meta<typeof DsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
