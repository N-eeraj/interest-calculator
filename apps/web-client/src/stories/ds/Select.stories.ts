import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";
import { fn } from "storybook/test";

import DsSelect from "@components/ds/Select";

const meta = {
  title: "Design System/Select",
  component: DsSelect,
  parameters: {
    layout: "centered",
  },
  args: {
    trigger: "Select Option",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
    ],
    onSelect: fn(),
  },
} satisfies Meta<typeof DsSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
