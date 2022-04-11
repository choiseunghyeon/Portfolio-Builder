import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DeveloperProfile from "./Profile";

export default {
  title: "Profile",
  component: DeveloperProfile,
} as ComponentMeta<typeof DeveloperProfile>;

const Template: ComponentStory<typeof DeveloperProfile> = args => <DeveloperProfile {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Front End Developer",
  subtitle: "최승현",
  imageSrc: `https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg`,
};
