import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import PreviewContainer from "@container/PreviewContainer";
import BlockContainer from "@container/BlockContainer";
import type { GetStaticProps, NextPage } from "next";
import SetupContainer from "@container/SetupContainer";
import { useSelector } from "react-redux";
import { tabFold } from "@store/selector";
import { useSelect } from "@mui/base";
import { useState } from "react";
import IconComponent from "@components/common/IconComponent";
const Home: NextPage = () => {
  const needTabFold = useSelector(tabFold);
  const setupWidthRatio = needTabFold ? 2 : 4;
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PPB
                <Button color="inherit">디렉토리</Button>
                <Button color="inherit">채용</Button>
                <Button color="inherit">로그인</Button>
              </Typography>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <IconComponent icon="Search" />
              </IconButton>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <IconComponent icon="Menu" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={setupWidthRatio} sx={{ borderRight: 1, borderColor: "divider" }}>
          <SetupContainer />
        </Grid>
        <Grid item xs={8}>
          <PreviewContainer />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
