import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import Block from "./setup/blocks/Block";
import { BlockType, IBlock } from "@type/block";
import { previewProvider } from "./preview/provider";
import { previewSelectorProvider } from "@store/selector";
import { Checkbox, Divider, ListItem } from "@mui/material";
import IconComponent from "./common/IconComponent";

interface IStylePanel {
  block: IBlock;
  styleList: string[];
  handleChangeBlockStyleType: Function;
}
// 드래그 요소 생성
const StylePanel = ({ block, styleList: styleTypes, handleChangeBlockStyleType }: IStylePanel) => {
  const currentStyleType = block.styleType;
  const PreviewComponent = previewProvider[block.type];
  const previewProps = previewSelectorProvider[block.type](block);

  return (
    <>
      {styleTypes.map(styleType => (
        <>
          <Checkbox
            checked={styleType === currentStyleType}
            onChange={() => handleChangeBlockStyleType(styleType)}
            icon={<IconComponent icon="FavoriteBorder" />}
            checkedIcon={<IconComponent icon="Favorite" />}
          />
          <PreviewComponent key={block.id} {...previewProps} styleType={styleType} />
          <Divider />
        </>
      ))}
    </>
  );
};

export default StylePanel;
