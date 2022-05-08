import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SetupGroupPanel from "@components/SetupGroupPanel";
import type { GetStaticProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlock, changeBlockTypeStyle, changeItemValue, IAddBlockPayload, IChangeBlockTypeStylePayload, removeBlock, swapBlock } from "@store/root";
import { BlockType } from "@type/block";
import { selectBlocksByType, selectBlockTypeStyleByBlockType } from "@store/selector";
import TabPanel from "@components/setup/panel/TabPanel";
import StylePanel from "@components/StylePanel";
import IconComponent from "@components/common/IconComponent";
import { getGroupBlockDefaultNameAndLabel, isGroupBlock } from "@store/utils";
import SetupPanel from "@components/SetupPanel";

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
  const blocks = useSelector(state => selectBlocksByType(state, blockType));
  const { styleType, changableStyleTypes, columnCount, changableColumnCount } = useSelector(state => selectBlockTypeStyleByBlockType(state, blockType));
  const [currentTabValue, setCurrentTabValue] = useState<TabValueType>("block");
  const handleChange = (event: React.SyntheticEvent, newValue: TabValueType) => {
    setCurrentTabValue(newValue);
  };

  const dispatch = useDispatch();
  const handleBlockStyleType = (styleOption: Partial<IChangeBlockTypeStylePayload>) => {
    const payload = {
      blockType,
      ...styleOption,
    };
    dispatch(changeBlockTypeStyle(payload));
  };

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

  const onAddBlock = (blockType: BlockType, title: string) => {
    const payload: IAddBlockPayload = {
      blockType,
      title,
    };
    dispatch(addBlock(payload));
  };

  const onRemoveBlock = (blockId: string) => {
    dispatch(removeBlock(blockId));
  };

  const swapBlockPosition = useCallback(
    (sourceBlockId: string, destinationBlockId: string) => {
      const payload = {
        sourceBlockId,
        destinationBlockId,
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
    <Box>
      <Tabs value={currentTabValue} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="내용" value="block" {...a11yProps(0)} />
        <Tab label="스타일" value="style" {...a11yProps(1)} />
      </Tabs>
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel currentTabValue={currentTabValue} tabValue="block">
          {isGroupBlock(blockType) ? (
            winReady && <SetupGroupPanel blocks={blocks} handleField={handleField} onAddBlock={onAddBlock} swapBlockPosition={swapBlockPosition} onRemoveBlock={onRemoveBlock} />
          ) : (
            <SetupPanel blocks={blocks} handleField={handleField} />
          )}
        </TabPanel>
        <TabPanel currentTabValue={currentTabValue} tabValue="style">
          <StylePanel
            block={blocks[0]}
            styleType={styleType}
            handleBlockStyleType={handleBlockStyleType}
            changableStyleTypes={changableStyleTypes}
            columnCount={columnCount}
            changableColumnCount={changableColumnCount}
          />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default BlockContainer;

interface INewBlockNameProps {
  blockType: BlockType;
  onAddBlock: Function;
}

function NewBlockName({ blockType, onAddBlock }: INewBlockNameProps) {
  const { defaultBlockName, blockLabel } = getGroupBlockDefaultNameAndLabel(blockType);
  const [newBlockName, setProjectName] = useState(defaultBlockName);
  const handleNewBlockName = (event: any) => {
    setProjectName(event.target.value);
  };

  const handleAddBlock = (event: any) => {
    setProjectName(defaultBlockName);
    onAddBlock(blockType, newBlockName);
  };

  return (
    <>
      <Grid sx={{ marginTop: "10px" }} container justifyContent="center" alignItems="center">
        <Grid item xs={8}>
          <TextField id="standard-basic" label={blockLabel} value={newBlockName} onChange={handleNewBlockName} variant="standard" />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" startIcon={<IconComponent icon="Add" />} onClick={handleAddBlock}>
            추가
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
