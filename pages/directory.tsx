import { Box, CssBaseline, Grid } from "@mui/material"
import type { NextPage } from "next"
import HeaderContainer from "@container/HeaderContainer"
import DirectoryNavigation from "@components/common/DirectoryNavigation"
import UserCard from "@components/common/UserCard"
import Main from "@components/common/Main"
import AppbarHeader from "@components/common/AppbarHeader"

const Directory: NextPage = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <HeaderContainer />
        <Main>
          <AppbarHeader />
          <Grid container sx={{ overflow: "hidden" }}>
            <Grid item xs={4}>
              <DirectoryNavigation />
            </Grid>
            <Grid container item xs={8} spacing={1}>
              {[1, 1, 1, 1, 1].map((info, index) => (
                <Grid item xs={4} key={index}>
                  <UserCard key={index} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  )
}

export default Directory
