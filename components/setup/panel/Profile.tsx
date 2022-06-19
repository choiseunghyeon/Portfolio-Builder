import Tab from "@mui/material/Tab"
import * as React from "react"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TabPanel from "./TabPanel"
import BlockContainer from "@container/BlockContainer"
import { PROFILE_TAB_PANEL } from "@type/constants"

interface IProfileProps {
  value: "Profile"
}

export default function Profile({ value }: IProfileProps) {
  return <BlockContainer dataTestId={PROFILE_TAB_PANEL} blockType={"Profile"} />
}
