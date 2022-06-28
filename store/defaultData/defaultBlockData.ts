import { BlockType, IBlock } from "@type/block";
import { IBlockTypeStyle } from "@type/blockStyle";
import { FieldType, FieldValueType, IField, IFieldAttributes, ITextFieldValue } from "@type/field";
import { v4 as uuidv4 } from "uuid";
import { convertColumnCountIntoXS } from "../utils";

type ProfileReferenceType =
  | "profileImage"
  | "profileMainText"
  | "profileSubText"
  | "profileAdditionalnfo"
  | "profileApplyCompany"
  | "profileApplyPosition"
  | "profilePhoneNumber"
  | "profileEmail"
  | "profileGitHubURL"
  | "profileKeyword1"
  | "profileKeyword2"
  | "profileKeyword3"
  | "profileKeyword4"
  | "profileKeyword5";
type ProjectRefereceType = "projectName" | "projectOrganigation" | "projectDescription" | "projectTerm" | "projectSkills" | "projectSkillSet";
type CareerRefereceType = "careerMainText" | "careerSubText" | "careerTerm" | "careerDescription";
type PortfolioRefereceType = "portfolioThumbnail" | "portfolioURL" | "portfolioName" | "portfolioDescription";
type FieldRefereceType = ProfileReferenceType | ProjectRefereceType | CareerRefereceType | PortfolioRefereceType;
interface ICreateBlock {
  blockType: BlockType;
  title?: string;
  style?: IBlockTypeStyle;
  fieldValues?: { [key in FieldRefereceType]?: any };
}
export function createBlock({ blockType, title, style, fieldValues }: ICreateBlock): IBlock {
  if (!fieldValues) fieldValues = {};
  switch (blockType) {
    case "Profile":
      return createProfileBlock({ title, style, fieldValues });
    case "Project":
      return createProjectBlock({ title, style, fieldValues });
    case "Career":
      return createCareerBlock({ title, style, fieldValues });
    case "Portfolio":
      return createPortfolioBlock({ title, style, fieldValues });
  }
}

interface ICreateProfileBlock {
  title?: string;
  style?: IBlockTypeStyle;
  fieldValues: { [key in ProfileReferenceType]?: any };
}
function createProfileBlock({ title, style, fieldValues }: ICreateProfileBlock): IBlock {
  if (!title) title = "프로필";
  if (!style)
    style = {
      layoutType: "default",
      columnCount: 1,
    };
  return {
    id: "profile_id",
    type: "Profile",
    title: title,
    iconName: "PersonOutline",
    style: {
      layoutType: style.layoutType,
      xs: convertColumnCountIntoXS(style.columnCount),
    },
    fields: [
      createField({ fieldType: "Image", title: "이미지 업로드", defaultValue: fieldValues.profileImage || "" }),
      createField({ fieldType: "Text", title: "메인 텍스트", defaultValue: fieldValues.profileMainText, attributes: { placeholder: { text: "이름, 닉네임" }, validation: { limit: 25 } } }),
      createField({
        fieldType: "Text",
        title: "서브 텍스트",
        defaultValue: fieldValues.profileSubText,
        attributes: { placeholder: { text: "직무, 전공, 나를 소개하는 한 마디" }, validation: { limit: 50 } },
      }),
      createField({
        fieldType: "Select",
        title: "(선택) 추가 정보",
        defaultValue: {
          selectList: [
            { label: "None", value: "" },
            { label: "Apply", value: "apply" },
            { label: "Contact", value: "contact" },
            { label: "Github", value: "github" },
            { label: "Keyword", value: "keyword" },
          ],
          selectedValue: fieldValues.profileAdditionalnfo?.selectedValue || "",
        },
        attributes: { placeholder: { text: "직무, 전공, 나를 소개하는 한 마디" } },
      }),
      createField({
        fieldType: "Text",
        title: "지원회사",
        defaultValue: fieldValues.profileApplyCompany,
        attributes: { relatedSelectValue: "apply", display: false, placeholder: { text: "예) 당근마켓" }, validation: { limit: 25 } },
      }),
      createField({
        fieldType: "Text",
        title: "지원직무 / 지원파트",
        defaultValue: fieldValues.profileApplyPosition,
        attributes: { relatedSelectValue: "apply", display: false, placeholder: { text: "예) 프론트엔드 개발자 / 당근페이" }, validation: { limit: 25 } },
      }),
      createField({
        fieldType: "Text",
        title: "휴대폰 번호",
        defaultValue: fieldValues.profilePhoneNumber,
        attributes: { relatedSelectValue: "contact", display: false, placeholder: { text: "예) 010-1234-5678" }, validation: { limit: 25, dataType: "phoneNumber" } },
      }),
      createField({
        fieldType: "Text",
        title: "이메일",
        defaultValue: fieldValues.profileEmail,
        attributes: { relatedSelectValue: "contact", display: false, placeholder: { text: "예) ppb@naver.com" }, validation: { limit: 25, dataType: "email" } },
      }),
      createField({
        fieldType: "Text",
        title: "GitHub 주소",
        defaultValue: fieldValues.profileGitHubURL,
        attributes: { relatedSelectValue: "github", display: false, placeholder: { text: "Github 주소 입력" } },
      }),
      createField({
        fieldType: "Text",
        title: "키워드 1",
        defaultValue: fieldValues.profileKeyword1,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "키워드 1 입력" } },
      }),
      createField({
        fieldType: "Text",
        title: "키워드 2",
        defaultValue: fieldValues.profileKeyword2,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "키워드 2 입력" } },
      }),
      createField({
        fieldType: "Text",
        title: "키워드 3",
        defaultValue: fieldValues.profileKeyword3,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "키워드 3 입력" } },
      }),
      createField({
        fieldType: "Text",
        title: "키워드 4",
        defaultValue: fieldValues.profileKeyword4,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "키워드 4 입력" } },
      }),
      createField({
        fieldType: "Text",
        title: "키워드 5",
        defaultValue: fieldValues.profileKeyword5,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "키워드 5 입력" } },
      }),
    ],
  };
}

