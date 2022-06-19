import { Grid } from "@mui/material"
import type { NextPage } from "next"
import HeaderContainer from "@container/HeaderContainer"
import DirectoryNavigation from "@components/common/DirectoryNavigation"
import UserCard from "@components/common/UserCard"
const Home: NextPage = () => {
  return (
    <>
      <Grid container spacing={1} sx={{ overflow: "hidden" }}>
        <Grid item xs={12}>
          <HeaderContainer />
        </Grid>
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
    </>
  )
}

export default Home
