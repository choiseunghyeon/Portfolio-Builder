import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeveloperCard from "./DeveloperCard"

export default {
  title: "Discovery/DeveloperCard",
  component: DeveloperCard,
} as ComponentMeta<typeof DeveloperCard>

const Template: ComponentStory<typeof DeveloperCard> = args => <DeveloperCard {...args} />

export const Default = Template.bind({})
Default.args = {
  imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
  name: "홍길동",
  skillSet: ["React", "Redux"],
}
