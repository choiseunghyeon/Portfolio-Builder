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
  description: "누구나 쉽게 포트폴리오 사이트 제작을 하기 위해 시작",
  skills: "View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리",
};
