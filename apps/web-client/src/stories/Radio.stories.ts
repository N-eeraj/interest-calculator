import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";

import DsRadio from "@components/ds/Radio";

const meta = {
  title: "Design System/Radio",
  component: DsRadio,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    labelKey: {
      control: "text",
    },
    valueKey: {
      control: "text",
    },
  },
  args: {
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
    ],
    value: "Option 2"
  },
} satisfies Meta<typeof DsRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
