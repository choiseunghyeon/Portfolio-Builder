import { useEffect, useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import CssBaseline from "@mui/material/CssBaseline"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Button, Dialog, DialogTitle, Grid } from "@mui/material"
import SetupContainer from "@container/SetupContainer"
import PreviewContainer from "@container/PreviewContainer"
import IconComponent from "@components/common/IconComponent"
import { useSelector } from "react-redux"
import { tabFold } from "@store/selector"
import HeaderContainer from "@container/HeaderContainer"
import Main from "@components/common/Main"
import AppbarHeader from "@components/common/AppbarHeader"
import UserCard from "@components/common/UserCard"

export default function PersistentDrawerRight() {
  const [open, setOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(320)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedValue, setSelectedValue] = useState("")
  const needTabFold = useSelector(tabFold)
  const setupWidthRatio = needTabFold ? 2 : 4

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = (value: string) => {
    setOpenDialog(false)
    setSelectedValue(value)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    setDrawerWidth(window?.innerWidth ? window.innerWidth / 2.4 : 320)
  })

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderContainer open={open} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen} />
        <Main open={open} drawerWidth={drawerWidth}>
          <AppbarHeader />
          <Grid container sx={{ overflow: "hidden" }}>
            <Grid item xs={setupWidthRatio} sx={{ borderRight: 1, borderColor: "divider", height: "calc(100vh - 64px)", overflowY: "auto" }}>
              <SetupContainer />
            </Grid>
            <Grid item xs={8} sx={{ height: "calc(100vh - 64px)", overflowY: "auto", paddingX: 2 }}>
              <PreviewContainer />
            </Grid>
          </Grid>
        </Main>
      </Box>
      <CustomDrawer open={open} drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose} handleClickOpen={handleClickOpen} />
      <SimpleDialog selectedValue={selectedValue} open={openDialog} onClose={handleClose} />
    </>
  )
}

type DrawerStatusType = "list" | "portfolio"
function CustomDrawer({ open, drawerWidth, handleDrawerClose, handleClickOpen }) {
  const theme = useTheme()
  const [status, setStatus] = useState<DrawerStatusType>("list")
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}>
        <AppbarHeader>
          <Grid container>
            <Grid item xs={2}>
              <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
            </Grid>
            <Grid item xs={7} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Typography component="div">포트폴리오 탐색 및 검색</Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={() => setStatus("list")} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <IconComponent icon="FolderShared" />
              </IconButton>
              {status === "portfolio" && (
                <IconButton onClick={handleClickOpen} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                  <IconComponent icon="ContentCopy" />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </AppbarHeader>
        <Divider />
        <Grid container spacing={1} sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
          {status === "list" && (
            <Grid container item xs={12} spacing={1} onClick={() => setStatus("portfolio")}>
              {/* 제일 인기 많은 portfolio 보여주기 */}
              {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((info, index) => (
                <Grid item xs={6} key={index}>
                  <UserCard key={index} />
                </Grid>
              ))}
            </Grid>
          )}
          {status === "portfolio" && (
            <Grid item xs={12} sx={{ marginX: 1 }}>
              {/* 다른 유저의 portfolio 검색 및 참고 */}
              <PreviewContainer />
            </Grid>
          )}
        </Grid>
      </Drawer>
    </>
  )
}
export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}
function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>해당 포트폴리오를 복사하시겠습니까? 복사 할 경우 현재 작성된 내용은 사라집니다.</DialogTitle>
      <Button onClick={() => handleListItemClick("copy")}>복사</Button>
      <Button onClick={() => handleListItemClick("cancle")}>취소</Button>
    </Dialog>
  )
}
