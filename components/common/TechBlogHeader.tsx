import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import IconComponent from "./IconComponent"

function TechBlogHeader() {
  return (
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
  )
}

export default TechBlogHeader
