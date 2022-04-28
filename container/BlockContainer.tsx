import { Box, Button, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SetupPanel from "@components/SetupPanel";
import type { GetStaticProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeItemValue, swapBlock } from "@store/root";
import { BlockType } from "@type/block";
import { selectBlockByType } from "@store/selector";
import TabPanel from "@components/setup/panel/TabPanel";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type TabValueType = "block" | "style";
interface ISetupBlockContainer {
  blockType: BlockType;
}
const BlockContainer = ({ blockType }: ISetupBlockContainer) => {
  const blocks = useSelector(state => selectBlockByType(state, blockType));
  const [currentTabValue, setCurrentTabValue] = useState<TabValueType>("block");
  const handleChange = (event: React.SyntheticEvent, newValue: TabValueType) => {
    setCurrentTabValue(newValue);
  };

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
      <Tabs value={currentTabValue} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="내용" value="block" {...a11yProps(0)} />
        <Tab label="스타일" value="style" {...a11yProps(1)} />
      </Tabs>
      {/* <Button onClick={handleTodo}>클릭</Button> */}
      <TabPanel currentTabValue={currentTabValue} tabValue="block">
        {winReady && <SetupPanel blocks={blocks} handleField={handleField} swapBlockPosition={swapBlockPosition} />}
      </TabPanel>
      <TabPanel currentTabValue={currentTabValue} tabValue="style">
        스타일 정의
      </TabPanel>
    </>
  );
};

export default BlockContainer;
