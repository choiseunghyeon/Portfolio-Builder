import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import Block from "./setup/blocks/Block";
import { IBlock } from "@type/block";
import { Button, Grid, TextField } from "@mui/material";
import IconComponent from "./common/IconComponent";

interface ISetupPanel {
  blocks: IBlock[];
  handleField: Function;
}
const SetupPanel = ({ blocks, handleField }: ISetupPanel) => {
  return (
    <>
      <List>
        {blocks.map((block, blockIndex) => (
          <Block key={block.id} blockInfo={block} handleField={handleField} />
        ))}
      </List>
    </>
  );
};

export default SetupPanel;
