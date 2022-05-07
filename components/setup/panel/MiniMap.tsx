import Tab from "@mui/material/Tab";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult } from "react-beautiful-dnd";
import { colors, Grid } from "@mui/material";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { selectBlockLayout } from "@store/selector";
import { addBlockLayout, LayoutBlock, swapBlockLayout } from "@store/root";

interface IMiniMapProps {
  value: "MiniMap";
}

export default function MiniMap({ value }: IMiniMapProps) {
  const [winReady, setWinReady] = React.useState(false);
  const init = useSelector(selectBlockLayout);
  const dispatch = useDispatch();
  const handleBlockLayout = payload => {
    dispatch(swapBlockLayout(payload));
  };
  const handleAddBlockLayout = () => {
    dispatch(addBlockLayout());
  };
  React.useEffect(() => {
    setWinReady(true);
  }, []);

  if (winReady) {
    return (
      <>
        <QuoteApp initial={init} handleBlockLayout={handleBlockLayout} />;<button onClick={handleAddBlockLayout}>추가</button>
      </>
    );
  }
  return null;
}

const Root = styled.div`
  background-color: white;
  box-sizing: border-box;
  padding: ${8 * 2}px;
  min-height: 100vh;

  /* flexbox */
  display: flex;
  flex-direction: column;
`;

function QuoteApp({ initial, handleBlockLayout }: any) {
  /* eslint-disable react/sort-comp */

  const onDragEnd = (result: DropResult) => {
    // // dropped outside the list
    if (!result.destination) {
      return;
    }

    handleBlockLayout({
      source: result.source,
      destination: result.destination,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Root>
        {/* {Object.keys(MiniBlockMap)
          .sort()
          .map((key: string) => (
            <MiniBlockList internalScroll key={key} listId={key} listType="CARD" MiniBlockMap={MiniBlockMap[key]} />
          ))} */}
        {initial.map((miniBlockList: LayoutBlock[], index: number) => {
          return <MiniBlockList internalScroll key={index} listId={index} listType="CARD" MiniBlockMap={miniBlockList} />;
        })}
      </Root>
    </DragDropContext>
  );
}

const Wrapper = styled.div`
  background-color: ${({ isDraggingOver }: { isDraggingOver: boolean }) => (isDraggingOver ? "rgb(131 169 233)" : "rgba(131 169 233)")};
  display: flex;
  flex-direction: column;
  padding: 8px;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: 8px 0;
`;

const DropZone = styled.div`
  display: flex;

  /*
    Needed to avoid growth in list due to lifting the first item
    Caused by display: inline-flex strangeness
  */
  align-items: start;

  /* stop the list collapsing when empty */
  min-width: 30px;

  /* stop the list collapsing when it has no items */
  min-height: 60px;
`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

// $ExpectError - not sure why
const Container = styled.div`
  /* flex child */
  flex-grow: 1;

  /*
    flex parent
    needed to allow width to grow greater than body
  */
  display: inline-flex;
`;

function MiniBlockList({ MiniBlockMap, listId, listType, internalScroll, isCombineEnabled = false }): any {
  const renderBoard = (dropProvided: DroppableProvided) => {
    return (
      <Container>
        <DropZone ref={dropProvided.innerRef}>
          {MiniBlockMap.map((blockInfo: LayoutBlock, index: number) => {
            const key = blockInfo.id ? blockInfo.id : blockInfo.groupBlockType ? blockInfo.groupBlockType : blockInfo.title;
            return (
              <Draggable key={key} draggableId={key} index={index}>
                {(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => <MiniBlock blockName={blockInfo.title} provided={dragProvided} snapshot={dragSnapshot} />}
              </Draggable>
            );
          })}
          {dropProvided.placeholder}
        </DropZone>
      </Container>
    );
  };

  return (
    <Droppable droppableId={"" + listId} type={listType} direction="horizontal" isCombineEnabled={isCombineEnabled}>
      {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
        <Wrapper isDraggingOver={dropSnapshot.isDraggingOver} {...dropProvided.droppableProps}>
          {internalScroll ? <ScrollContainer>{renderBoard(dropProvided)}</ScrollContainer> : renderBoard(dropProvided)}
        </Wrapper>
      )}
    </Droppable>
  );
}

// $ExpectError - not sure why
const StyledMiniBlock = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex-shrink: 0;
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
`;

function MiniBlock({ blockName, provided, snapshot }: any) {
  return (
    <StyledMiniBlock ref={ref => provided.innerRef(ref)} {...provided.draggableProps} {...provided.dragHandleProps} isDragging={snapshot.isDragging}>
      {blockName}
    </StyledMiniBlock>
  );
}
