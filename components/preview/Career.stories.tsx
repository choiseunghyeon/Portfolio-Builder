import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Career from "./Career";

export default {
  title: "Career",
  component: Career,
} as ComponentMeta<typeof Career>;

const Template: ComponentStory<typeof Career> = args => <Career {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "이카운트",
  subtitle: "TFT1팀",
  detail: "테스트 코드 설계 및 작성 / 자체 프레임 워크 기능 개발 및 리팩토링",
};
