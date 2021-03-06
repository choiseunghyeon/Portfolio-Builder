import { useEffect, useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"

import CssBaseline from "@mui/material/CssBaseline"

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

export default function EditPortfolioPage() {
  const [currentPortfolioId, setCurrentPortfolioId] = useState("1")
  const [open, setOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(320)
  const needTabFold = useSelector(tabFold)
  const setupWidthRatio = needTabFold ? 2 : 4

  const onCopyPortfolio = (portfolioId: string) => {
    setCurrentPortfolioId(portfolioId)
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
              {/* dummy data??? ?????? ?????? ????????? ?????? ?????? ?????? ????????? */}
              <PreviewContainer portfolioId={currentPortfolioId} />
            </Grid>
          </Grid>
        </Main>
      </Box>
      <CustomDrawer open={open} drawerWidth={drawerWidth} handleDrawerClose={handleDrawerClose} onCopyPortfolio={onCopyPortfolio} />
    </>
  )
}

type DrawerStatusType = "list" | "portfolio"
function CustomDrawer({ open, drawerWidth, handleDrawerClose, onCopyPortfolio }) {
  const theme = useTheme()
  const [status, setStatus] = useState<DrawerStatusType>("list")
  const [openDialog, setOpenDialog] = useState(false)
  const [currentPortfolioId, setCurrentPortfolioId] = useState("")

  const handleClose = (value?: string) => {
    setOpenDialog(false)
    if (value === "copy") onCopyPortfolio(currentPortfolioId)
  }

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onChangePortfolioId = (portfolioId: string) => {
    setStatus("portfolio")
    setCurrentPortfolioId(portfolioId)
  }
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
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography> */}
          <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1, textAlign: "center !important" }}>
            ??????????????? ?????? ??? ??????
          </Typography>
          <IconButton onClick={() => setStatus("list")} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <IconComponent icon="FolderShared" />
          </IconButton>
          {status === "portfolio" && (
            <IconButton onClick={handleClickOpen} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <IconComponent icon="ContentCopy" />
            </IconButton>
          )}
        </AppbarHeader>
        <Divider />
        <Grid container spacing={1} sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
          {status === "list" && (
            <Grid container item xs={12} spacing={1}>
              {/* ?????? ?????? ?????? portfolio ???????????? */}
              {["1", "2"].map((portfolioId, index) => (
                <Grid item xs={6} key={index} onClick={() => onChangePortfolioId(portfolioId)}>
                  <UserCard
                    key={index}
                    imageSrc={"https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg"}
                    name={"?????????"}
                    description={"Front End Developer"}
                    subDescription={"??????????????? :) "}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {status === "portfolio" && (
            <Grid item xs={12} sx={{ marginX: 1 }}>
              {/* ?????? ????????? portfolio ?????? ??? ?????? */}
              <PreviewContainer portfolioId={currentPortfolioId} portfolioPageType={"search"} />
            </Grid>
          )}
        </Grid>
      </Drawer>
      <SimpleDialog open={openDialog} onClose={handleClose} />
    </>
  )
}
export interface SimpleDialogProps {
  open: boolean
  onClose: (value?: string) => void
}
function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>?????? ?????????????????? ????????????????????????? ?????? ??? ?????? ?????? ????????? ????????? ???????????????.</DialogTitle>
      <Button onClick={() => handleListItemClick("copy")}>??????</Button>
      <Button onClick={() => handleListItemClick("cancle")}>??????</Button>
    </Dialog>
  )
}
