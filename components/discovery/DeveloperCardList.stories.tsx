import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import DeveloperCardList from "./DeveloperCardList"

export default {
  title: "Discovery/DeveloperCardList",
  component: DeveloperCardList,
} as ComponentMeta<typeof DeveloperCardList>

const Template: ComponentStory<typeof DeveloperCardList> = args => <DeveloperCardList {...args} />

export const Default = Template.bind({})
Default.args = {
  cardList: [
    {
      imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
      name: "박지성",
      skillSet: ["Svelt", "Spring", ".Net"],
    },
    {
      imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
      name: "김태형",
      skillSet: ["React", "Redux"],
    },
    {
      imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
      name: "지석진",
      skillSet: ["Django"],
    },
    {
      imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
      name: "유재석",
      skillSet: ["React", "Immer"],
    },
    {
      imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
      name: "손흥민",
      skillSet: ["Flask", "Immer"],
    },
  ],
}
