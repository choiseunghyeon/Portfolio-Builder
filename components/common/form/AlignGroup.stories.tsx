import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { Button } from "@mui/material"
import AlignGroup from "./AlignGroup"
export default {
  title: "Components/Form/AlignGroup",
  component: AlignGroup,
} as ComponentMeta<typeof AlignGroup>

const Template: ComponentStory<typeof AlignGroup> = args => (
  <AlignGroup>
    <Button variant="contained" sx={{ backgroundColor: "white", color: "red" }}>
      닫기
    </Button>
    <Button variant="contained" sx={{ backgroundColor: "red", color: "white" }}>
      완료
    </Button>
  </AlignGroup>
)

export const Default = Template.bind({})
