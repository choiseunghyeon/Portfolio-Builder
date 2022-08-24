import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import Block from "./setup/blocks/Block"
import { BlockType, IBlock } from "@type/block"
import { Button, Grid, List } from "@mui/material"
import IconComponent from "./common/IconComponent"
import { getGroupBlockDefaultNameAndLabel } from "@store/utils"

interface ISetupPanel {
  blocks: IBlock[]
  blockType: BlockType
  handleField: Function
  swapBlockPosition: Function
  onRemoveBlock: Function
  onAddBlock: Function
}
// 드래그 요소 생성
const SetupGroupPanel = ({ blocks, blockType, handleField, swapBlockPosition, onRemoveBlock, onAddBlock }: ISetupPanel) => {
  const onDragEnd = (result, provided) => {
    if (!result) {
      console.log("result가 null인 경우")
      return
    }

    // 드래그 결과
    // source : 원본
    // destination : 변경
    const { destination, source } = result

    // 동일한 위치에서 놓은 경우
    if (destination.index === source.index) {
      console.log("초기 위치 index 동일한 경우")
      return
    }

    // 빈 공간에 놓은 경우
    if (!destination) {
      return
    }
    const sourceBlockId = blocks[source.index].id
    const destinationBlockId = blocks[destination.index].id
    swapBlockPosition(sourceBlockId, destinationBlockId)
  }

  return (
    <>
      {/* 드래그 영역 */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 드래그 놓을 수 있는 영역 */}
        <Droppable droppableId="DropLand">
          {/* 드래그 Div 생성 */}
          {(provided, snapshot) => (
            // CCS가 적용된 Div
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, blockIndex) => (
                <Draggable key={block.id} draggableId={block.id} index={blockIndex}>
                  {(provided, snapshot) => (
                    <Block
                      blockInfo={block}
                      handleField={handleField}
                      onRemoveBlock={onRemoveBlock}
                      ref={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <NewBlockName blockType={blockType} onAddBlock={onAddBlock} />
    </>
  )
}

export default SetupGroupPanel

export interface INewBlockNameProps {
  blockType: BlockType
  onAddBlock: Function
}

function NewBlockName({ blockType, onAddBlock }: INewBlockNameProps) {
  const { defaultBlockName, blockLabel } = getGroupBlockDefaultNameAndLabel(blockType)
  const [newBlockName, setProjectName] = useState(defaultBlockName)
  const handleNewBlockName = (event: any) => {
    setProjectName(event.target.value)
  }

  const handleAddBlock = (event: any) => {
    setProjectName(defaultBlockName)
    onAddBlock(blockType, newBlockName)
  }

  return (
    <>
      <Grid sx={{ marginTop: "10px" }} container justifyContent="center" alignItems="center">
        {/* <Grid item xs={8}>
          <TextField id="standard-basic" label={blockLabel} value={newBlockName} onChange={handleNewBlockName} variant="standard" />
        </Grid> */}
        <Grid item xs={4}>
          <Button variant="outlined" startIcon={<IconComponent icon="Add" />} onClick={handleAddBlock}>
            추가
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
