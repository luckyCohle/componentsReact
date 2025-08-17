// InputField.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import InputField, { type InputFieldProps } from "../components/InputFeild";
import { useState } from "react";

const meta: Meta<InputFieldProps> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text...",
  },
};

export default meta;
type Story = StoryObj<InputFieldProps>;

// ✅ Controlled input example
const ControlledTemplate = (args: InputFieldProps) => {
  const [val, setVal] = useState("");
  return (
    <div className="max-w-xs">
      <InputField {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      <p className="text-xs mt-2">Value: {val}</p>
    </div>
  );
};

// 👇 Stories

export const Default: Story = {
  render: ControlledTemplate,
  args: {
    label: "Default Input",
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 max-w-xs">
      <InputField {...args} label="Outlined (default)" variant="outlined" />
      <InputField {...args} label="Filled" variant="filled" />
      <InputField {...args} label="Ghost" variant="ghost" />
    </div>
  ),
  args: {
    placeholder: "Type here...",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 max-w-xs">
      <InputField {...args} label="Small" size="sm" />
      <InputField {...args} label="Medium" size="md" />
      <InputField {...args} label="Large" size="lg" />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: ControlledTemplate,
  args: {
    label: "Username",
    helperText: "This will be visible to others.",
  },
};

export const WithError: Story = {
  render: ControlledTemplate,
  args: {
    label: "Email",
    invalid: true,
    errorMessage: "Invalid email format",
  },
};

export const Disabled: Story = {
  render: ControlledTemplate,
  args: {
    label: "Disabled Input",
    disabled: true,
    value: "Can't type here",
  },
};

export const PasswordToggle: Story = {
  render: ControlledTemplate,
  args: {
    label: "Password",
    placeholder: "Enter your password",
    pwdToggle: true,
  },
};
