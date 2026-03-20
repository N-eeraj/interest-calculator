import type { Meta, StoryObj } from "@storybook/react-vite";

import DsErrorMessage from "@components/ds/ErrorMessage";

const meta = {
  title: "Design System/ErrorMessage",
  component: DsErrorMessage,
  parameters: {
    layout: "centered",
  },
  args: {
    errors: [
      {
        message: "This is an error message",
      }
    ],
  },
} satisfies Meta<typeof DsErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
