import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import FormInput from "./FormInput"
import { TextField } from "@mui/material"
export default {
  title: "Components/Form/FormInput",
  component: FormInput,
} as ComponentMeta<typeof FormInput>

const Template: ComponentStory<typeof FormInput> = args => (
  <FormInput {...args}>
    <TextField fullWidth required placeholder="https://so-so.dev/" variant="outlined" />
  </FormInput>
)

export const Default = Template.bind({})
Default.args = {
  title: "개인 블로그 주소",
  required: true,
}
