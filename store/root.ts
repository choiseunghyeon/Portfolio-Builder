import { createAction, createReducer } from "@reduxjs/toolkit"
import { BlockType, IBlock } from "@type/block"
import { selectBlockById, selectBlockIndexById, selectBlockLayout, selectBlocks, selectBlocksByType, selectBlockTypeStyleByBlockType } from "./selector"
import { EachBlockTypeStyle, IBlockTypeStyle } from "@type/blockStyle"
import { convertColumnCountIntoXS } from "./utils"
import { createBlock, createField } from "./defaultData/defaultBlockData"
import { ISelectFiedlValue } from "@type/field"

export interface LayoutBlock {
  id?: string
  groupBlockType?: BlockType
  title: string
}
interface TempState {
  blocks: IBlock[]
  blockTypeStyle: EachBlockTypeStyle
  tabFold: boolean
  blockLayout: LayoutBlock[][]
}
const profileFieldValues = {
  profileImage: { imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg" },
  profileMainText: { text: "Front End Developer" },
  profileSubText: { text: `안녕하세요 :) 서핏 팀의 디자이너 박소연입니다. 저는 좋은 디자인이 사용자의 삶을 달라지게 하고 나아가서는 사회를 더 나아가서는 세상을 바꿀 수 있다고 생각합니다.` },
}

const projectFiledValues = {
  projectName: { text: "대출 추천 재개발" },
  projectOrganigation: { text: "현대 자동차" },
  projectDescription: {
    multiLineText: `도시·개발계획 분석 전문가인 엄재웅(서경파파)씨가 신간 ‘강남 되는 강북 부동산은 정해져 있다’(위즈덤하우스)를 펴냈다. 엄씨는 부동산에서 가장 중요한 것은 입지가 아닌 정책이 부동산 시장에서 교통
  호재는 언제나 많은 관심을 부르는 키워드입니다. 특히 교통 호재는 계획 발표`,
  },
  projectTerm: { from: "2022-04-01", to: "2022-05-30" },
  projectSkills: {
    multiLineText: `View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리
  redux, redux-saga 적용 및 가이드 공유`,
  },
  projectSkillSet: {
    textList: ["React", "Redux", "Immer"],
    selectedTextList: ["React"],
  },
}
const careerFiledValues = {
  careerMainText: { text: "현대 자동차" },
  careerSubText: { text: "Front-End" },
  careerDescription: {
    multiLineText: `View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리
    redux, redux-saga 적용 및 가이드 공유`,
  },
  careerTerm: { from: "2022-04-01", to: "2022-05-30" },
}
const portfolioFiledValues = {
  portfolioThumbnail: { imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg" },
  portfolioName: { text: "MZ세대 언어" },
  portfolioDescription: {
    multiLineText: `어남선생 류수영, 레시피 여왕 박복순 박솔미, 국민아들 찬또배기 이찬원이 치열한 경쟁을 예고한 류진과 폭풍 성장한 두 아들 찬형X찬호 형제 삼부자가 출사표를 던졌다.`,
  },
  portfolioURL: {
    text: `http://sports.hankooki.com/news/articleView.html?idxno=6798068`,
  },
}

/*
blocks: {
    Profile: [createBlock({ blockType: "Profile", fieldValues: profileFieldValues })],
    Career: [createBlock({ blockType: "Career", fieldValues: careerFiledValues })],
    Project: [createBlock({ blockType: "Project", fieldValues: projectFiledValues }), createBlock({ blockType: "Project", fieldValues: projectFiledValues })],
    Portfolio: [
      createBlock({ blockType: "Portfolio", fieldValues: portfolioFiledValues }),
      createBlock({ blockType: "Portfolio", fieldValues: portfolioFiledValues }),
      createBlock({ blockType: "Portfolio", fieldValues: portfolioFiledValues }),
    ],
  },

interface TempState {
  blocks: MappedBlocks
  blockTypeStyle: EachBlockTypeStyle
  tabFold: boolean
  blockLayout: LayoutBlock[][]
}

type MappedBlocks = {
  [key in BlockType]: IBlock[]
}
*/

const root: TempState = {
  blockLayout: [
    [{ title: "프로필", id: "profile_id" }],
    [{ title: "커리어", groupBlockType: "Career" }],
    [{ title: "프로젝트", groupBlockType: "Project" }],
    [{ title: "포트폴리오", groupBlockType: "Portfolio" }],
  ],
  tabFold: false,
  blocks: [
    createBlock({ blockType: "Profile", fieldValues: profileFieldValues }),
    createBlock({ blockType: "Project", fieldValues: projectFiledValues }),
    createBlock({ blockType: "Project", fieldValues: projectFiledValues }),
    createBlock({ blockType: "Career", fieldValues: careerFiledValues }),
    createBlock({ blockType: "Portfolio", fieldValues: portfolioFiledValues }),
    createBlock({ blockType: "Portfolio", fieldValues: portfolioFiledValues }),
    createBlock({ blockType: "Portfolio", fieldValues: portfolioFiledValues }),
  ],
  blockTypeStyle: {
    Profile: {
      layoutType: "default",
      columnCount: 1,
    },
    Project: {
      layoutType: "default",
      columnCount: 1,
    },
    Career: {
      layoutType: "default",
      columnCount: 1,
    },
    Portfolio: {
      layoutType: "default",
      columnCount: 1,
    },
  },
}

interface ItemValuePayload {
  blockId: string
  fieldId: string
  valueId: string
  value: { [key: string]: any }
}

interface ISwapBlockPayload {
  sourceBlockId: string
  destinationBlockId: string
}

export interface IChangeBlockTypeStylePayload extends Partial<IBlockTypeStyle> {
  blockType: BlockType
}

export interface IAddBlockPayload {
  blockType: BlockType
  title: string
}

interface IChangedSelectedValuePayload {
  blockId: string
  fieldId: string
  value: string
}
export const changeItemValue = createAction<ItemValuePayload>("setup/handleItemValue")
export const swapBlock = createAction<ISwapBlockPayload>("setup/swapBlock")
export const foldTab = createAction<boolean>("setup/foldTab")
export const changeBlockTypeStyle = createAction<IChangeBlockTypeStylePayload>("setup/changeBlockStyleType")
export const addBlock = createAction<IAddBlockPayload>("setup/addBlock")
export const removeBlock = createAction<string>("setup/removeBlock")
export const changeSelectedValue = createAction<IChangedSelectedValuePayload>("setup/changedSelectedValue")
// layout
export const swapBlockLayout = createAction<any>("setup/swapBlockLayout")
export const addBlockLayout = createAction<void>("setup/addBlockLayout")
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changeItemValue, (state, action) => {
      console.log("called changeItemValue")
      const { blockId, fieldId, valueId, value } = action.payload
      const targetBlock = selectBlockById(state, blockId)
      if (!targetBlock) return

      const targetField = targetBlock.fields.find(field => field.id === fieldId)
      if (!targetField) return

      switch (targetField.type) {
        case "Select":
          changeSelectItemValue(targetBlock, targetField, value)
          break
        default:
          targetField.value[valueId] = value
          break
      }

      function changeSelectItemValue(targetBlock, targetField, value) {
        const selectedValue = (targetField.value as ISelectFiedlValue).selectedValue
        // 기존 selectedValue로 보여주던 field 숨김
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === selectedValue)
          .forEach(field => {
            field.attributes.display = false
          })

        // select와 연결된 field 보여주기
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === value)
          .forEach(field => {
            field.attributes.display = true
          })
        ;(targetField.value as ISelectFiedlValue).selectedValue = value
      }
    })
    .addCase(swapBlock, (state, action) => {
      const { sourceBlockId, destinationBlockId } = action.payload
      const sourceIndex = selectBlockIndexById(state, sourceBlockId)
      const destinationIndex = selectBlockIndexById(state, destinationBlockId)
      const blocks = selectBlocks(state)

      //swap two items
      ;[blocks[sourceIndex], blocks[destinationIndex]] = [blocks[destinationIndex], blocks[sourceIndex]]
    })
    .addCase(swapBlockLayout, (state, action) => {
      const { source, destination } = action.payload
      const blockLayout = selectBlockLayout(state)
      const current: any[] = blockLayout[source.droppableId]
      const next: any[] = blockLayout[destination.droppableId]
      const target: any = current[source.index]

      // moving to same list
      if (source.droppableId === destination.droppableId) {
        const reordered: any[] = reorder(current, source.index, destination.index)
        blockLayout[source.droppableId] = reordered
      }
      // moving to different list

      // remove from original
      current.splice(source.index, 1)
      // insert into next
      next.splice(destination.index, 0, target)

      blockLayout[source.droppableId] = current
      blockLayout[destination.droppableId] = next
    })
    .addCase(addBlockLayout, (state, action) => {
      const blockLayout = selectBlockLayout(state)
      blockLayout.push([])
    })
    .addCase(foldTab, (state, action) => {
      const needFold = action.payload
      state.tabFold = needFold
    })
    .addCase(changeBlockTypeStyle, (state, action) => {
      const { blockType, layoutType: layoutType, columnCount } = action.payload
      const blocks = selectBlocksByType(state, blockType)
      const targetBlockTypeStyle = selectBlockTypeStyleByBlockType(state, blockType)

      if (layoutType !== undefined) {
        targetBlockTypeStyle.layoutType = layoutType
        blocks.forEach(block => (block.style.layoutType = layoutType))
      }

      if (columnCount !== undefined) {
        targetBlockTypeStyle.columnCount = columnCount
        const xs = convertColumnCountIntoXS(columnCount)
        blocks.forEach(block => (block.style.xs = xs))
      }
    })
    .addCase(addBlock, (state, action) => {
      const { blockType, title } = action.payload
      const blockTypeStyle = selectBlockTypeStyleByBlockType(state, blockType)
      const blocks = selectBlocks(state)
      let lastBlockIndexInBlockType
      for (let lastIndex = blocks.length - 1; lastIndex >= 0; lastIndex--) {
        if (blocks[lastIndex].type === blockType) {
          lastBlockIndexInBlockType = lastIndex
          break
        }
      }

      const blockData = createBlock({ blockType, title, style: blockTypeStyle })
      if (!blockData) return

      if (lastBlockIndexInBlockType) {
        blocks.splice(lastBlockIndexInBlockType + 1, 0, blockData)
      } else {
        blocks.push(blockData)
      }
    })
    .addCase(removeBlock, (state, action) => {
      const blockId = action.payload
      const blocks = selectBlocks(state)
      const targetBlockIndex = selectBlockIndexById(state, blockId)
      blocks.splice(targetBlockIndex, 1)
    })
    .addCase(changeSelectedValue, (state, action) => {
      const { blockId, fieldId, value } = action.payload
      const targetBlock = selectBlockById(state, blockId)

      if (!targetBlock) return

      const targetField = targetBlock.fields.find(field => field.id === fieldId)

      if (!targetField) return

      if (targetField.type === "Select") {
        const selectedValue = (targetField.value as ISelectFiedlValue).selectedValue
        // 기존 selectedValue로 보여주던 field 숨김
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === selectedValue)
          .forEach(field => {
            field.attributes.display = false
          })

        // select와 연결된 field 보여주기
        targetBlock.fields
          .filter(field => field.attributes?.relatedSelectValue === value)
          .forEach(field => {
            field.attributes.display = true
          })
        ;(targetField.value as ISelectFiedlValue).selectedValue = value
      }
    })
})

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export default rootReducer
