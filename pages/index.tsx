import { useEffect, useState } from "react"
import { useTheme } from "@mui/material/styles"

import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { Button, Dialog, DialogTitle, Grid, Box, Typography, Divider, IconButton, Drawer, CssBaseline } from "@mui/material"
import SetupContainer from "@container/builder/SetupContainer"
import PreviewContainer from "@container/builder/PreviewContainer"
import IconComponent from "@components/common/IconComponent"
import { useSelector } from "react-redux"
import { tabFold } from "@store/selector"
import HeaderContainer from "@container/builder/HeaderContainer"
import Main from "@components/common/Main"
import AppbarHeader from "@components/common/AppbarHeader"
import UserCard from "@components/common/UserCard"
import PortfolioContainer from "@container/builder/PortfolioContainer"
import LoginDialog from "@components/common/LoginDialog"

export default function EditPortfolioPage() {
  const [currentPortfolioId, setCurrentPortfolioId] = useState("1")
  const [open, setOpen] = useState(false)
  const [drawerWidth, setDrawerWidth] = useState(320)

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
          <PortfolioContainer />
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
          <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}</IconButton>
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1, textAlign: "center !important" }}>
            포트폴리오 탐색 및 검색
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
              {/* 제일 인기 많은 portfolio 보여주기 */}
              {["1", "2"].map((portfolioId, index) => (
                <Grid item xs={6} key={index} onClick={() => onChangePortfolioId(portfolioId)}>
                  <UserCard
                    key={index}
                    imageSrc={"https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg"}
                    name={"최승현"}
                    description={"Front End Developer"}
                    subDescription={"안녕하세요 :) "}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {status === "portfolio" && (
            <Grid item xs={12} sx={{ marginX: 1 }}>
              {/* 다른 유저의 portfolio 검색 및 참고 */}
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
      <DialogTitle>해당 포트폴리오를 복사하시겠습니까? 복사 할 경우 현재 작성된 내용은 사라집니다.</DialogTitle>
      <Button onClick={() => handleListItemClick("copy")}>복사</Button>
      <Button onClick={() => handleListItemClick("cancle")}>취소</Button>
    </Dialog>
  )
}
