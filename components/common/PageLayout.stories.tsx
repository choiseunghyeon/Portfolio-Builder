import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import PageLayout from "./PageLayout"

export default {
  title: "PageLayout",
  component: PageLayout,
} as ComponentMeta<typeof PageLayout>

const Template: ComponentStory<typeof PageLayout> = args => <PageLayout />

export const Default = Template.bind({})
