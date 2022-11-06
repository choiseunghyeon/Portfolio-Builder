import { IBlock } from "@type/block"
import { IField } from "@type/field"

export function getPortfolioBlocksForRequest(blocks: IBlock[]) {
  return blocks.map(block => getBlockForRequest(block))
}

function getBlockForRequest(block: IBlock) {
  switch (block.type) {
    case "Profile":
      return convertProfile(block)
    case "Project":
      return convertProject(block)
    case "Career":
      return convertCareer(block)
    case "Portfolio":
      return convertPortfolio(block)
    case "MarkDown":
      return convertMarkdown(block)
  }
}
function isTempId(id: string | number) {
  if (typeof id === "number") return false
  return true
  //   return id.includes("tempsid_") ? true : false
}

function convertProfile(block: IBlock) {
  const [
    profileImage,
    profileMainText,
    profileSubText,
    _temp,
    profileAdditionalnfo,
    profileApplyCompany,
    profileApplyPosition,
    profilePhoneNumber,
    profileEmail,
    profileGitHubURL,
    profileKeyword1,
    profileKeyword2,
    profileKeyword3,
    profileKeyword4,
    profileKeyword5,
  ] = block.fields

  const result: any = {
    blockType: block.type,
    idx: block.idx,
    fieldValues: {
      profileImage: convertFieldValue(profileImage),
      profileMainText: convertFieldValue(profileMainText),
      profileSubText: convertFieldValue(profileSubText),
      profileAdditionalnfo: convertFieldValue(profileAdditionalnfo),
      profileApplyCompany: convertFieldValue(profileApplyCompany),
      profileApplyPosition: convertFieldValue(profileApplyPosition),
      profilePhoneNumber: convertFieldValue(profilePhoneNumber),
      profileEmail: convertFieldValue(profileEmail),
      profileGitHubURL: convertFieldValue(profileGitHubURL),
      profileKeyword1: convertFieldValue(profileKeyword1),
      profileKeyword2: convertFieldValue(profileKeyword2),
      profileKeyword3: convertFieldValue(profileKeyword3),
      profileKeyword4: convertFieldValue(profileKeyword4),
      profileKeyword5: convertFieldValue(profileKeyword5),
    },
  }

  if (!isTempId(block.id)) result.id = block.id

  return result
}

function convertProject(block: IBlock) {
  const [projectName, projectOrganigation, projectTerm, projectDescription, projectSkills, projectSkillSet] = block.fields

  const result: any = {
    blockType: block.type,
    idx: block.idx,
    fieldValues: {
      projectName: convertFieldValue(projectName),
      projectOrganigation: convertFieldValue(projectOrganigation),
      projectTerm: convertFieldValue(projectTerm),
      projectDescription: convertFieldValue(projectDescription),

      projectSkills: convertFieldValue(projectSkills),
      projectSkillSet: convertFieldValue(projectSkillSet),
    },
  }

  if (!isTempId(block.id)) result.id = block.id

  return result
}

function convertCareer(block: IBlock) {
  const [careerMainText, careerSubText, careerTerm, careerDescription] = block.fields

  const result: any = {
    blockType: block.type,
    idx: block.idx,
    fieldValues: {
      careerMainText: convertFieldValue(careerMainText),
      careerSubText: convertFieldValue(careerSubText),
      careerTerm: convertFieldValue(careerTerm),
      careerDescription: convertFieldValue(careerDescription),
    },
  }

  if (!isTempId(block.id)) result.id = block.id

  return result
}
function convertPortfolio(block: IBlock) {
  const [portfolioThumbnail, portfolioURL, portfolioName, portfolioDescription] = block.fields

  const result: any = {
    blockType: block.type,
    idx: block.idx,
    fieldValues: {
      portfolioThumbnail: convertFieldValue(portfolioThumbnail),
      portfolioURL: convertFieldValue(portfolioURL),
      portfolioName: convertFieldValue(portfolioName),
      portfolioDescription: convertFieldValue(portfolioDescription),
    },
  }

  if (!isTempId(block.id)) result.id = block.id

  return result
}

function convertMarkdown(block: IBlock) {
  const [markdownText] = block.fields

  const result: any = {
    blockType: block.type,
    idx: block.idx,
    fieldValues: {
      markdownText: convertFieldValue(markdownText),
    },
  }

  if (!isTempId(block.id)) result.id = block.id

  return result
}

function convertFieldValue(field: IField) {
  switch (field.type) {
    case "Text":
      return field.value.text
    case "MultiLineText":
      return field.value.multiLineText
    case "Image":
      return field.value.imageSrc
    case "Date":
      return field.value
    case "AutoCompleteText":
      return field.value.selectedTextList
  }
}