interface ICreateProjectBlock {
  title?: string;
  style?: IBlockTypeStyle;
  fieldValues: { [key in ProjectRefereceType]?: any };
}
function createProjectBlock({ title, style, fieldValues }: ICreateProjectBlock): IBlock {
  if (!title) title = "프로젝트";
  if (!style)
    style = {
      layoutType: "default",
      columnCount: 1,
    };
  return {
    id: `project_${uuidv4()}`,
    type: "Project",
    title: title,
    iconName: "Computer",
    style: {
      layoutType: style.layoutType,
      xs: convertColumnCountIntoXS(style.columnCount),
    },
    fields: [
      createField({
        fieldType: "Text",
        title: "프로젝트",
        defaultValue: fieldValues.projectName,
        attributes: { placeholder: { text: "예) 대출 추천 재개발" }, validation: { limit: 50 } },
      }),
      createField({ fieldType: "Text", title: "소속 / 기관", defaultValue: fieldValues.projectOrganigation, attributes: { placeholder: { text: "예) Banksalad" }, validation: { limit: 50 } } }),
      createField({ fieldType: "Date", title: "기간", defaultValue: fieldValues.projectTerm, attributes: { placeholder: { from: "시작 날짜", to: "종료 날짜" } } }),
      createField({
        fieldType: "MultiLineText",
        title: "배경 / 설명",
        defaultValue: fieldValues.projectDescription,
        attributes: {
          placeholder: {
            multiLineText:
              "예) 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다. 이에 재개발을 제안하여 비즈니스 로직을 좀 더 파악하기 쉽고 빠르게 임팩를 낼 수 있도록 하는데 기여하였습니다.",
          },
          validation: { limit: 200 },
        },
      }),
      createField({
        fieldType: "MultiLineText",
        title: "Skills",
        defaultValue: fieldValues.projectSkills,
        attributes: { placeholder: { multiLineText: "- View와 Data를 분리하고 모든 비즈니스 로직을 redux, middleware에서 처리" }, validation: { limit: 100 } },
      }),
      createField({
        fieldType: "AutoCompleteText",
        title: "Skill Set",
        defaultValue: fieldValues.projectSkillSet,
        attributes: { placeholder: { text: "React" } },
      }),
    ],
  };
}

