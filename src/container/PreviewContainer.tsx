import { useSelector } from "react-redux";
import { previewProvider } from "../components/preview/provider";
import { previewSelectorProvider } from "../store/selector";
const PreviewContainer = () => {
  const blocks = useSelector(state => state.blocks);

  return (
    <>
      {blocks.map(block => {
        const PreviewComponent = previewProvider[block.type];
        const previewProps = previewSelectorProvider[block.type](block);
        return <PreviewComponent key={block.id} {...previewProps} />;
      })}
    </>
  );
};

export default PreviewContainer;

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
