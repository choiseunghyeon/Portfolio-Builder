import { previewProvider } from "@components/preview/provider";
import { useSelector } from "react-redux";
import { previewSelectorProvider, selectBlocks, selectBlockStyle } from "@store/selector";
import { Grid } from "@mui/material";
const PreviewContainer = () => {
  const blocks = useSelector(selectBlocks);
  return (
    <>
      <Grid container spacing={1}>
        {blocks.map(block => {
          const PreviewComponent = previewProvider[block.type];
          const previewProps = previewSelectorProvider[block.type](block);
          return (
            <Grid key={block.id} item xs={block.style.xs}>
              <PreviewComponent key={block.id} {...previewProps} />
            </Grid>
          );
        })}
      </Grid>
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
