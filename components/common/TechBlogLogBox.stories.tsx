import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import TechBlogLogBox from "./TechBlogLogBox"

export default {
  title: "Components/TechBlogLogBox",
  component: TechBlogLogBox,
} as ComponentMeta<typeof TechBlogLogBox>

const Template: ComponentStory<typeof TechBlogLogBox> = args => <TechBlogLogBox {...args} />

export const Default = Template.bind({})
Default.args = {
  logs: [1, 2, 3, 4, 5],
}
