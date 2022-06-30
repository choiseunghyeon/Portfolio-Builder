import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from "@mui/material"

import { useSelector } from "react-redux"
import { tabFold } from "@store/selector"

import HeaderContainer from "@container/HeaderContainer"
const GridTemplate = ({ children }: any) => {
  return (
    <>
      <Grid container spacing={1} sx={{ overflow: "hidden" }}>
        <Grid item xs={12}>
          <HeaderContainer />
        </Grid>
        {children}
      </Grid>
    </>
  )
}

export default GridTemplate
