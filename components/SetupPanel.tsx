import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import Block from "./setup/blocks/Block";
import { IBlock } from "@type/block";

interface ISetupPanel {
  blocks: IBlock[];
  handleField: Function;
  swapBlockPosition: Function;
}
// 드래그 요소 생성
const SetupPanel = ({ blocks, handleField, swapBlockPosition }: ISetupPanel) => {
  const onDragEnd = (result, provided) => {
    if (!result) {
      console.log("result가 null인 경우");
      return;
    }

    // 드래그 결과
    // source : 원본
    // destination : 변경
    const { destination, source } = result;

    // 동일한 위치에서 놓은 경우
    if (destination.index === source.index) {
      console.log("초기 위치 index 동일한 경우");
      return;
    }

    // 빈 공간에 놓은 경우
    if (!destination) {
      return;
    }

    swapBlockPosition(source.index, destination.index);
  };

  return (
    <>
      {/* 드래그 영역 */}
      <DragDropContext onDragEnd={onDragEnd}>
        {/* 드래그 놓을 수 있는 영역 */}
        <Droppable droppableId="DropLand">
          {/* 드래그 Div 생성 */}
          {(provided, snapshot) => (
            // CCS가 적용된 Div
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }} {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, blockIndex) => (
                <Draggable key={block.id} draggableId={block.id} index={blockIndex}>
                  {(provided, snapshot) => (
                    <Block blockInfo={block} handleField={handleField} ref={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps} />
                  )}
                </Draggable>
              ))}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default SetupPanel;
