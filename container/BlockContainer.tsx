import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import SetupGroupPanel from "@components/SetupGroupPanel"
import type { GetStaticProps, NextPage } from "next"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBlock, changeBlockTypeStyle, changeItemValue, IAddBlockPayload, IChangeBlockTypeStylePayload, removeBlock, swapBlock } from "@store/root"
import { BlockType } from "@type/block"
import { selectBlocksByType, selectBlockTypeStyleByBlockType } from "@store/selector"
import TabPanel from "@components/setup/panel/TabPanel"
import LayoutPanel from "@components/LayoutPanel"
import IconComponent from "@components/common/IconComponent"
import { getGroupBlockDefaultNameAndLabel, isGroupBlock } from "@store/utils"
import SetupPanel from "@components/SetupPanel"
import { DefaultBlockTypeStyle } from "@store/defaultData/defaultBlockStyle"
import { SETUP_BLOCK_CONTENT, SETUP_BLOCK_LAYOUT } from "@constants/testConstants"

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

type TabValueType = "block" | "layout"
interface ISetupBlockContainer {
  blockType: BlockType
  dataTestId: string
}

const BlockContainer = ({ blockType, dataTestId }: ISetupBlockContainer) => {
  const blocks = useSelector(state => selectBlocksByType(state, "edit", blockType))
  const { layoutType, columnCount } = useSelector(state => selectBlockTypeStyleByBlockType(state, "edit", blockType))
  const changableLayoutTypes = DefaultBlockTypeStyle[blockType].changableLayoutTypes
  const changableColumnCount = DefaultBlockTypeStyle[blockType].changableColumnCount
  const [currentTabValue, setCurrentTabValue] = useState<TabValueType>("block")
  const handleChange = (event: React.SyntheticEvent, newValue: TabValueType) => {
    setCurrentTabValue(newValue)
  }

  const dispatch = useDispatch()
  const handleBlockStyleType = (styleOption: Partial<IChangeBlockTypeStylePayload>) => {
    const payload = {
      blockType,
      ...styleOption,
    }
    dispatch(changeBlockTypeStyle(payload))
  }

  const handleField = useCallback(
    (blockId, fieldId, valueId, value: any): void => {
      const payload = {
        blockId,
        fieldId,
        valueId,
        value,
      }
      dispatch(changeItemValue(payload))
    },
    [dispatch]
  )

  const onAddBlock = (blockType: BlockType, title: string) => {
    const payload: IAddBlockPayload = {
      blockType,
      title,
    }
    dispatch(addBlock(payload))
  }

  const onRemoveBlock = (blockId: string) => {
    dispatch(removeBlock(blockId))
  }

  const swapBlockPosition = useCallback(
    (sourceBlockId: string, destinationBlockId: string) => {
      const payload = {
        sourceBlockId,
        destinationBlockId,
      }
      dispatch(swapBlock(payload))
    },
    [dispatch]
  )
  const [winReady, setWinReady] = useState(false)

  useEffect(() => {
    setWinReady(true)
  }, [])

  return (
    <Box data-testid={dataTestId}>
      <Tabs value={currentTabValue} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="??????" value="block" {...a11yProps(0)} data-testid={SETUP_BLOCK_CONTENT} />
        <Tab label="????????????" value="layout" {...a11yProps(1)} data-testid={SETUP_BLOCK_LAYOUT} />
      </Tabs>
      <Box sx={{ flexGrow: 1 }}>
        <TabPanel currentTabValue={currentTabValue} tabValue="block">
          {isGroupBlock(blockType) ? (
            winReady && <SetupGroupPanel blocks={blocks} blockType={blockType} handleField={handleField} onAddBlock={onAddBlock} swapBlockPosition={swapBlockPosition} onRemoveBlock={onRemoveBlock} />
          ) : (
            <SetupPanel blocks={blocks} handleField={handleField} />
          )}
        </TabPanel>
        <TabPanel currentTabValue={currentTabValue} tabValue="layout">
          <LayoutPanel
            block={blocks[0]}
            layoutType={layoutType}
            handleBlockStyleType={handleBlockStyleType}
            changableLayoutTypes={changableLayoutTypes}
            changableColumnCount={changableColumnCount}
            columnCount={columnCount}
          />
        </TabPanel>
      </Box>
    </Box>
  )
}

export default React.memo(BlockContainer)
