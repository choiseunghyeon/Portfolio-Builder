import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import UserCard from "./UserCard"

export default {
  title: "UserCard",
  component: UserCard,
} as ComponentMeta<typeof UserCard>

const Template: ComponentStory<typeof UserCard> = args => <UserCard {...args} />

export const Default = Template.bind({})
Default.args = {
  imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
  name: "홍길동",
  description: "Front End Developer",
  subDescription: "안녕하세요",
}
