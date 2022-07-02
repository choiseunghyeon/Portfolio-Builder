import Tab from "@mui/material/Tab"
import { useState, useEffect } from "react"
import Tabs from "@mui/material/Tabs"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TabPanel from "./TabPanel"
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd"
import { Button, colors, Grid } from "@mui/material"
import styled from "@emotion/styled"
import { useDispatch, useSelector } from "react-redux"
import { selectBlockLayout } from "@store/selector"
import { addBlockLayout, LayoutBlock, swapBlockLayout } from "@store/root"
import IconComponent from "@components/common/IconComponent"
import { MINI_BLOCK, MINI_MAP_PANEL } from "@constants/testConstants"

interface IMiniMapProps {
  value: "MiniMap"
}

export default function MiniMap({ value }: IMiniMapProps) {
  const [winReady, setWinReady] = useState(false)
  const init = useSelector(state => selectBlockLayout(state, "edit"))
  const dispatch = useDispatch()
  const handleBlockLayout = payload => {
    dispatch(swapBlockLayout(payload))
  }
  const handleAddBlockLayout = () => {
    dispatch(addBlockLayout())
  }
  useEffect(() => {
    setWinReady(true)
  }, [])

  const onDragEnd = (result: DropResult) => {
    // // dropped outside the list
    if (!result.destination) {
      return
    }

    handleBlockLayout({
      source: result.source,
      destination: result.destination,
    })
  }

  if (winReady) {
    return (
      <>
        <Grid container justifyContent={"center"} alignItems={"center"} data-testid={MINI_MAP_PANEL}>
          <DragDropContext onDragEnd={onDragEnd}>
            {init.map((miniBlockList: LayoutBlock[], index: number) => {
              return (
                <Grid item xs={12} key={index}>
                  <MiniBlockList listId={index} listType="CARD" MiniBlockMap={miniBlockList} />
                </Grid>
              )
            })}
            <Button variant="outlined" startIcon={<IconComponent icon="Add" />} onClick={handleAddBlockLayout}>
              추가
            </Button>
          </DragDropContext>
        </Grid>
      </>
    )
  }
  return null
}

const Wrapper = styled.div`
  background-color: #a5c4dd;
  /* display: flex;
  flex-direction: column;
  user-select: none;
  transition: background-color 0.1s ease;
  */
  margin-bottom: 8px;
  display: flex;

  /*
  Needed to avoid growth in list due to lifting the first item
  Caused by display: inline-flex strangeness
*/
  align-items: center;
  justify-content: center;

  /* stop the list collapsing when empty */
  min-width: 60px;

  /* stop the list collapsing when it has no items */
  min-height: 60px;
`

function MiniBlockList({ MiniBlockMap, listId, listType, isCombineEnabled = false }): any {
  return (
    <Droppable droppableId={"" + listId} type={listType} direction="horizontal" isCombineEnabled={isCombineEnabled}>
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
        <Wrapper ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
          {MiniBlockMap.map((blockInfo: LayoutBlock, index: number) => {
            const key = blockInfo.blockType ? blockInfo.blockType : blockInfo.title
            return (
              <Draggable key={key} draggableId={key} index={index}>
                {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => <MiniBlock blockName={blockInfo.title} provided={dragProvided} snapshot={dragSnapshot} />}
              </Draggable>
            )
          })}
          {dropProvided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  )
}

// $ExpectError - not sure why
const StyledMiniBlock = styled.div`
  /* width: 80px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
  */
  margin-right: ${8}px;
  /* border-color: ${({ isDragging }: { isDragging: boolean }) => (isDragging ? "red" : "white")}; */
  /* border-style: solid;
  border-width: ${8}px; */
  /* box-shadow: ${({ isDragging }: { isDragging: boolean }) => (isDragging ? `2px 2px 1px black` : "none")}; */

  &:focus {
    /* disable standard focus color */
    outline: none;

    /* use our own awesome one */
    /* border-color: ${({ isDragging }: { isDragging: boolean }) => (isDragging ? "black" : "white")}; */
  }
`

function MiniBlock({ blockName, provided, snapshot }: any) {
  return (
    <StyledMiniBlock data-testid={MINI_BLOCK} ref={ref => provided.innerRef(ref)} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
      {blockName}
    </StyledMiniBlock>
  )
}
