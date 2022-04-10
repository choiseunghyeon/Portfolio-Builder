import { Grid } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import PreviewContainer from "../src/container/PreviewContainer";
import SetupContainer from "../src/container/SetupContainer";
const Home: NextPage = () => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <PreviewContainer />
        </Grid>
        <Grid item xs={4}>
          <SetupContainer />
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
