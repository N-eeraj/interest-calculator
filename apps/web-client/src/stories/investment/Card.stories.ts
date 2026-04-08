import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";

import { SchemeType } from "@app/definitions/enums/schemes";

import InvestmentCard from "@components/investment/List/Card";

const meta = {
  title: "Investment/Card",
  component: InvestmentCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    schemeType: {
      control: "select",
      options: [ 
        SchemeType.FD,
        SchemeType.RD,
        SchemeType.MIS,
      ],
    },
    principalAmount: {
      control: "number",
    },
    maturityAmount: {
      control: "number",
    },
    monthlyDeposit: {
      control: "number",
    },
    monthlyPayout: {
      control: "number",
    },
  },
  args: {
    id: 1,
    schemeType: SchemeType.FD,
    principalAmount: 1_000_000,
    maturityAmount: 2_000_000,
    tenureMonths: 60,
    isSeniorCitizen: false,
    interestRate: 6.5,
    monthlyDeposit: null,
    monthlyPayout: null,
    updatedAt: new Date(),
    onDelete: () => {},
  },
} satisfies Meta<typeof InvestmentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
