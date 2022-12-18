import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeveloperCardFormDialog from "./DeveloperCardFormDialog"

export default {
  title: "Discovery/DeveloperCardFormDialog",
  component: DeveloperCardFormDialog,
} as ComponentMeta<typeof DeveloperCardFormDialog>

const Template: ComponentStory<typeof DeveloperCardFormDialog> = args => <DeveloperCardFormDialog {...args} />

export const Default = Template.bind({})
Default.args = {
  open: true,
  onClose: () => {},
}
