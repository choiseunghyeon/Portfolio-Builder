import Tab from "@mui/material/Tab";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import BlockContainer from "@container/BlockContainer";
import { TabType } from "@type/tab";

interface IProjectProps {
  value: "Project";
}

export default function Project({ value }: IProjectProps) {
  return <BlockContainer blockType={value} />;
}
