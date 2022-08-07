import { Box, CssBaseline, Grid } from "@mui/material"
import type { NextPage } from "next"
import HeaderContainer from "@container/builder/HeaderContainer"
import DirectoryNavigation from "@components/common/DirectoryNavigation"
import UserCard from "@components/common/UserCard"
import Main from "@components/common/Main"
import AppbarHeader from "@components/common/AppbarHeader"
import { useProfileList } from "@lib/hooks/query"
import { useRouter } from "next/router"

const Directory: NextPage = () => {
  const profileList = useProfileList()
  const router = useRouter()
  console.log(profileList)
  if (!profileList) return null
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
              {profileList.map((profileInfo, index) => {
                const { name, imageSrc, description, subDescription } = profileInfo.profile
                return (
                  <Grid item xs={4} key={index} onClick={() => router.push(`/portfolio/${profileInfo.portfolioId}`)}>
                    <UserCard key={index} imageSrc={imageSrc} name={name} description={description} subDescription={subDescription} />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Main>
      </Box>
    </>
  )
}

export default Directory
