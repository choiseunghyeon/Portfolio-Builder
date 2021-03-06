import { BlockType, IBlock } from "@type/block"
import { IBlockTypeStyle } from "@type/blockStyle"
import { FieldType, FieldValueType, IField, IFieldAttributes, ITextFieldValue } from "@type/field"
import { v4 as uuidv4 } from "uuid"

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
  | "profileKeyword5"
type ProjectRefereceType = "projectName" | "projectOrganigation" | "projectDescription" | "projectTerm" | "projectSkills" | "projectSkillSet"
type CareerRefereceType = "careerMainText" | "careerSubText" | "careerTerm" | "careerDescription"
type PortfolioRefereceType = "portfolioThumbnail" | "portfolioURL" | "portfolioName" | "portfolioDescription"
type MarkDownRefereceType = "markdownText"
type FieldRefereceType = ProfileReferenceType | ProjectRefereceType | CareerRefereceType | PortfolioRefereceType | MarkDownRefereceType
interface ICreateBlock {
  blockType: BlockType
  title?: string
  style?: IBlockTypeStyle
  fieldValues?: { [key in FieldRefereceType]?: any }
}
export function createBlock({ blockType, title, style, fieldValues = {} }: ICreateBlock): IBlock {
  if (!fieldValues) fieldValues = {}
  switch (blockType) {
    case "Profile":
      return createProfileBlock({ title, style, fieldValues })
    case "Project":
      return createProjectBlock({ title, style, fieldValues })
    case "Career":
      return createCareerBlock({ title, style, fieldValues })
    case "Portfolio":
      return createPortfolioBlock({ title, style, fieldValues })
    case "MarkDown":
      return createMarkDownBlock({ title, style, fieldValues })
  }
}

interface ICreateProfileBlock {
  title?: string
  style?: IBlockTypeStyle
  fieldValues: { [key in ProfileReferenceType]?: any }
}
function createProfileBlock({ title, style, fieldValues }: ICreateProfileBlock): IBlock {
  if (!title) title = "?????????"
  if (!style)
    style = {
      layoutType: "default",
      columnCount: "1",
    }
  return {
    id: "profile_id",
    type: "Profile",
    title: title,
    iconName: "PersonOutline",
    // style: {
    //   layoutType: style.layoutType,
    //   xs: convertColumnCountIntoXS(style.columnCount),
    // },
    fields: [
      createField({ fieldType: "Image", title: "????????? ?????????", defaultValue: fieldValues.profileImage || "" }),
      createField({ fieldType: "Text", title: "?????? ?????????", defaultValue: fieldValues.profileMainText, attributes: { placeholder: { text: "??????, ?????????" }, validation: { limit: 25 } } }),
      createField({
        fieldType: "Text",
        title: "?????? ?????????",
        defaultValue: fieldValues.profileSubText,
        attributes: { placeholder: { text: "??????, ??????, ?????? ???????????? ??? ??????" }, validation: { limit: 50 } },
      }),
      createField({
        fieldType: "Select",
        title: "(??????) ?????? ??????",
        defaultValue: {
          selectList: [
            { label: "None", value: "" },
            { label: "Apply", value: "apply" },
            { label: "Contact", value: "contact" },
            { label: "Github", value: "github" },
            { label: "Keyword", value: "keyword" },
          ],
          selectedValue: fieldValues.profileAdditionalnfo || "",
        },
        attributes: { placeholder: { text: "??????, ??????, ?????? ???????????? ??? ??????" } },
      }),
      createField({
        fieldType: "Text",
        title: "????????????",
        defaultValue: fieldValues.profileApplyCompany,
        attributes: { relatedSelectValue: "apply", display: false, placeholder: { text: "???) ????????????" }, validation: { limit: 25 } },
      }),
      createField({
        fieldType: "Text",
        title: "???????????? / ????????????",
        defaultValue: fieldValues.profileApplyPosition,
        attributes: { relatedSelectValue: "apply", display: false, placeholder: { text: "???) ??????????????? ????????? / ????????????" }, validation: { limit: 25 } },
      }),
      createField({
        fieldType: "Text",
        title: "????????? ??????",
        defaultValue: fieldValues.profilePhoneNumber,
        attributes: { relatedSelectValue: "contact", display: false, placeholder: { text: "???) 010-1234-5678" }, validation: { limit: 25, dataType: "phoneNumber" } },
      }),
      createField({
        fieldType: "Text",
        title: "?????????",
        defaultValue: fieldValues.profileEmail,
        attributes: { relatedSelectValue: "contact", display: false, placeholder: { text: "???) ppb@naver.com" }, validation: { limit: 25, dataType: "email" } },
      }),
      createField({
        fieldType: "Text",
        title: "GitHub ??????",
        defaultValue: fieldValues.profileGitHubURL,
        attributes: { relatedSelectValue: "github", display: false, placeholder: { text: "Github ?????? ??????" } },
      }),
      createField({
        fieldType: "Text",
        title: "????????? 1",
        defaultValue: fieldValues.profileKeyword1,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "????????? 1 ??????" } },
      }),
      createField({
        fieldType: "Text",
        title: "????????? 2",
        defaultValue: fieldValues.profileKeyword2,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "????????? 2 ??????" } },
      }),
      createField({
        fieldType: "Text",
        title: "????????? 3",
        defaultValue: fieldValues.profileKeyword3,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "????????? 3 ??????" } },
      }),
      createField({
        fieldType: "Text",
        title: "????????? 4",
        defaultValue: fieldValues.profileKeyword4,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "????????? 4 ??????" } },
      }),
      createField({
        fieldType: "Text",
        title: "????????? 5",
        defaultValue: fieldValues.profileKeyword5,
        attributes: { relatedSelectValue: "keyword", display: false, placeholder: { text: "????????? 5 ??????" } },
      }),
    ],
  }
}

