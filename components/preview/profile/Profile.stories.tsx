import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Profile from "./Profile";

export default {
  title: "Profile",
  component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = args => <Profile {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Front End Developer",
  subtitle: "최승현",
  imageSrc: `https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg`,
};
