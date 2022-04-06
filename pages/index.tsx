import type { GetStaticProps, NextPage } from "next";
import TestContainer from "../src/container/TestContainer";
const Home: NextPage = () => {
  return (
    <>
      <TestContainer />
    </>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
