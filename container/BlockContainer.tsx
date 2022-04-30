import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SetupPanel from "@components/SetupPanel";
import type { GetStaticProps, NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlock, changeBlockTypeStyle, changeItemValue, IAddBlockPayload, IChangeBlockTypeStylePayload, removeBlock, swapBlock } from "@store/root";
import { BlockType } from "@type/block";
import { selectBlocksByType, selectBlockTypeStyleByBlockType } from "@store/selector";
import TabPanel from "@components/setup/panel/TabPanel";
import StylePanel from "@components/StylePanel";
import IconComponent from "@components/common/IconComponent";

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
          {winReady && <SetupPanel blocks={blocks} handleField={handleField} swapBlockPosition={swapBlockPosition} onRemoveBlock={onRemoveBlock} />}
          {blockType === "Project" && <ProjectAdd blockType={blockType} onAddBlock={onAddBlock} />}
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

interface IProjectAddProps {
  blockType: "Project";
  onAddBlock: Function;
}

const defaultProejctName = "프로젝트";
function ProjectAdd({ blockType, onAddBlock }: IProjectAddProps) {
  const [projectName, setProjectName] = useState(defaultProejctName);
  const handleProjectName = (event: any) => {
    setProjectName(event.target.value);
  };

  const handleAddBlock = (event: any) => {
    setProjectName(defaultProejctName);
    onAddBlock(blockType, projectName);
  };

  return (
    <>
      <Grid sx={{ marginTop: "10px" }} container justifyContent="center" alignItems="center">
        <Grid item xs={8}>
          <TextField id="standard-basic" label="프로젝트 이름" value={projectName} onChange={handleProjectName} variant="standard" />
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
