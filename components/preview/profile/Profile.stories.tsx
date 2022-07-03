import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Profile from "./Profile"

export default {
  title: "Profile",
  component: Profile,
} as ComponentMeta<typeof Profile>

const Template: ComponentStory<typeof Profile> = args => <Profile {...args} />

export const Default = Template.bind({})
Default.args = {
  title: "안녕하세요, 최승현 입니다.",
  subtitle: "ECount Front End 개발자 최승현입니다. \n 기술이 사람의 삶을 더욱 편리하게 할 수 있다고 믿습니다.",
  imageSrc: `https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg`,
  attributes: {
    layoutType: "default",
  },
}
