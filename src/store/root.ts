import { createAction, createReducer } from "@reduxjs/toolkit";
import { selectBlocks } from "./selector";

const root = {
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

interface ItemValue {
  blockId: string;
  fieldId: string;
  valueId: string;
  value: any;
}
export const handleItemValue = createAction<ItemValue>("setup/handleItemValue");

const rootReducer = createReducer(root, builder => {
  builder.addCase(handleItemValue, (state, action) => {
    const { blockId, fieldId, valueId, value } = action.payload;
    const blocks = selectBlocks(state);
    const targetBlock = blocks.find(block => block.id === blockId);
    if (!targetBlock) return;

    const targetField = targetBlock.fields.find(field => field.id === fieldId);
    if (!targetField) return;

    targetField.value[valueId] = value;
  });
});

export default rootReducer;
