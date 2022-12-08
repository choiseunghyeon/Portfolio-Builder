import { Button, IconButton, SwipeableDrawer, Toolbar, Typography } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import IconComponent from "./IconComponent"
import { styled, useTheme } from "@mui/material/styles"
import LoginTypography from "./LoginTypography"
import LoginContainer from "@container/common/LoginContainer"

interface IHeaderProps extends AppBarProps {
  handleNavigate: (href: string) => void
  handleDrawerOpen?: Function
}
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

export default function Header({ handleNavigate, open, drawerWidth, handleDrawerOpen }: IHeaderProps) {
  return (
    <AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PPB
          <Button color="inherit" onClick={() => handleNavigate("directory")}>
            디렉토리
          </Button>
          <Button color="inherit" onClick={() => handleNavigate("/")}>
            포트폴리오 제작
          </Button>
          <Button color="inherit">채용</Button>
          <Button color="inherit">
            <LoginContainer pageUri="/" />
          </Button>
        </Typography>
        <IconButton onClick={() => handleNavigate("settings")} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <IconComponent icon="Settings" />
        </IconButton>
        {handleDrawerOpen && (
          <IconButton onClick={() => handleDrawerOpen()} size="large" edge="end" color="inherit" aria-label="menu" sx={{ ...(open && { display: "none" }) }}>
            <IconComponent icon="Menu" />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}
