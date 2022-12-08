import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import TechBlogCard from "./TechBlogCard"

export default {
  title: "TechBlogCard",
  component: TechBlogCard,
} as ComponentMeta<typeof TechBlogCard>

const Template: ComponentStory<typeof TechBlogCard> = args => <TechBlogCard {...args} />

export const Default = Template.bind({})
Default.args = {
  officialName: "비바리퍼블리카",
  productName: "토스",
  favorite: true,
  updateDate: new Date(),
  link: "https://www.naver.com/",
  //   companyInformationUrl: "https://www.naver.com/",
  //   videoUrl: "https://www.naver.com/",
}
