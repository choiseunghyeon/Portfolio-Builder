import styled from "@emotion/styled";
import { BlockType, IBlock } from "@type/block";
import { IBlockTypeStyle } from "@type/blockStyle";
import { FieldType, FieldValueType, IField } from "@type/field";
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
    case "Portfolio":
      return createPortfolioBlock(title, style);
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
    fields: [createField("Image", "이미지 업로드"), createField("Text", "메인 텍스트"), createField("Text", "서브 텍스트")],
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
    fields: [createField("Text", "프로젝트"), createField("Text", "소속 / 기관"), createField("Date", "기간"), createField("MultiLineText", "배경 / 설명"), createField("MultiLineText", "Skills")],
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
    fields: [createField("Text", "소속"), createField("Text", "역할"), createField("Date", "기간"), createField("MultiLineText", "설명")],
  };
}

function createPortfolioBlock(title: string, style: IBlockTypeStyle): IBlock {
  return {
    id: uuidv4(),
    type: "Portfolio",
    title: title,
    iconName: "AccountCircle",
    style: {
      styleType: "default",
      xs: 12,
    },
    fields: [createField("Image", "이미지 / 동영상"), createField("Text", "제목"), createField("MultiLineText", "내용"), createField("MultiLineText", "링크")],
  };
}

function createField(fieldType: FieldType, title: string, defaultValue?: FieldValueType | undefined): IField {
  const value = defaultValue ? defaultValue : createDefaultFieldValue(fieldType);
  const fieldData = { id: uuidv4(), type: fieldType, title: title, value: value, attributes: {} };

  return fieldData;

  function createDefaultFieldValue(fieldType: FieldType): FieldValueType {
    switch (fieldType) {
      case "Text":
        return { input: "" };
      case "MultiLineText":
        return { multiLineInput: "" };
      case "Image":
        return { imageSrc: "" };
      case "Date":
        return { from: "", to: "" };
      case "Select":
        return { selectList: [], selectedValue: "" };
    }
  }
}
