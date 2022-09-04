import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import CardMenu from "./CardMenu"

export default {
  title: "Components/CardMenu",
  component: CardMenu,
} as ComponentMeta<typeof CardMenu>

const Template: ComponentStory<typeof CardMenu> = args => <CardMenu {...args} />

export const Default = Template.bind({})
Default.args = {
  companyInformationUrl: "https://mui.com/material-ui/api/button/",
  videoUrl: "https://mui.com/material-ui/api/button/",
}
