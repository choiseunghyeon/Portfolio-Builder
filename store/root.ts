import { createAction, createReducer } from "@reduxjs/toolkit";
import { IBlock } from "@type/block";
import { selectBlockById, selectBlocks } from "./selector";
import { v4 as uuidv4 } from "uuid";

interface TempState {
  blocks: IBlock[];
  blockStyle: {
    Profile: {
      id: string;
    };
    Career: {
      id: string;
    };
    Project: {
      id: string;
    };
  };
  tabFold: boolean;
}
const root: TempState = {
  tabFold: false,
  blocks: [
    {
      id: uuidv4(),
      type: "Profile",
      title: "프로필",
      iconName: "AccountCircle",
      fields: [
        { id: uuidv4(), type: "Image", title: "이미지 업로드", value: { imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg" } },
        { id: uuidv4(), type: "Text", title: "메인 텍스트", value: { input: "Front End Developer" } },
        { id: uuidv4(), type: "Text", title: "서브 텍스트", value: { input: "프론트 엔드 개발자 입니다." } },
      ],
    },
    {
      id: uuidv4(),
      type: "Profile",
      title: "프로필",
      iconName: "AccountCircle",
      fields: [
        {
          id: uuidv4(),
          type: "Image",
          title: "이미지 업로드",
          value: { imageSrc: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" },
        },
        { id: uuidv4(), type: "Text", title: "메인 텍스트", value: { input: "미니언 내꺼" } },
        { id: uuidv4(), type: "Text", title: "서브 텍스트", value: { input: "미니언 좋아합니다." } },
      ],
    },
  ],
  blockStyle: {
    Profile: {
      id: "default",
    },
    Project: {
      id: "default",
    },
    Career: {
      id: "default",
    },
  },
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

export const changeItemValue = createAction<ItemValuePayload>("setup/handleItemValue");
export const swapBlock = createAction<ISwapBlockPayload>("setup/swapBlock");
export const foldTab = createAction<boolean>("setup/foldTab");
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeItemValue, (state, action) => {
      const { blockId, fieldId, valueId, value } = action.payload;
      const targetBlock = selectBlockById(state, blockId);
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
    })
    .addCase(foldTab, (state, action) => {
      const needFold = action.payload;
      state.tabFold = needFold;
    });
});

export default rootReducer;
