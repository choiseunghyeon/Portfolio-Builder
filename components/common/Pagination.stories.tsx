import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Pagination from "./Pagination"
export default {
  title: "Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>

const Template: ComponentStory<typeof Pagination> = args => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {
  currentPage: 1,
  totalPage: 3,
}
