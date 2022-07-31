import HeaderContainer from "@container/HeaderContainer"
import * as React from "react"
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
import { Grid, IconButton, Paper, Stack } from "@mui/material"
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

function PageLayout() {
  let arr: number[] = []
  arr.length = 50
  arr.fill(1)
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1, backgroundColor: "white", boxShadow: "none" }}>
        <Toolbar>
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={2}>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                  color: "black",
                }}>
                PPB
                <Typography component="span" sx={{ fontSize: "0.8rem" }}>
                  {" "}
                  for developer
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Grid container justifyContent="center" alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    noWrap
                    color="error"
                    sx={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      letterSpacing: ".3rem",
                      textDecoration: "none",
                    }}>
                    Tech-blog
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Button variant="outlined" size="medium" startIcon={<IconComponent icon="Person" />} sx={{ marginRight: 1 }}>
                    My Page
                  </Button>
                  <Button variant="contained" color="error" size="medium">
                    포트폴리오 만들기
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Grid container spacing={2} sx={{ overflow: "hidden" }}>
          <Grid item xs={2} sx={{ backgroundColor: "black", color: "white", borderTopRightRadius: "55px 65px", height: "calc(100vh - 64px)" }}>
            <Grid container direction="column" justifyContent="space-between" sx={{ height: "100% !important" }}>
              <Grid item>
                <Grid container spacing={1}>
                  {[
                    { text: "Home", icon: "Inbox" },
                    { text: "Discovery", icon: "Inbox" },
                    { text: "Tech-blog", icon: "Inbox" },
                    { text: "Career", icon: "Inbox" },
                    { text: "Community", icon: "Inbox" },
                  ].map(({ text, icon }, index) => (
                    <Grid key={text} item xs={12}>
                      <Button variant="text" size="medium" startIcon={<IconComponent icon={icon} />} sx={{ color: "white" }}>
                        {text}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item>팀 소개 페이지</Grid>
              <Grid item>
                <Button variant="text" size="medium" startIcon={<IconComponent icon={"Person"} />} sx={{ color: "white" }}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7} sx={{ overflowY: "auto", height: "calc(100vh - 64px)", paddingX: 4 }}>
            <Typography paragraph>PPB는 기술블로그를 꾸준히 운영하는 기업이 개발자가 성장하기 좋은 개발 문화를 가진 공간이라고 믿어요.</Typography>
            <Grid container sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sx={{ marginBottom: 1.2 }}>
                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                  <Grid item>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        textDecoration: "none",
                      }}>
                      Favorite (10)
                    </Typography>
                  </Grid>
                  <Grid item>*최신순으로 기본 정렬</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                    <Grid key={value} item xs={4}>
                      <TechBlogCard />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sx={{ marginBottom: 1.2 }}>
                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                  <Grid item>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        textDecoration: "none",
                      }}>
                      All (50)
                    </Typography>
                  </Grid>
                  <Grid item>최신순 | 별점순 | 클릭순</Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {arr.map(value => (
                    <Grid key={value} item xs={4}>
                      <TechBlogCard />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3} sx={{ height: "calc(100vh - 64px)" }}>
            <Grid container direction="column" columns={16} sx={{ height: "100%" }}>
              <Grid item xs={6} sx={{ border: "1px solid black", padding: 1 }}>
                {/* <CareerSubCard /> */}
                <Grid container direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
                  <Grid item>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>관심있는 기업</Typography>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>채용 홈페이지 바로가기</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" spacing={1}>
                      {["토스", "당근마켓", "뱅크샐러드"].map(career => (
                        <Grid item key={career}>
                          <Button variant="contained" color="info" size="medium" sx={{ width: "100%", color: "white" }}>
                            {career}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item alignSelf={"flex-end"}>
                    <Button variant="text" size="small" startIcon={<IconComponent icon={"Add"} />}>
                      more
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={9} sx={{ border: "1px solid black", padding: 1 }}>
                <Grid container direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
                  <Grid item>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>관심있는 기업</Typography>
                    <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>현직자 1 on 1 바로가기</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container direction="column" spacing={1}>
                      {["COFFEECHAT", "careerly"].map(career => (
                        <Grid item key={career}>
                          <Button variant="outlined" size="medium" sx={{ width: "100%" }}>
                            {career}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item alignSelf={"flex-end"}>
                    <Button variant="text" size="small" startIcon={<IconComponent icon={"Add"} />}>
                      현직자를 만나면 어떤 걸 물어봐야 할까?
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PageLayout
