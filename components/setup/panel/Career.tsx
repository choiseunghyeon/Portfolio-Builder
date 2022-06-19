import Tab from "@mui/material/Tab"
import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TabPanel from "./TabPanel"
import BlockContainer from "@container/BlockContainer"
import { CAREER_TAB_PANEL } from "@type/constants"

interface IProfileProps {
  value: "Career"
}

export default function Career({ value }: IProfileProps) {
  return (
    <>
      <BlockContainer dataTestId={CAREER_TAB_PANEL} blockType={"Career"} />
    </>
  )
}
