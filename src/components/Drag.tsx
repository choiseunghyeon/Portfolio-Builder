// React 관련 요소
import React, { useCallback, useEffect, useState, PureComponent } from "react";
// 드래그 요소
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Block from "./setup/blocks/Block";
import { Typography } from "@mui/material";
import { IBlock } from "../types/block";
const blockInfo: IBlock = {
  id: "block_id_1",
  type: "Profile",
  title: "프로필",
  iconName: "AccountCircle",
  fields: [{ id: "field_id_1", type: "Text", title: "abc" }],
};
// 드래그 요소 생성
const Drag = () => {
  const [datas, setDatas] = useState([
    { key: "item-1", content: "item-1" },
    { key: "item-2", content: "item-2" },
    { key: "item-3", content: "item-3" },
    { key: "item-4", content: "item-4" },
  ]);

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

    // 데이터 변경
    setDatas(prev => {
      // 원본 데이터
      const sourceData = datas[source.index];
      // datas 복사
      let newDatas = prev;
      // 기존 데이터 제거
      newDatas.splice(source.index, 1);
      // 이동 위치로 데이터 옮기기
      newDatas.splice(destination.index, 0, sourceData);

      return newDatas;
    });
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
              <Draggable key={"1"} draggableId={"1"} index={1}>
                {(provided, snapshot) => <Block blockInfo={blockInfo} ref={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps} />}
              </Draggable>
              <Draggable key={"2"} draggableId={"2"} index={2}>
                {(provided, snapshot) => <Block blockInfo={blockInfo} ref={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps} />}
              </Draggable>
              {/* <Draggable key={"2"} draggableId={"2"} index={2}>
                {(provided, snapshot) => (
                  <Block title="프로필" ref={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps}>
                    <Typography>2</Typography>
                  </Block>
                )}
              </Draggable>
              <Draggable key={"3"} draggableId={"3"} index={3}>
                {(provided, snapshot) => (
                  <Block title="프로필" ref={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps}>
                    <Typography>3</Typography>
                  </Block>
                )}
              </Draggable> */}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Drag;

// <div {...provided.droppableProps} ref={provided.innerRef}>
//   <p>Drag Div!</p>
//   {datas.map((data, index) => (
{
  /* <Draggable key={data.key} draggableId={data.key} index={index}>
  {(provided, snapshot) => (
    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      {data.content}
    </div>
  )}
</Draggable>; */
}
//   ))}
//   {provided.placeholder}
// </div>
