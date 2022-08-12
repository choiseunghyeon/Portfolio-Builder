import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Pagination from "./Pagination"
export default {
  title: "Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = args => <Pagination />

export const Default = Template.bind({})
