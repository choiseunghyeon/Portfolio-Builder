import { previewProvider } from "@components/preview/provider";
import { useSelector } from "react-redux";
import { previewSelectorProvider } from "@store/selector";
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
// redux 접근 가능할듯 초기화 하면 container에서 useSelector로 값 가져올 수 있을 듯
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
