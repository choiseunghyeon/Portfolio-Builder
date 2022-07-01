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

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean
  drawerWidth?: number
}>(({ theme, open, drawerWidth = 0 }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
  drawerWidth?: number
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth = 320 }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  //   padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  padding: 0,
  justifyContent: "flex-start",
}))

export default function PersistentDrawerRight() {
  const theme = useTheme()
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
          <DrawerHeader />
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
        <DrawerHeader>
          <Grid container>
            <Grid item xs={2}>
              <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
            </Grid>
            <Grid item xs={7} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <Typography component="div">포트폴리오 탐색 및 검색</Typography>
            </Grid>
            <Grid item xs={3}>
              <IconButton onClick={() => {}} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <IconComponent icon="Search" />
              </IconButton>
              <IconButton onClick={handleClickOpen} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <IconComponent icon="ContentCopy" />
              </IconButton>
            </Grid>
          </Grid>
        </DrawerHeader>
        <Divider />
        <Grid container spacing={1} sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
          <Grid item xs={12} sx={{ marginX: 1 }}>
            {/* 다른 유저의 portfolio 검색 및 참고 */}
            <PreviewContainer />
          </Grid>
        </Grid>
      </Drawer>
      <SimpleDialog selectedValue={selectedValue} open={openDialog} onClose={handleClose} />
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
