import * as React from "react"
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Inbox, Drafts } from "@mui/icons-material"

interface IDirectoryNavigationProps {}
export default function DirectoryNavigation({}: IDirectoryNavigationProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index)
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={selectedIndex === 1} onClick={event => handleListItemClick(event, 1)}>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="전체 디렉토리" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected={selectedIndex === 2} onClick={event => handleListItemClick(event, 2)}>
              <ListItemIcon>
                <Drafts />
              </ListItemIcon>
              <ListItemText primary="개발" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}
