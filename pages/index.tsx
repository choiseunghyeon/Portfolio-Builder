import { AppBar, Box, Button, Dialog, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Toolbar, Typography } from "@mui/material"
import PreviewContainer from "@container/PreviewContainer"
import BlockContainer from "@container/BlockContainer"
import type { GetStaticProps, NextPage } from "next"
import SetupContainer from "@container/SetupContainer"
import { useSelector } from "react-redux"
import { tabFold } from "@store/selector"
import { useSelect } from "@mui/base"
import { useState } from "react"
import IconComponent from "@components/common/IconComponent"
import Header from "@components/common/Header"
import HeaderContainer from "@container/HeaderContainer"
import GridTemplate from "@components/common/LayoutTemplate"

const drawerWidth = window?.innerWidth ? window.innerWidth / 2.4 : 320

const Home: NextPage = () => {
  const [toggleDrawer, setToggleDrawer] = useState(false)
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
  return (
    <>
      <GridTemplate>
        <Grid item xs={setupWidthRatio} sx={{ borderRight: 1, borderColor: "divider", height: "calc(100vh - 64px)", overflowY: "auto" }}>
          <SetupContainer />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
          <PreviewContainer />
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconButton onClick={() => setToggleDrawer(!toggleDrawer)} sx={{ position: "absolute", right: 0 }} size="large" color="inherit" aria-label="menu">
            <IconComponent icon="ArrowBack" />
            <SwipeableDrawer anchor={"right"} open={toggleDrawer} onClose={() => setToggleDrawer(false)} onOpen={() => setToggleDrawer(true)}>
              <Grid container spacing={1} sx={{ overflow: "hidden", width: drawerWidth, height: "calc(100vh - 64px)", overflowY: "auto" }}>
                <Grid item xs={12}>
                  <AppBar position="static">
                    <Toolbar>
                      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        포트폴리오 탐색 및 검색
                      </Typography>
                      <IconButton onClick={() => {}} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <IconComponent icon="Search" />
                      </IconButton>
                      <IconButton onClick={handleClickOpen} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <IconComponent icon="ContentCopy" />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                </Grid>

                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                  {/* 다른 유저의 portfolio 검색 및 참고 */}
                  <PreviewContainer />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </SwipeableDrawer>
            <SimpleDialog selectedValue={selectedValue} open={openDialog} onClose={handleClose} />
          </IconButton>
        </Grid>
      </GridTemplate>
    </>
  )
}

export default Home

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
