import { Box, Grid, Tab, Tabs } from "@mui/material"
import type { NextPage } from "next"
import TabPanel from "@components/setup/panel/TabPanel"
import { useState } from "react"
import IconComponent from "@components/common/IconComponent"
import GridTemplate from "@components/common/LayoutTemplate"

const defaultTabValue = "settings"
const Settings: NextPage = () => {
  const [value, setValue] = useState(defaultTabValue)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <GridTemplate>
      <Grid item xs={4} sx={{ borderRight: 1, borderColor: "divider", height: "calc(100vh - 64px)", overflowY: "auto" }}>
        <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange} sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tab icon={<IconComponent icon="Settings" />} value="settings" iconPosition="start" label="설정" />
          <Tab icon={<IconComponent icon="Settings" />} value="settings2" iconPosition="start" label="설저2" />
          <Tab icon={<IconComponent icon="Settings" />} value="settings3" iconPosition="start" label="설정3" />
          {/* <Tab label="Item Two"  /> */}
        </Tabs>
      </Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={6} sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
        <TabPanel currentTabValue={value} tabValue="settings">
          Item One
        </TabPanel>
        <TabPanel currentTabValue={value} tabValue="settings2">
          Item One
        </TabPanel>
        <TabPanel currentTabValue={value} tabValue="settings3">
          Item One
        </TabPanel>
      </Grid>
    </GridTemplate>
  )
}

export default Settings
