import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabType } from "@type/tab";

interface TabPanelProps {
  children?: React.ReactNode;
  currentTabValue: string;
  tabValue: string;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, currentTabValue, tabValue } = props;

  return (
    <Box hidden={currentTabValue !== tabValue} sx={{ overflow: "scroll" }}>
      {currentTabValue === tabValue && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}
