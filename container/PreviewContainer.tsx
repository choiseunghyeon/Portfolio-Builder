import { previewProvider } from "@components/preview/provider";
import { useSelector } from "react-redux";
import { previewSelectorProvider, selectBlockById, selectBlockLayout, selectBlocks, selectBlocksByType, selectBlockStyle } from "@store/selector";
import { Grid } from "@mui/material";
import { convertColumnCountIntoXS } from "../store/utils";
import { ColumnCountType } from "@type/blockStyle";
const PreviewContainer = () => {
  const blockLayout = useSelector(selectBlockLayout);
  return (
    <Grid container spacing={1}>
      {blockLayout.map((blockList, index) => {
        const columnCount = blockList.length as ColumnCountType;
        const xs = convertColumnCountIntoXS(columnCount);
        return (
          <Grid key={index} container>
            {blockList.map(block => {
              if (block.groupBlockType) {
                return (
                  <Grid container item xs={xs} key={block.groupBlockType}>
                    <GroupBlock type={block.groupBlockType} />
                  </Grid>
                );
              }
              return (
                <Grid item xs={xs} key={block.id}>
                  <Block key={block.id} id={block.id} />;
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};

const GroupBlock = ({ type }: any) => {
  const blocks = useSelector(state => selectBlocksByType(state, type));
  return (
    <>
      {blocks.map(block => {
        const PreviewComponent = previewProvider[block.type];
        const previewProps = previewSelectorProvider[block.type](block);
        return (
          <Grid key={block.id} item xs={block.style.xs}>
            <PreviewComponent key={block.id} {...previewProps} />
          </Grid>
        );
      })}
    </>
  );
};

const Block = ({ id }: any) => {
  const block = useSelector(state => selectBlockById(state, id));
  if (block === undefined) return null;

  const PreviewComponent = previewProvider[block.type];
  const previewProps = previewSelectorProvider[block.type](block);
  return (
    <Grid key={block.id} item xs={block.style.xs}>
      <PreviewComponent key={block.id} {...previewProps} />
    </Grid>
  );
};

export default PreviewContainer;
