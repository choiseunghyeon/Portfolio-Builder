import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TabType } from "@type/tab";

interface TabPanelProps {
  children?: React.ReactNode;
  value: TabType;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, ...other } = props;

  return (
    <Box sx={{ p: 3 }}>
      <Typography>{children}</Typography>
    </Box>
  );
}
