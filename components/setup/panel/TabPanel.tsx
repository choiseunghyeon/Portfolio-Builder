import { Typography, Box } from "@mui/material"
import { TabType } from "@type/tab"

interface TabPanelProps {
  children?: React.ReactNode
  currentTabValue: string
  tabValue: string
}

export default function TabPanel(props: TabPanelProps) {
  const { children, currentTabValue, tabValue } = props

  return (
    <Box data-testid={`${currentTabValue}Panel`} hidden={currentTabValue !== tabValue}>
      {currentTabValue === tabValue && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  )
}
