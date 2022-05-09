import { BlockType, BlockXSType, IFieldValidation } from "@type/block";
import { ColumnCountType } from "@type/blockStyle";

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

export function validateValue(value: string | number, validation: IFieldValidation): { pass: boolean; errorMessage: string | null } {
  const { dataType, includeSpecialChar, limit } = validation;
  if (typeof value === "number") value = "" + value;

  if (limit && value.length > limit) return { pass: false, errorMessage: `제한 글자${limit}자를 초과합니다.` };

  if (!includeSpecialChar) {
    const specialCharIndex = value.search(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim);
    return { pass: false, errorMessage: `특수 문자 ${value[specialCharIndex]}를 포함하고 있습니다.` };
  }

  if (dataType === "numeric") {
    const notNumericIndex = value.search(/[^0-9]/gi);
    return { pass: false, errorMessage: `숫자가 아닌 ${value[notNumericIndex]}를 포함하고 있습니다.` };
  }

  return { pass: true, errorMessage: null };
}

export function splitMultiLineText(multiLineText: string): string[] {
  return multiLineText.split("\n");
}
