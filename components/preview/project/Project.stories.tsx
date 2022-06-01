import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Project from "./Project";

export default {
  title: "Project",
  component: Project,
} as ComponentMeta<typeof Project>;

const Template: ComponentStory<typeof Project> = args => <Project {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "프로젝트 빌더",
  organigation: "프로젝트 빌더 팀",
  term: "2022.04 - 2023.04",
  description:
    "레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다. \n이에 재개발을 제안하여 비즈니스 로직을 좀더 파악하기 쉽고 빠르게 임팩트를 낼 수 있도록 하는 데 기여하였습니다 \n테스트 코드는 다른 개발새로운 기능추가와 리팩토링의 발판이 되어준다고 생각합니다.",
  skills: `View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리\n redux, redux-saga 적용 및 가이드 공유`,
  attributes: {
    layoutType: "default",
  },
};
