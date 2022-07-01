import { Grid } from "@mui/material"
import type { NextPage } from "next"
import HeaderContainer from "@container/HeaderContainer"
import DirectoryNavigation from "@components/common/DirectoryNavigation"
import UserCard from "@components/common/UserCard"
import GridTemplate from "@components/common/GridTemplate"
const Directory: NextPage = () => {
  return (
    <>
      <GridTemplate>
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
      </GridTemplate>
    </>
  )
}

export default Directory
