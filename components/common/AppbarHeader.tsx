import { styled, useTheme } from "@mui/material/styles"
const AppbarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  //   padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  padding: 0,
  justifyContent: "flex-start",
}))

export default AppbarHeader
