import type {
  Meta,
  StoryObj,
} from "@storybook/react-vite";
import { fn } from "storybook/test";

import DsInput from "@components/ds/Input";
import { themes } from "@components/ds/Input/definitions";

const meta = {
  title: "Design System/Input",
  component: DsInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    theme: {
      control: "select",
      options: themes,
    },
    value: {
      control: "text",
    },
    placeholder: {
      control: "text",
    },
    type: {
      control: "select",
      options: [
        "text",
        "password",
        "email",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "time",
        "checkbox",
        "radio",
        "range",
        "color",
        "file",
        "submit",
        "button",
        "hidden"
      ],
    },
    disabled: {
      control: "boolean",
    },
    label: {
      control: "text",
    },
  },
  args: {
    disabled: false,
    theme: "primary",
    label: "Enter Value",
    type: "text",
    placeholder: "Enter value in config",
    onChange: fn(),
    onInput: fn(),
  },
} satisfies Meta<typeof DsInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Single story using controls
export const Playground: Story = {};
