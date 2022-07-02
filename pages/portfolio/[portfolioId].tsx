import { Box, CssBaseline, Grid } from "@mui/material"
import type { NextPage } from "next"
import HeaderContainer from "@container/HeaderContainer"
import DirectoryNavigation from "@components/common/DirectoryNavigation"
import UserCard from "@components/common/UserCard"
import Main from "@components/common/Main"
import AppbarHeader from "@components/common/AppbarHeader"
import { useRouter } from "next/router"
import PreviewContainer from "@container/PreviewContainer"

const Portfolio: NextPage = () => {
  const router = useRouter()
  console.log(router)
  const { portfolioId }: any = router.query
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Main>
          <Grid container sx={{ overflow: "hidden" }}>
            <Grid item xs={12} sx={{ height: "calc(100vh - 64px)", overflowY: "auto", paddingX: 2 }}>
              <PreviewContainer portfolioId={portfolioId} />
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  )
}

export default Portfolio