interface ICreateProjectBlock {
  title?: string
  style?: IBlockTypeStyle
  fieldValues: { [key in ProjectRefereceType]?: any }
}
function createProjectBlock({ title, style, fieldValues }: ICreateProjectBlock): IBlock {
  if (!title) title = "????????????"
  if (!style)
    style = {
      layoutType: "default",
      columnCount: "1",
    }
  return {
    id: `project_${uuidv4()}`,
    type: "Project",
    title: fieldValues.projectName || title,
    iconName: "Computer",
    // style: {
    //   layoutType: style.layoutType,
    //   xs: convertColumnCountIntoXS(style.columnCount),
    // },
    fields: [
      createField({
        fieldType: "Text",
        title: "????????????",
        defaultValue: fieldValues.projectName,
        attributes: { placeholder: { text: "???) ?????? ?????? ?????????" }, validation: { limit: 50 } },
      }),
      createField({ fieldType: "Text", title: "?????? / ??????", defaultValue: fieldValues.projectOrganigation, attributes: { placeholder: { text: "???) Banksalad" }, validation: { limit: 50 } } }),
      createField({ fieldType: "Date", title: "??????", defaultValue: fieldValues.projectTerm, attributes: { placeholder: { from: "?????? ??????", to: "?????? ??????" } } }),
      createField({
        fieldType: "MultiLineText",
        title: "?????? / ??????",
        defaultValue: fieldValues.projectDescription,
        attributes: {
          placeholder: {
            multiLineText:
              "???) ????????? ????????? ?????? ???????????? ?????? ????????? ???????????? ????????? ???????????????. ?????? ???????????? ???????????? ???????????? ????????? ??? ??? ???????????? ?????? ????????? ????????? ??? ??? ????????? ????????? ?????????????????????.",
          },
          validation: { limit: 200 },
        },
      }),
      createField({
        fieldType: "MultiLineText",
        title: "Skills",
        defaultValue: fieldValues.projectSkills,
        attributes: { placeholder: { multiLineText: "- View??? Data??? ???????????? ?????? ???????????? ????????? redux, middleware?????? ??????" }, validation: { limit: 100 } },
      }),
      createField({
        fieldType: "AutoCompleteText",
        title: "Skill Set",
        defaultValue: fieldValues.projectSkillSet,
        attributes: { placeholder: { text: "React" }, autocompleteRequest: "skillSet" },
      }),
    ],
  }
}

