import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import PreviewContainer from "@container/PreviewContainer"
import BlockContainer from "@container/BlockContainer"
import type { GetStaticProps, NextPage } from "next"
import SetupContainer from "@container/SetupContainer"
import { useSelector } from "react-redux"
import { tabFold } from "@store/selector"
import { useSelect } from "@mui/base"
import { useState } from "react"
import IconComponent from "@components/common/IconComponent"
import Header from "@components/common/Header"
import HeaderContainer from "@container/HeaderContainer"
const Home: NextPage = () => {
  const needTabFold = useSelector(tabFold)
  const setupWidthRatio = needTabFold ? 2 : 4
  return (
    <>
      <Grid container spacing={1} sx={{ overflow: "hidden" }}>
        <Grid item xs={12}>
          <HeaderContainer />
        </Grid>
        <Grid item xs={setupWidthRatio} sx={{ borderRight: 1, borderColor: "divider", height: "calc(100vh - 64px)", overflowY: "auto" }}>
          <SetupContainer />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6} sx={{ height: "calc(100vh - 64px)", overflowY: "auto" }}>
          <PreviewContainer />
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  )
}

export default Home

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
