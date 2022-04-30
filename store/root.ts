import { createAction, createReducer } from "@reduxjs/toolkit";
import { BlockType, BlockXSType, IBlock } from "@type/block";
import { selectBlockById, selectBlockIndexById, selectBlocks, selectBlocksByType, selectBlockTypeStyleByBlockType } from "./selector";
import { v4 as uuidv4 } from "uuid";
import { EachBlockTypeStyle, ColumnCountType, IBlockTypeStyle } from "@type/blockStyle";

interface TempState {
  blocks: IBlock[];
  blockTypeStyle: EachBlockTypeStyle;
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
      style: {
        styleType: "default",
        xs: 12,
      },
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
      style: {
        styleType: "default",
        xs: 12,
      },
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
    {
      id: uuidv4(),
      type: "Project",
      title: "프로젝트",
      iconName: "AccountCircle",
      style: {
        styleType: "default",
        xs: 12,
      },
      fields: [
        { id: uuidv4(), type: "Text", title: "프로젝트", value: { input: "대출 추천 재개발" } },
        { id: uuidv4(), type: "Text", title: "소속 / 기관", value: { input: "Banksalad" } },
        {
          id: uuidv4(),
          type: "Date",
          title: "기간",
          value: { from: "2022-04-07", to: "2022-04-30" },
        },
        { id: uuidv4(), type: "MultiLineText", title: "배경 / 설명", value: { multiLineInput: "기존의 노후된 설정, 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다" } },
        { id: uuidv4(), type: "MultiLineText", title: "Skills", value: { multiLineInput: "View와 Data를 분리하고 모든 비즈니스" } },
      ],
    },
    {
      id: uuidv4(),
      type: "Project",
      title: "프로젝트",
      iconName: "AccountCircle",
      style: {
        styleType: "default",
        xs: 12,
      },
      fields: [
        { id: uuidv4(), type: "Text", title: "프로젝트", value: { input: "대출 추천 재개발" } },
        { id: uuidv4(), type: "Text", title: "소속 / 기관", value: { input: "Banksalad" } },
        {
          id: uuidv4(),
          type: "Date",
          title: "기간",
          value: { from: "2022-04-07", to: "2022-04-30" },
        },
        { id: uuidv4(), type: "MultiLineText", title: "배경 / 설명", value: { multiLineInput: "기존의 노후된 설정, 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다" } },
        { id: uuidv4(), type: "MultiLineText", title: "Skills", value: { multiLineInput: "View와 Data를 분리하고 모든 비즈니스" } },
      ],
    },
  ],
  blockTypeStyle: {
    Profile: {
      styleTypes: ["default", "second"],
      columnCount: 1,
      changableColumnCount: [],
    },
    Project: {
      styleTypes: ["default"],
      columnCount: 1,
      changableColumnCount: [1, 2, 3, 4],
    },
    Career: {
      styleTypes: ["default"],
      columnCount: 1,
      changableColumnCount: [1, 2, 3, 4],
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
  sourceBlockId: string;
  destinationBlockId: string;
}

export interface IChangeBlockTypeStylePayload extends Partial<IBlockTypeStyle> {
  blockType: BlockType;
  // 선택된 styleType
  styleType?: string;
}

export const changeItemValue = createAction<ItemValuePayload>("setup/handleItemValue");
export const swapBlock = createAction<ISwapBlockPayload>("setup/swapBlock");
export const foldTab = createAction<boolean>("setup/foldTab");
export const changeBlockTypeStyle = createAction<IChangeBlockTypeStylePayload>("setup/changeBlockStyleType");
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
      const { sourceBlockId, destinationBlockId } = action.payload;
      const sourceIndex = selectBlockIndexById(state, sourceBlockId);
      const destinationIndex = selectBlockIndexById(state, destinationBlockId);
      const blocks = selectBlocks(state);

      //swap two items
      [blocks[sourceIndex], blocks[destinationIndex]] = [blocks[destinationIndex], blocks[sourceIndex]];
    })
    .addCase(foldTab, (state, action) => {
      const needFold = action.payload;
      state.tabFold = needFold;
    })
    .addCase(changeBlockTypeStyle, (state, action) => {
      const { blockType, styleType, columnCount } = action.payload;
      const blocks = selectBlocksByType(state, blockType);

      if (styleType !== undefined) {
        blocks.forEach(block => (block.style.styleType = styleType));
      }

      if (columnCount !== undefined) {
        const targetBlockTypeStyle = selectBlockTypeStyleByBlockType(state, blockType);
        targetBlockTypeStyle.columnCount = columnCount;
        const xs = (12 / columnCount) as BlockXSType;
        blocks.forEach(block => (block.style.xs = xs));
      }
    });
});

export default rootReducer;
