import { BlockType, BlockXSType } from "@type/block";
import { ColumnCountType } from "@type/blockStyle";
import { IFieldValidation } from "@type/field";

export function convertColumnCountIntoXS(columnCount: ColumnCountType): BlockXSType {
  return (12 / columnCount) as BlockXSType;
}

export function isGroupBlock(blockType: BlockType): boolean {
  if (blockType === "Project" || blockType === "Career" || blockType === "Portfolio") return true;
  else return false;
}

export function getGroupBlockDefaultNameAndLabel(blockType: BlockType) {
  switch (blockType) {
    case "Project":
      return { defaultBlockName: "프로젝트", blockLabel: "프로젝트 이름" };
    case "Career":
      return { defaultBlockName: "커리어", blockLabel: "커리어 이름" };
    case "Portfolio":
      return { defaultBlockName: "포트폴리오", blockLabel: "포트폴리오 이름" };
    default:
      return { defaultBlockName: "새 이름", blockLabel: "새 이름" };
  }
}

export function validateValue(value: string | number, validation: IFieldValidation): { pass: boolean; canValueChange?: boolean; errorMessage: string | null } {
  const { dataType, includeSpecialChar, limit } = validation;
  if (typeof value === "number") value = "" + value;

  if (limit && value.length > limit) return { pass: false, canValueChange: false, errorMessage: `제한 글자${limit}자를 초과합니다.` };

  // if (!includeSpecialChar) {
  //   const specialCharIndex = value.search(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim);
  //   return { pass: false, errorMessage: `특수 문자 ${value[specialCharIndex]}를 포함하고 있습니다.` };
  // }

  if (dataType === "numeric") {
    const notNumericIndex = value.search(/[^0-9]/gi);
    return { pass: false, canValueChange: true, errorMessage: `숫자가 아닌 ${value[notNumericIndex]}를 포함하고 있습니다.` };
  } else if (dataType === "email") {
    if (value.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) === null) {
      return { pass: false, canValueChange: true, errorMessage: `${value}는 올바른 이메일 주소가 아닙니다.` };
    }
  } else if (dataType === "phoneNumber") {
    if (value.match(/^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/) === null) {
      return { pass: false, canValueChange: true, errorMessage: `${value}는 올바른 전화번호가 아닙니다.` };
    }
  }

  return { pass: true, errorMessage: null };
}

export function getValidationLimitMessage(validation: IFieldValidation | undefined, str: string | undefined) {
  if (!validation || !str) return "";

  const { limit } = validation;
  return `(${str.length}/${limit})`;
}

export function splitMultiLineText(multiLineText: string): string[] {
  return multiLineText.split("\n");
}
