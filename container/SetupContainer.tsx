import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addBlock, foldTab, IAddBlockPayload } from "@store/root";
import { tabFold } from "@store/selector";
import { EN_TAB_VALUE, TabType } from "@type/tab";
import { panelProvider } from "@components/setup/panel/provider";
import TabPanel from "@components/setup/panel/TabPanel";
import IconComponent from "@components/common/IconComponent";
import { Grid } from "@mui/material";
import { BlockType } from "@type/block";

function a11yProps(value: TabType) {
  return {
    id: `vertical-tab-${value}`,
    "aria-controls": `vertical-tabpanel-${value}`,
    value,
  };
}
const tabList: TabType[] = ["MiniMap", "Profile", "Project", "Career", "Fold"];
export default function SetupContainer() {
  const [currentTabValue, setCurrentTabValue] = React.useState<TabType>("MiniMap");
  const dispatch = useDispatch();
  const needTabFold = useSelector(tabFold);
  const CurrentTabPanel = panelProvider[currentTabValue];
  const handleChange = (event: React.SyntheticEvent, newValue: TabType) => {
    if (newValue === "Fold") {
      return;
    }
    dispatch(foldTab(false));
    setCurrentTabValue(newValue);
  };

  const toggleTabPanel = () => {
    dispatch(foldTab(!needTabFold));
  };

  const onAddBlock = (blockType: BlockType, title: string) => {
    const payload: IAddBlockPayload = {
      blockType,
      title,
    };
    dispatch(addBlock(payload));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Tabs orientation="vertical" variant="fullWidth" value={currentTabValue} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab label={"MiniMap"} {...a11yProps("MiniMap")} />
          <Tab label={"Project"} {...a11yProps("Project")} />
          <Tab label={"Career"} {...a11yProps("Career")} />
          <Tab label={"Profile"} {...a11yProps("Profile")} />
          <Tab label={"접기"} icon={<IconComponent icon="ArrowBack" />} onClick={toggleTabPanel} {...a11yProps("Fold")} />
        </Tabs>
      </Grid>
      <Grid item xs={8}>
        <Box sx={{ display: `${needTabFold ? "none" : "block"}`, flexGrow: 1 }}>
          {tabList.map(tabPanelValue => (
            <TabPanel key={tabPanelValue} currentTabValue={currentTabValue} tabValue={tabPanelValue}>
              <CurrentTabPanel value={tabPanelValue} onAddBlock={onAddBlock} />
            </TabPanel>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
