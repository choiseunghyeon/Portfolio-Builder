import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import Career from "./Career"

export default {
  title: "Portfolio/Career",
  component: Career,
} as ComponentMeta<typeof Career>

const Template: ComponentStory<typeof Career> = args => <Career {...args} />

export const Default = Template.bind({})
Default.args = {
  organigation: "이카운트",
  role: "TFT1팀",
  term: "2022.04 - 2023.04",
  description: `인도네이사 국가를 대상으로
  프론트 엔드를 맡아서
  테스트 코드 설계 및 작성`,
  attributes: {
    layoutType: "default",
  },
}
