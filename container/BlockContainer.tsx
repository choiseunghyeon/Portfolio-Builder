import { Button, Typography } from "@mui/material";
import SetupPanel from "@components/SetupPanel";
import type { GetStaticProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeItemValue, swapBlock } from "@store/root";
import { BlockType } from "@type/block";
import { selectBlockByType } from "@store/selector";
interface ISetupBlockContainer {
  blockType: BlockType;
}
const BlockContainer = ({ blockType }: ISetupBlockContainer) => {
  const blocks = useSelector(state => selectBlockByType(state, blockType));
  const dispatch = useDispatch();
  const handleField = useCallback(
    (blockId, fieldId, valueId, value: any): void => {
      const payload = {
        blockId,
        fieldId,
        valueId,
        value,
      };
      dispatch(changeItemValue(payload));
    },
    [dispatch]
  );

  const swapBlockPosition = useCallback(
    (sourceIndex, destinationIndex) => {
      const payload = {
        sourceIndex,
        destinationIndex,
      };
      dispatch(swapBlock(payload));
    },
    [dispatch]
  );
  const [winReady, setWinReady] = useState(false);

  useEffect(() => {
    setWinReady(true);
  }, []);

  return (
    <>
      {/* <Button onClick={handleTodo}>클릭</Button> */}
      {winReady && <SetupPanel blocks={blocks} handleField={handleField} swapBlockPosition={swapBlockPosition} />}
    </>
  );
};

export default BlockContainer;

// export const getStaticProps: GetStaticProps = async context => {
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }
