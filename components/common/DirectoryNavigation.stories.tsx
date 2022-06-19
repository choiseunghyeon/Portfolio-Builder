import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DirectoryNavigation from "./DirectoryNavigation"

export default {
  title: "DirectoryNavigation",
  component: DirectoryNavigation,
} as ComponentMeta<typeof DirectoryNavigation>

const Template: ComponentStory<typeof DirectoryNavigation> = args => <DirectoryNavigation {...args} />

export const Default = Template.bind({})