interface ICreateCareerBlock {
  title?: string;
  style?: IBlockTypeStyle;
  fieldValues: { [key in CareerRefereceType]?: any };
}
function createCareerBlock({ title, style, fieldValues }: ICreateCareerBlock): IBlock {
  if (!title) title = "경력";
  if (!style)
    style = {
      layoutType: "default",
      columnCount: 1,
    };
  return {
    id: `career_${uuidv4()}`,
    type: "Career",
    title: title,
    iconName: "Computer",
    style: {
      layoutType: style.layoutType,
      xs: convertColumnCountIntoXS(style.columnCount),
    },
    fields: [
      createField({
        fieldType: "Text",
        title: "메인 텍스트",
        defaultValue: fieldValues.careerMainText,
        attributes: { placeholder: { text: "학교명, 직장명, 컨퍼런스명, 대회명" }, validation: { limit: 50 } },
      }),
      createField({
        fieldType: "Text",
        title: "서브 텍스트",
        defaultValue: fieldValues.careerSubText,
        attributes: { placeholder: { text: "학과, 역할, 발표 주제, 수상 내역" }, validation: { limit: 50 } },
      }),
      createField({ fieldType: "Date", title: "기간", defaultValue: fieldValues.careerTerm, attributes: { placeholder: { from: "시작 날짜", to: "종료 날짜" } } }),
      createField({
        fieldType: "MultiLineText",
        title: "설명",
        defaultValue: fieldValues.careerDescription,
        attributes: { placeholder: { text: "전공, 경력 요약, 발표 내용, 입상한 프로젝트 내용" }, validation: { limit: 200 } },
      }),
    ],
  };
}

interface ICreatePortfolioBlock {
  title?: string;
  style?: IBlockTypeStyle;
  fieldValues: { [key in PortfolioRefereceType]?: any };
}
function createPortfolioBlock({ title, style, fieldValues }: ICreatePortfolioBlock): IBlock {
  if (!title) title = "포트폴리오";
  if (!style)
    style = {
      layoutType: "default",
      columnCount: 1,
    };
  return {
    id: `portfolio_${uuidv4()}`,
    type: "Portfolio",
    title: title,
    iconName: "PersonOutline",
    style: {
      layoutType: "default",
      xs: convertColumnCountIntoXS(style.columnCount),
    },
    fields: [
      createField({ fieldType: "Image", title: "썸네일", defaultValue: fieldValues.portfolioThumbnail }),
      createField({ fieldType: "Text", title: "URL / 동영상 / 파일", defaultValue: fieldValues.portfolioURL, attributes: { placeholder: { text: "링크 주소" } } }),
      createField({
        fieldType: "Text",
        title: "포트폴리오 / 작품 제목",
        defaultValue: fieldValues.portfolioName,
        attributes: { placeholder: { multiLineText: "예) MZ세대 언어" }, validation: { limit: 50 } },
      }),
      createField({
        fieldType: "MultiLineText",
        title: "포트폴리오 / 작품 설명",
        defaultValue: fieldValues.portfolioDescription,
        attributes: { placeholder: { multiLineText: "예) MZ세대 언어를 테스트 할 수 있는 페이지입니다." }, validation: { limit: 200 } },
      }),
    ],
  };
}

interface ICreateField {
  fieldType: FieldType;
  title: string;
  defaultValue?: FieldValueType | undefined;
  attributes?: IFieldAttributes;
}
export function createField(fieldInfo: ICreateField): IField {
  const { fieldType, title, defaultValue, attributes } = fieldInfo;
  const value = defaultValue ? defaultValue : createDefaultFieldValue(fieldType);
  const attr = attributes ? attributes : {};
  const fieldData = { id: uuidv4(), type: fieldType, title: title, value: value, attributes: attr };

  return fieldData;

  function createDefaultFieldValue(fieldType: FieldType): FieldValueType {
    switch (fieldType) {
      case "Text":
        return { text: "" };
      case "MultiLineText":
        return { multiLineText: "" };
      case "Image":
        return { imageSrc: "" };
      case "Date":
        return { from: "", to: "" };
      case "Select":
        return { selectList: [], selectedValue: "" };
      case "AutoCompleteText":
        return { textList: [], selectedTextList: [] };
    }
  }
}