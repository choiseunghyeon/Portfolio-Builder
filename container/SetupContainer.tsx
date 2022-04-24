import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { foldTab } from "@store/root";
import { tabFold } from "@store/selector";
import { EN_TAB_VALUE, TabType } from "@type/tab";
import { panelProvider } from "@components/setup/panel/provider";
import TabPanel from "@components/setup/panel/TabPanel";
import IconComponent from "@components/common/IconComponent";

function a11yProps(value: TabType) {
  return {
    id: `vertical-tab-${value}`,
    "aria-controls": `vertical-tabpanel-${value}`,
    value,
  };
}

export default function SetupContainer() {
  const [value, setValue] = React.useState<TabType>("MiniMap");
  const dispatch = useDispatch();
  const needTabFold = useSelector(tabFold);
  const CurrentTabPanel = panelProvider[value];
  const handleChange = (event: React.SyntheticEvent, newValue: TabType) => {
    if (newValue === "Fold") {
      return;
    }
    dispatch(foldTab(false));
    setValue(newValue);
  };

  const toggleTabPanel = () => {
    dispatch(foldTab(!needTabFold));
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
      <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
        <Tab label={"MiniMap"} {...a11yProps("MiniMap")} />
        <Tab label={"Project"} {...a11yProps("Project")} />
        <Tab label={"Career"} {...a11yProps("Career")} />
        <Tab label={"Profile"} {...a11yProps("Profile")} />
        <Tab label={"접기"} icon={<IconComponent icon="ArrowBack" />} onClick={toggleTabPanel} {...a11yProps("Fold")} />
      </Tabs>
      <Box sx={{ display: `${needTabFold ? "none" : "block"}` }}>
        <TabPanel value={value}>
          <CurrentTabPanel value={value} />
        </TabPanel>
      </Box>
    </Box>
  );
}
