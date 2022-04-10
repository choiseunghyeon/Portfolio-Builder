import type { GetStaticProps, NextPage } from "next";
import SetupContainer from "../src/container/SetupContainer";
const Home: NextPage = () => {
  return (
    <>
      <SetupContainer />
    </>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
