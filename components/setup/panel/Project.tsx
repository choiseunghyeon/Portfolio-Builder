import Tab from "@mui/material/Tab"
import { SyntheticEvent, useState } from "react"
import Box from "@mui/material/Box"
import TabPanel from "./TabPanel"
import BlockContainer from "@container/BlockContainer"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { Button, Grid, Stack, TextField } from "@mui/material"
import IconComponent from "@components/common/IconComponent"
import { PROJECT_TAB_PANEL } from "@constants/testConstants"

interface IProjectProps {
  value: "Project"
}

export default function Project({ value }: IProjectProps) {
  return (
    <>
      <BlockContainer dataTestId={PROJECT_TAB_PANEL} blockType={"Project"} />
    </>
  )
}
