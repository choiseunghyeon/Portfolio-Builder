import { useDispatch, useSelector } from "react-redux"
import { addBlock, foldTab, IAddBlockPayload } from "@store/root"
import { tabFold } from "@store/selector"
import { EN_TAB_VALUE, TabType } from "@type/tab"
import { panelProvider } from "@components/setup/panel/provider"
import TabPanel from "@components/setup/panel/TabPanel"
import IconComponent from "@components/common/IconComponent"
import { Grid, Tabs, Tab, Typography, Box } from "@mui/material"
import { BlockType } from "@type/block"
import { CAREER_TAB as CAREER_TAB, MARKDOWN_TAB, MINI_MAP_TAB, PORTFOLIO_TAB, PROFILE_TAB, PROJECT_TAB } from "@constants/testConstants"
import { useState } from "react"
import { getChangedPortfolioInfo } from "@lib/api/jsonDiff"

function a11yProps(value: TabType) {
  return {
    id: `vertical-tab-${value}`,
    "aria-controls": `vertical-tabpanel-${value}`,
    value,
  }
}
const tabList: TabType[] = ["MiniMap", "Profile", "Project", "Career", "Portfolio", "Fold", "MarkDown"]
export default function SetupContainer() {
  const [currentTabValue, setCurrentTabValue] = useState<TabType>("MiniMap")
  const dispatch = useDispatch()
  const needTabFold = useSelector(tabFold)
  const CurrentTabPanel = panelProvider[currentTabValue]
  const handleChange = (event: React.SyntheticEvent, newValue: TabType) => {
    if (newValue === "Fold") {
      return
    }
    dispatch(foldTab(false))
    setCurrentTabValue(newValue)
  }

  const toggleTabPanel = () => {
    dispatch(foldTab(!needTabFold))
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Tabs orientation="vertical" variant="fullWidth" value={currentTabValue} onChange={handleChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab label={"MiniMap"} {...a11yProps("MiniMap")} data-testid={MINI_MAP_TAB} />
          <Tab label={"Profile"} {...a11yProps("Profile")} data-testid={PROFILE_TAB} />
          <Tab label={"Project"} {...a11yProps("Project")} data-testid={PROJECT_TAB} />
          <Tab label={"Portfolio"} {...a11yProps("Portfolio")} data-testid={PORTFOLIO_TAB} />
          <Tab label={"Career"} {...a11yProps("Career")} data-testid={CAREER_TAB} />
          <Tab label={"MarkDown"} {...a11yProps("MarkDown")} data-testid={MARKDOWN_TAB} />
          {/* <Tab label={"접기"} icon={<IconComponent icon="ArrowBack" />} onClick={toggleTabPanel} {...a11yProps("Fold")} /> */}
        </Tabs>
      </Grid>
      <Grid item xs={8}>
        <Box sx={{ display: `${needTabFold ? "none" : "block"}`, flexGrow: 1 }}>
          {tabList.map(tabPanelValue => (
            <TabPanel key={tabPanelValue} currentTabValue={currentTabValue} tabValue={tabPanelValue}>
              <CurrentTabPanel value={tabPanelValue} />
            </TabPanel>
          ))}
        </Box>
      </Grid>
    </Grid>
  )
}
