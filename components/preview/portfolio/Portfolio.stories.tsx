import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Portfolio from "./Portfolio"

export default {
  title: "Portfolio",
  component: Portfolio,
} as ComponentMeta<typeof Portfolio>

const Template: ComponentStory<typeof Portfolio> = args => <Portfolio {...args} />

export const Default = Template.bind({})
Default.args = {
  mediaSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
  title: "MZ세대 언어",
  content: "어남선생 류수영, 레시피 여왕 박복순 박솔미, 국민아들 찬또배기 이찬원이 치열한 경쟁을 예고한 류진과 폭풍 성장한 두 아들 찬형X찬호 형제 삼부자가 출사표를 던졌다.",
  link: "http://sports.hankooki.com/news/articleView.html?idxno=6798068",
  attributes: { layoutType: "default" },
}
