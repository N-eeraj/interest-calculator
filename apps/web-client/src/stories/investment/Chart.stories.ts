import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";

import InvestmentChart from "@components/investment/Chart";

const meta = {
  title: "Investment/Chart",
  component: InvestmentChart,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    invested: {
      control: "number",
    },
    returns: {
      control: "number",
    },
  },
  args: {
    invested: 1_000_000,
    returns: 500_000,
  },
} satisfies Meta<typeof InvestmentChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
