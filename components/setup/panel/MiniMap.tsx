import Tab from "@mui/material/Tab";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";

interface IMiniMapProps {
  value: "MiniMap";
}

export default function MiniMap({ value }: IMiniMapProps) {
  return <div>MiniMap 설정 화면;</div>;
}
