import React, { useState } from "react"
import List from "@mui/material/List"
import Block from "./setup/blocks/Block"
import { IBlock } from "@type/block"

interface ISetupPanel {
  blocks: IBlock[]
  handleField: Function
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
  )
}

export default SetupPanel
