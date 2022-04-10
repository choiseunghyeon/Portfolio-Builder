import { createAction, createReducer } from "@reduxjs/toolkit";
import { IBlock } from "../types/block";
import { selectBlocks } from "./selector";

const root: TempState = {
  blocks: [
    {
      id: "block_id_1",
      type: "Profile",
      title: "프로필",
      iconName: "AccountCircle",
      fields: [{ id: "field_id_1", type: "Text", title: "메인 텍스트", value: { input: "" } }],
    },
    {
      id: "block_id_2",
      type: "Profile",
      title: "프로필",
      iconName: "AccountCircle",
      fields: [{ id: "field_id_2", type: "SampleDoubleText", title: "보조 텍스트", value: { input: "", input2: "" } }],
    },
  ],
};

interface ItemValuePayload {
  blockId: string;
  fieldId: string;
  valueId: string;
  value: any;
}

interface ISwapBlockPayload {
  sourceIndex: number;
  destinationIndex: number;
}

interface TempState {
  blocks: IBlock[];
}
export const changeItemValue = createAction<ItemValuePayload>("setup/handleItemValue");
export const swapBlock = createAction<ISwapBlockPayload>("setup/swapBlock");
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeItemValue, (state, action) => {
      const { blockId, fieldId, valueId, value } = action.payload;
      const blocks = selectBlocks(state);
      const targetBlock = blocks.find(block => block.id === blockId);
      if (!targetBlock) return;

      const targetField = targetBlock.fields.find(field => field.id === fieldId);
      if (!targetField) return;

      targetField.value[valueId] = value;
    })
    .addCase(swapBlock, (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;

      const blocks = selectBlocks(state);

      //swap two items
      [blocks[sourceIndex], blocks[destinationIndex]] = [blocks[destinationIndex], blocks[sourceIndex]];
    });
});

export default rootReducer;
