import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";
import { fn } from "storybook/test";

import DsButton from "@components/ds/Button";
import {
  variants,
  sizes,
} from "@components/ds/Button/definitions";

const meta = {
  title: "Design System/Button",
  component: DsButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: sizes,
    },
    children: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
    loading: false,
    children: "Button",
    onClick: fn(),
  },
} satisfies Meta<typeof DsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
