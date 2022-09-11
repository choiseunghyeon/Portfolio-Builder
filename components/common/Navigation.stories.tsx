import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Navigation from "./Navigation"

export default {
  title: "Navigation",
  component: Navigation,
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = args => <Navigation {...args} />

export const Default = Template.bind({})
Default.args = {
  activePageId: "tech-blog",
}
