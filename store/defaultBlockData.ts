import styled from "@emotion/styled";
import { BlockType, IBlock, IBlockStyle } from "@type/block";
import { IBlockTypeStyle } from "@type/blockStyle";
import { v4 as uuidv4 } from "uuid";
import { convertColumnCountIntoXS } from "./utils";

export function createBlock(blockType: BlockType, title: string, style: IBlockTypeStyle): IBlock | undefined {
  switch (blockType) {
    case "Profile":
      return createProfileBlock(title, style);
    case "Project":
      return createProjectBlock(title, style);
    case "Career":
      return createCareerBlock(title, style);
    default:
      break;
  }
}

function createProfileBlock(title: string, style: IBlockTypeStyle): IBlock {
  return {
    id: uuidv4(),
    type: "Profile",
    title: title,
    iconName: "AccountCircle",
    style: {
      styleType: style.styleType,
      xs: convertColumnCountIntoXS(style.columnCount),
    },
    fields: [
      { id: uuidv4(), type: "Image", title: "이미지 업로드", value: { imageSrc: "" } },
      { id: uuidv4(), type: "Text", title: "메인 텍스트", value: { input: "" } },
      { id: uuidv4(), type: "Text", title: "서브 텍스트", value: { input: "" } },
    ],
  };
}

function createProjectBlock(title: string, style: IBlockTypeStyle): IBlock {
  return {
    id: uuidv4(),
    type: "Project",
    title: title,
    iconName: "AccountCircle",
    style: {
      styleType: style.styleType,
      xs: convertColumnCountIntoXS(style.columnCount),
    },
    fields: [
      { id: uuidv4(), type: "Text", title: "프로젝트", value: { input: "" } },
      { id: uuidv4(), type: "Text", title: "소속 / 기관", value: { input: "" } },
      {
        id: uuidv4(),
        type: "Date",
        title: "기간",
        value: { from: "", to: "" },
      },
      { id: uuidv4(), type: "MultiLineText", title: "배경 / 설명", value: { multiLineInput: "" } },
      { id: uuidv4(), type: "MultiLineText", title: "Skills", value: { multiLineInput: "" } },
    ],
  };
}

function createCareerBlock(title: string, style: IBlockTypeStyle): IBlock {
  return {
    id: uuidv4(),
    type: "Career",
    title: title,
    iconName: "AccountCircle",
    style: {
      styleType: style.styleType,
      xs: 12,
    },
    fields: [
      { id: uuidv4(), type: "Text", title: "소속", value: { input: "" } },
      { id: uuidv4(), type: "Text", title: "역할", value: { input: "" } },
      {
        id: uuidv4(),
        type: "Date",
        title: "기간",
        value: { from: "", to: "" },
      },
      { id: uuidv4(), type: "MultiLineText", title: "설명", value: { multiLineInput: "" } },
    ],
  };
}
