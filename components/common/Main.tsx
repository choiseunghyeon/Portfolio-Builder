import { styled, useTheme } from "@mui/material/styles"
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
export default Main
