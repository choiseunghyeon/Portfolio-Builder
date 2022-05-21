import { createAction, createReducer } from "@reduxjs/toolkit";
import { BlockType, BlockXSType, IBlock } from "@type/block";
import { selectBlockById, selectBlockIndexById, selectBlockLayout, selectBlocks, selectBlocksByType, selectBlockTypeStyleByBlockType } from "./selector";
import { v4 as uuidv4 } from "uuid";
import { EachBlockTypeStyle, ColumnCountType, IBlockTypeStyle } from "@type/blockStyle";
import { convertColumnCountIntoXS } from "./utils";
import { createBlock, createField } from "./defaultBlockData";
import { ISelectFiedlValue } from "@type/field";

export interface LayoutBlock {
  id?: string;
  groupBlockType?: BlockType;
  title: string;
}
interface TempState {
  blocks: IBlock[];
  blockTypeStyle: EachBlockTypeStyle;
  tabFold: boolean;
  blockLayout: LayoutBlock[][];
}
const root: TempState = {
  blockLayout: [
    [{ title: "프로필", id: "aasdfs" }],
    [{ title: "커리어", groupBlockType: "Career" }],
    [{ title: "프로젝트", groupBlockType: "Project" }],
    [{ title: "포트폴리오", groupBlockType: "Portfolio" }],
  ],
  tabFold: false,
  blocks: [
    {
      id: "aasdfs",
      type: "Profile",
      title: "프로필",
      iconName: "AccountCircle",
      style: {
        styleType: "default",
        xs: 12,
      },
      fields: [
        { id: uuidv4(), type: "Image", title: "이미지 업로드", value: { imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg" }, attributes: {} },
        { id: uuidv4(), type: "Text", title: "메인 텍스트", value: { input: "Front End Developer" }, attributes: {} },
        { id: uuidv4(), type: "Text", title: "서브 텍스트", value: { input: "프론트 엔드 개발자 입니다." }, attributes: {} },
        {
          id: uuidv4(),
          type: "Select",
          title: "(선택) 추가 정보",
          value: {
            selectList: [
              { label: "None", value: "" },
              { label: "Apply", value: "apply" },
              { label: "Contact", value: "contact" },
              { label: "Github", value: "github" },
              { label: "Keyword", value: "keyword" },
            ],
            selectedValue: "",
          },
          attributes: {},
        },
        { id: uuidv4(), type: "Text", title: "지원회사", value: { input: "" }, attributes: { relatedSelectValue: "apply", display: false } },
        { id: uuidv4(), type: "Text", title: "지원직무 / 지원파트", value: { input: "" }, attributes: { relatedSelectValue: "apply", display: false } },
        { id: uuidv4(), type: "Text", title: "휴대폰 번호", value: { input: "" }, attributes: { relatedSelectValue: "contact", display: false } },
        { id: uuidv4(), type: "Text", title: "이메일", value: { input: "" }, attributes: { relatedSelectValue: "contact", display: false } },
        { id: uuidv4(), type: "Text", title: "GitHub 주소", value: { input: "" }, attributes: { relatedSelectValue: "github", display: false } },
        { id: uuidv4(), type: "Text", title: "키워드 1", value: { input: "" }, attributes: { relatedSelectValue: "keyword", display: false } },
        { id: uuidv4(), type: "Text", title: "키워드 2", value: { input: "" }, attributes: { relatedSelectValue: "keyword", display: false } },
        { id: uuidv4(), type: "Text", title: "키워드 3", value: { input: "" }, attributes: { relatedSelectValue: "keyword", display: false } },
        { id: uuidv4(), type: "Text", title: "키워드 4", value: { input: "" }, attributes: { relatedSelectValue: "keyword", display: false } },
        { id: uuidv4(), type: "Text", title: "키워드 5", value: { input: "" }, attributes: { relatedSelectValue: "keyword", display: false } },
      ],
    },
    {
      id: uuidv4(),
      type: "Project",
      title: "스마트 미러 프로젝트",
      iconName: "AccountCircle",
      style: {
        styleType: "default",
        xs: 12,
      },
      fields: [
        { id: uuidv4(), type: "Text", title: "프로젝트", attributes: { validation: { includeSpecialChar: true, limit: 10 } }, value: { input: "대출 추천 재개발" } },
        { id: uuidv4(), type: "Text", title: "소속 / 기관", value: { input: "Banksalad" }, attributes: {} },
        {
          id: uuidv4(),
          type: "Date",
          title: "기간",
          value: { from: "2022-04-07", to: "2022-04-30" },
          attributes: {},
        },
        {
          id: uuidv4(),
          type: "MultiLineText",
          title: "배경 / 설명",
          value: { multiLineInput: "기존의 노후된 설정, 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다" },
          attributes: {},
        },
        { id: uuidv4(), type: "MultiLineText", title: "Skills", value: { multiLineInput: "View와 Data를 분리하고 모든 비즈니스" }, attributes: {} },
      ],
    },
    {
      id: uuidv4(),
      type: "Project",
      title: "VSC 확장 프로그램",
      iconName: "AccountCircle",
      style: {
        styleType: "default",
        xs: 12,
      },
      fields: [
        { id: uuidv4(), type: "Text", title: "프로젝트", value: { input: "대출 추천 재개발" }, attributes: {} },
        { id: uuidv4(), type: "Text", title: "소속 / 기관", value: { input: "Banksalad" }, attributes: {} },
        {
          id: uuidv4(),
          type: "Date",
          title: "기간",
          value: { from: "2022-04-07", to: "2022-04-30" },
          attributes: {},
        },
        {
          id: uuidv4(),
          type: "MultiLineText",
          title: "배경 / 설명",
          value: { multiLineInput: "기존의 노후된 설정, 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다" },
          attributes: {},
        },
        { id: uuidv4(), type: "MultiLineText", title: "Skills", value: { multiLineInput: "View와 Data를 분리하고 모든 비즈니스" }, attributes: {} },
      ],
    },
    {
      id: uuidv4(),
      type: "Career",
      title: "이카운트",
      iconName: "AccountCircle",
      style: {
        styleType: "default",
        xs: 12,
      },
      fields: [
        { id: uuidv4(), type: "Text", title: "소속", value: { input: "이카운트" }, attributes: {} },
        { id: uuidv4(), type: "Text", title: "역할", value: { input: "Front End Framework 개발 및 유지 보수" }, attributes: {} },
        {
          id: uuidv4(),
          type: "Date",
          title: "기간",
          value: { from: "2022-04-07", to: "2022-04-30" },
          attributes: {},
        },
        { id: uuidv4(), type: "MultiLineText", title: "설명", value: { multiLineInput: "기존의 노후된 설정, 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다" }, attributes: {} },
      ],
    },
    {
      id: uuidv4(),
      type: "Portfolio",
      title: "포트폴리오1",
      iconName: "AccountCircle",
      style: {
        styleType: "default",
        xs: 12,
      },
      fields: [
        { id: uuidv4(), type: "Image", title: "이미지 / 동영상", value: { imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg" }, attributes: {} },
        { id: uuidv4(), type: "Text", title: "제목", value: { input: "Front End Framework 개발 및 유지 보수" }, attributes: {} },
        { id: uuidv4(), type: "MultiLineText", title: "내용", value: { multiLineInput: "기존의 노후된 설정, 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다" }, attributes: {} },
        { id: uuidv4(), type: "MultiLineText", title: "링크", value: { multiLineInput: "기존의 노후된 설정, 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다" }, attributes: {} },
      ],
    },
  ],
  blockTypeStyle: {
    Profile: {
      styleType: "default",
      changableStyleTypes: ["default", "second"],
      columnCount: 1,
      changableColumnCount: [],
    },
    Project: {
      styleType: "default",
      changableStyleTypes: ["default"],
      columnCount: 1,
      changableColumnCount: [1, 2, 3, 4],
    },
    Career: {
      styleType: "default",
      changableStyleTypes: ["default"],
      columnCount: 1,
      changableColumnCount: [1, 2, 3, 4],
    },
    Portfolio: {
      styleType: "default",
      changableStyleTypes: ["default"],
      columnCount: 1,
      changableColumnCount: [1, 2, 3, 4],
    },
  },
};

interface ItemValuePayload {
  blockId: string;
  fieldId: string;
  valueId: string;
  value: { [key: string]: any };
}

interface ISwapBlockPayload {
  sourceBlockId: string;
  destinationBlockId: string;
}

export interface IChangeBlockTypeStylePayload extends Partial<IBlockTypeStyle> {
  blockType: BlockType;
}

export interface IAddBlockPayload {
  blockType: BlockType;
  title: string;
}

interface IChangedSelectedValuePayload {
  blockId: string;
  fieldId: string;
  value: string;
}
export const changeItemValue = createAction<ItemValuePayload>("setup/handleItemValue");
export const swapBlock = createAction<ISwapBlockPayload>("setup/swapBlock");
export const foldTab = createAction<boolean>("setup/foldTab");
export const changeBlockTypeStyle = createAction<IChangeBlockTypeStylePayload>("setup/changeBlockStyleType");
export const addBlock = createAction<IAddBlockPayload>("setup/addBlock");
export const removeBlock = createAction<string>("setup/removeBlock");
export const changeSelectedValue = createAction<IChangedSelectedValuePayload>("setup/changedSelectedValue");
// layout
export const swapBlockLayout = createAction<any>("setup/swapBlockLayout");
export const addBlockLayout = createAction<void>("setup/addBlockLayout");
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeItemValue, (state, action) => {
      console.log("called changeItemValue");
      const { blockId, fieldId, valueId, value } = action.payload;
      const targetBlock = selectBlockById(state, blockId);
      if (!targetBlock) return;

      const targetField = targetBlock.fields.find(field => field.id === fieldId);
      if (!targetField) return;

      switch (targetField.type) {
        case "Select":
          changeSelectItemValue(targetBlock, targetField, value);
          break;

        default:
          targetField.value[valueId] = value;
          break;
      }

      function changeSelectItemValue(targetBlock, targetField, value) {
        const selectedValue = (targetField.value as ISelectFiedlValue).selectedValue;
        // 기존 selectedValue로 보여주던 field 숨김
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === selectedValue)
          .forEach(field => {
            field.attributes.display = false;
          });

        // select와 연결된 field 보여주기
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === value)
          .forEach(field => {
            field.attributes.display = true;
          });
        (targetField.value as ISelectFiedlValue).selectedValue = value;
      }
    })
    .addCase(swapBlock, (state, action) => {
      const { sourceBlockId, destinationBlockId } = action.payload;
      const sourceIndex = selectBlockIndexById(state, sourceBlockId);
      const destinationIndex = selectBlockIndexById(state, destinationBlockId);
      const blocks = selectBlocks(state);

      //swap two items
      [blocks[sourceIndex], blocks[destinationIndex]] = [blocks[destinationIndex], blocks[sourceIndex]];
    })
    .addCase(swapBlockLayout, (state, action) => {
      const { source, destination } = action.payload;
      const blockLayout = selectBlockLayout(state);
      const current: any[] = blockLayout[source.droppableId];
      const next: any[] = blockLayout[destination.droppableId];
      const target: any = current[source.index];

      // moving to same list
      if (source.droppableId === destination.droppableId) {
        const reordered: any[] = reorder(current, source.index, destination.index);
        blockLayout[source.droppableId] = reordered;
      }
      // moving to different list

      // remove from original
      current.splice(source.index, 1);
      // insert into next
      next.splice(destination.index, 0, target);

      blockLayout[source.droppableId] = current;
      blockLayout[destination.droppableId] = next;
    })
    .addCase(addBlockLayout, (state, action) => {
      const blockLayout = selectBlockLayout(state);
      blockLayout.push([]);
    })
    .addCase(foldTab, (state, action) => {
      const needFold = action.payload;
      state.tabFold = needFold;
    })
    .addCase(changeBlockTypeStyle, (state, action) => {
      const { blockType, styleType, columnCount } = action.payload;
      const blocks = selectBlocksByType(state, blockType);
      const targetBlockTypeStyle = selectBlockTypeStyleByBlockType(state, blockType);

      if (styleType !== undefined) {
        targetBlockTypeStyle.styleType = styleType;
        blocks.forEach(block => (block.style.styleType = styleType));
      }

      if (columnCount !== undefined) {
        targetBlockTypeStyle.columnCount = columnCount;
        const xs = convertColumnCountIntoXS(columnCount);
        blocks.forEach(block => (block.style.xs = xs));
      }
    })
    .addCase(addBlock, (state, action) => {
      const { blockType, title } = action.payload;
      const blockTypeStyle = selectBlockTypeStyleByBlockType(state, blockType);
      const blocks = selectBlocks(state);
      let lastBlockIndexInBlockType;
      for (let lastIndex = blocks.length - 1; lastIndex >= 0; lastIndex--) {
        if (blocks[lastIndex].type === blockType) {
          lastBlockIndexInBlockType = lastIndex;
          break;
        }
      }
      if (!lastBlockIndexInBlockType) return;
      const blockData = createBlock(blockType, title, blockTypeStyle);

      if (!blockData) return;
      blocks.splice(lastBlockIndexInBlockType + 1, 0, blockData);
    })
    .addCase(removeBlock, (state, action) => {
      const blockId = action.payload;
      const blocks = selectBlocks(state);
      const targetBlockIndex = selectBlockIndexById(state, blockId);
      blocks.splice(targetBlockIndex, 1);
    })
    .addCase(changeSelectedValue, (state, action) => {
      const { blockId, fieldId, value } = action.payload;
      const targetBlock = selectBlockById(state, blockId);

      if (!targetBlock) return;

      const targetField = targetBlock.fields.find(field => field.id === fieldId);

      if (!targetField) return;

      if (targetField.type === "Select") {
        const selectedValue = (targetField.value as ISelectFiedlValue).selectedValue;
        // 기존 selectedValue로 보여주던 field 숨김
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === selectedValue)
          .forEach(field => {
            field.attributes.display = false;
          });

        // select와 연결된 field 보여주기
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === value)
          .forEach(field => {
            field.attributes.display = true;
          });
        (targetField.value as ISelectFiedlValue).selectedValue = value;
      }
    });
});

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default rootReducer;
