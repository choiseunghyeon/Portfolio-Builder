import { createAction, createReducer } from "@reduxjs/toolkit"
import { BlockType, IBlock } from "@type/block"
import { selectBlockById, selectBlockIndexById, selectBlockLayout, selectBlocks, selectBlocksByType, selectBlockTypeStyleByBlockType } from "./selector"
import { EachBlockTypeStyle, IBlockTypeStyle } from "@type/blockStyle"
import { createBlock } from "./defaultData/defaultBlockData"
import { ISelectFiedlValue } from "@type/field"
import { createDefaultBlockLayout } from "./defaultData/defaultBlockStyle"

export interface LayoutBlock {
  blockType: BlockType
  title: string
}

export type PortfolioPageType = "edit" | "search"
interface TempState {
  portfolio: {
    [pageType: string]: IPortFolio
  }
  tabFold: boolean
  skillSet: string[]
}
interface IPortFolio {
  blocks: IBlock[]
  blockTypeStyle: EachBlockTypeStyle
  blockLayout: LayoutBlock[][]
}

const defaultPortfolioData: IPortFolio = {
  blockLayout: [
    [{ title: "프로필", blockType: "Profile" }],
    [{ title: "커리어", blockType: "Career" }],
    [{ title: "프로젝트", blockType: "Project" }],
    [{ title: "포트폴리오", blockType: "Portfolio" }],
    [{ title: "마크다운", blockType: "MarkDown" }],
  ],
  blocks: [
    createBlock({ blockType: "Profile" }),
    createBlock({ blockType: "Project" }),
    createBlock({ blockType: "Portfolio" }),
    createBlock({ blockType: "Career" }),
    createBlock({ blockType: "MarkDown" }),
  ],
  blockTypeStyle: {
    Profile: {
      layoutType: "default",
      columnCount: "1",
    },
    Project: {
      layoutType: "default",
      columnCount: "1",
    },
    Career: {
      layoutType: "default",
      columnCount: "1",
    },
    Portfolio: {
      layoutType: "default",
      columnCount: "1",
    },
    MarkDown: {
      layoutType: "default",
      columnCount: "1",
    },
  },
}

const root: TempState = {
  tabFold: false,
  portfolio: {
    edit: defaultPortfolioData,
    search: defaultPortfolioData,
  },
  skillSet: ["React", "Redux", "Immer"],
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
interface IPorfolioPayload {
  portfolioPageType: PortfolioPageType
  portfolio: any // server response
}
export const changePortfolioById = createAction<IPorfolioPayload>("setup/changePortfolioById")
export const changeItemValue = createAction<ItemValuePayload>("setup/handleItemValue")
export const swapBlock = createAction<ISwapBlockPayload>("setup/swapBlock")
export const foldTab = createAction<boolean>("setup/foldTab")
export const changeBlockTypeStyle = createAction<IChangeBlockTypeStylePayload>("setup/changeBlockStyleType")
export const addBlock = createAction<IAddBlockPayload>("setup/addBlock")
export const removeBlock = createAction<string>("setup/removeBlock")
// layout
export const swapBlockLayout = createAction<any>("setup/swapBlockLayout")
export const addBlockLayout = createAction<void>("setup/addBlockLayout")
const rootReducer = createReducer(root, builder => {
  builder
    .addCase(changePortfolioById, (state, action) => {
      const { portfolioPageType, portfolio } = action.payload
      const newPortfolio: IPortFolio = {
        blockLayout: createDefaultBlockLayout(portfolio.blockLayout),
        blockTypeStyle: portfolio.blockTypeStyle,
        blocks: portfolio.blocks.map(block => createBlock({ blockType: block.blockType, fieldValues: block.fieldValues })),
      }
      console.log(newPortfolio)
      state.portfolio[portfolioPageType] = newPortfolio

      const profileBlock = newPortfolio.blocks.find(block => block.type === "Profile")
      if (!profileBlock) return

      const additionalField = profileBlock.fields.find(field => field.title === "(선택) 추가 정보")
      if (!additionalField) return

      setSelectItemValue(profileBlock, additionalField, additionalField.value.selectedValue)
    })
    .addCase(changeItemValue, (state, action) => {
      console.log("called changeItemValue")
      const { blockId, fieldId, valueId, value } = action.payload
      const targetBlock = selectBlockById(state, "edit", blockId)
      if (!targetBlock) return

      const targetField = targetBlock.fields.find(field => field.id === fieldId)
      if (!targetField) return

      switch (targetField.type) {
        case "Select":
          setSelectItemValue(targetBlock, targetField, value)
          break
        default:
          targetField.value[valueId] = value
          break
      }

      changeBlockTitle(targetBlock, targetField, value)

      function changeBlockTitle(targetBlock, targetField, value) {
        if (targetBlock.type === "Project" && targetField.title === "프로젝트") {
          targetBlock.title = value
        } else if (targetBlock.type === "Career" && targetField.title === "메인 텍스트") {
          targetBlock.title = value
        } else if (targetBlock.type === "Portfolio" && targetField.title === "포트폴리오 / 작품 제목") {
          targetBlock.title = value
        }
      }
    })
    .addCase(swapBlock, (state, action) => {
      const { sourceBlockId, destinationBlockId } = action.payload
      const sourceIndex = selectBlockIndexById(state, "edit", sourceBlockId)
      const destinationIndex = selectBlockIndexById(state, "edit", destinationBlockId)
      const blocks = selectBlocks(state, "edit")

      //swap two items
      ;[blocks[sourceIndex], blocks[destinationIndex]] = [blocks[destinationIndex], blocks[sourceIndex]]
    })
    .addCase(swapBlockLayout, (state, action) => {
      const { source, destination } = action.payload
      const blockLayout = selectBlockLayout(state, "edit")
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
      const blockLayout = selectBlockLayout(state, "edit")
      blockLayout.push([])
    })
    .addCase(foldTab, (state, action) => {
      const needFold = action.payload
      state.tabFold = needFold
    })
    .addCase(changeBlockTypeStyle, (state, action) => {
      const { blockType, layoutType, columnCount } = action.payload
      const blocks = selectBlocksByType(state, "edit", blockType)
      const targetBlockTypeStyle = selectBlockTypeStyleByBlockType(state, "edit", blockType)

      if (layoutType !== undefined) {
        targetBlockTypeStyle.layoutType = layoutType
        // blocks.forEach(block => (block.style.layoutType = layoutType))
      }

      if (columnCount !== undefined) {
        targetBlockTypeStyle.columnCount = columnCount
        // const xs = convertColumnCountIntoXS(columnCount)
        // blocks.forEach(block => (block.style.xs = xs))
      }
    })
    .addCase(addBlock, (state, action) => {
      const { blockType, title } = action.payload
      const blockTypeStyle = selectBlockTypeStyleByBlockType(state, "edit", blockType)
      const blocks = selectBlocks(state, "edit")
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
      const blocks = selectBlocks(state, "edit")
      const targetBlockIndex = selectBlockIndexById(state, "edit", blockId)
      blocks.splice(targetBlockIndex, 1)
    })
})

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function setSelectItemValue(targetBlock, targetField, value) {
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

export default rootReducer