interface ICreateCareerBlock {
  title?: string
  style?: IBlockTypeStyle
  fieldValues: { [key in CareerRefereceType]?: any }
}
function createCareerBlock({ title, style, fieldValues }: ICreateCareerBlock): IBlock {
  if (!title) title = "??????"
  if (!style)
    style = {
      layoutType: "default",
      columnCount: "1",
    }
  return {
    id: `career_${uuidv4()}`,
    type: "Career",
    title: fieldValues.careerMainText || title,
    iconName: "Computer",
    // style: {
    //   layoutType: style.layoutType,
    //   xs: convertColumnCountIntoXS(style.columnCount),
    // },
    fields: [
      createField({
        fieldType: "Text",
        title: "?????? ?????????",
        defaultValue: fieldValues.careerMainText,
        attributes: { placeholder: { text: "?????????, ?????????, ???????????????, ?????????" }, validation: { limit: 50 } },
      }),
      createField({
        fieldType: "Text",
        title: "?????? ?????????",
        defaultValue: fieldValues.careerSubText,
        attributes: { placeholder: { text: "??????, ??????, ?????? ??????, ?????? ??????" }, validation: { limit: 50 } },
      }),
      createField({ fieldType: "Date", title: "??????", defaultValue: fieldValues.careerTerm, attributes: { placeholder: { from: "?????? ??????", to: "?????? ??????" } } }),
      createField({
        fieldType: "MultiLineText",
        title: "??????",
        defaultValue: fieldValues.careerDescription,
        attributes: { placeholder: { text: "??????, ?????? ??????, ?????? ??????, ????????? ???????????? ??????" }, validation: { limit: 200 } },
      }),
    ],
  }
}

interface ICreatePortfolioBlock {
  title?: string
  style?: IBlockTypeStyle
  fieldValues: { [key in PortfolioRefereceType]?: any }
}
function createPortfolioBlock({ title, style, fieldValues }: ICreatePortfolioBlock): IBlock {
  if (!title) title = "???????????????"
  if (!style)
    style = {
      layoutType: "default",
      columnCount: "1",
    }
  return {
    id: `portfolio_${uuidv4()}`,
    type: "Portfolio",
    title: fieldValues.portfolioName || title,
    iconName: "PersonOutline",
    // style: {
    //   layoutType: "default",
    //   xs: convertColumnCountIntoXS(style.columnCount),
    // },
    fields: [
      createField({ fieldType: "Image", title: "?????????", defaultValue: fieldValues.portfolioThumbnail }),
      createField({ fieldType: "Text", title: "URL / ????????? / ??????", defaultValue: fieldValues.portfolioURL, attributes: { placeholder: { text: "?????? ??????" } } }),
      createField({
        fieldType: "Text",
        title: "??????????????? / ?????? ??????",
        defaultValue: fieldValues.portfolioName,
        attributes: { placeholder: { multiLineText: "???) MZ?????? ??????" }, validation: { limit: 50 } },
      }),
      createField({
        fieldType: "MultiLineText",
        title: "??????????????? / ?????? ??????",
        defaultValue: fieldValues.portfolioDescription,
        attributes: { placeholder: { multiLineText: "???) MZ?????? ????????? ????????? ??? ??? ?????? ??????????????????." }, validation: { limit: 200 } },
      }),
    ],
  }
}

interface ICreateMarkDownBlock {
  title?: string
  style?: IBlockTypeStyle
  fieldValues: { [key in MarkDownRefereceType]?: any }
}
function createMarkDownBlock({ title, style, fieldValues }: ICreateMarkDownBlock): IBlock {
  if (!title) title = "????????????"
  if (!style)
    style = {
      layoutType: "default",
      columnCount: "1",
    }
  return {
    id: `markdown_${uuidv4()}`,
    type: "MarkDown",
    title: title,
    iconName: "PersonOutline",
    // style: {
    //   layoutType: style.layoutType,
    //   xs: convertColumnCountIntoXS(style.columnCount),
    // },
    fields: [
      createField({
        fieldType: "MultiLineText",
        title: "MarKDown",
        defaultValue: fieldValues.markdownText,
        attributes: { placeholder: { multiLineText: "## MarkDown" } },
      }),
    ],
  }
}

interface ICreateField {
  fieldType: FieldType
  title: string
  defaultValue?: any
  attributes?: IFieldAttributes
}
export function createField(fieldInfo: ICreateField): IField {
  const { fieldType, title, defaultValue, attributes } = fieldInfo
  const value = createDefaultFieldValue(fieldType, defaultValue)
  const attr = attributes ? attributes : {}
  const fieldData = { id: uuidv4(), type: fieldType, title: title, value: value, attributes: attr }

  return fieldData

  function createDefaultFieldValue(fieldType: FieldType, defaultValue: any): FieldValueType {
    switch (fieldType) {
      case "Text":
        return { text: defaultValue || "" }
      case "MultiLineText":
        return { multiLineText: defaultValue || "" }
      case "Image":
        return { imageSrc: defaultValue || "" }
      case "Date":
        return { from: defaultValue?.from || "", to: defaultValue?.to || "" }
      case "Select":
        return { selectList: defaultValue.selectList || [], selectedValue: defaultValue.selectedValue || "" }
      case "AutoCompleteText":
        return { textList: [], selectedTextList: defaultValue || [] }
    }
  }
}
