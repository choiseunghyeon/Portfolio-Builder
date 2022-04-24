import Tab from "@mui/material/Tab";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";

interface IProfileProps {
  value: "Career";
}

export default function Career({ value }: IProfileProps) {
  return <div>Career 설정 화면;</div>;
}
