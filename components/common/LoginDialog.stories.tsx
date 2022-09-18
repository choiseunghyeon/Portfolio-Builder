import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import LoginDialog from "./LoginDialog"

export default {
  title: "Components/LoginDialog",
  component: LoginDialog,
} as ComponentMeta<typeof LoginDialog>

const Template: ComponentStory<typeof LoginDialog> = args => <LoginDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
  onClose: () => {},
}
