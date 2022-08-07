import { useState } from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import AppBar from "@mui/material/AppBar"
import CssBaseline from "@mui/material/CssBaseline"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { Chip, Grid, IconButton, Paper, Stack } from "@mui/material"
import { styled } from "@mui/material/styles"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import AdbIcon from "@mui/icons-material/Adb"
import IconComponent from "./IconComponent"
import TechBlogCard from "./TechBlogCard"
import CareerSubCard from "./CareerSubCard"
import TechBlogHeader from "./TechBlogHeader"
import Navigation from "./Navigation"
import CommunitySubCard from "./CommunitySubCard"
import TechBlogCardContainer from "@container/techblog/techBlogCardContainer"

function PageLayout() {
  const [techblog, setTechBlog] = useState<"favorite" | "all">("favorite")
  let arr: number[] = []
  arr.length = 50
  arr.fill(1)
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TechBlogHeader />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Grid container sx={{ overflow: "hidden" }}>
          {/* Navigation 영역 */}
          <Grid item xs={2} sx={{ backgroundColor: "black", color: "white", borderTopRightRadius: "55px 65px", height: "calc(100vh - 64px)", padding: 2 }}>
            <Navigation />
          </Grid>
          <Grid item xs={7} sx={{ overflowY: "auto", height: "calc(100vh - 64px)", padding: 2 }}>
            <Typography paragraph>PPB는 기술블로그를 꾸준히 운영하는 기업이 개발자가 성장하기 좋은 개발 문화를 가진 공간이라고 믿어요.</Typography>

            <TechBlogCardContainer />
          </Grid>
          <Grid item xs={3} sx={{ height: "calc(100vh - 64px)", padding: 2 }}>
            <Grid container direction="column" columns={16} sx={{ height: "100%" }}>
              <Grid item xs={6} sx={{ border: "1px solid black", padding: 1 }}>
                <CareerSubCard />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={9} sx={{ border: "1px solid black", padding: 1 }}>
                <CommunitySubCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PageLayout
