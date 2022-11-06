import { getPortfolioBlocksForRequest } from "@store/defaultData/converter"
import { IPortFolio, LayoutBlock } from "@store/root"
import { BlockType, IBlock } from "@type/block"
import { EachBlockTypeStyle } from "@type/blockStyle"
import { diff } from "json-diff"

interface IChangedPortfolioProperty {
  blockLayout: boolean
  blockTypeStyle: boolean
  blocks: {
    add: IChangedBlockInfo[]
    update: IChangedBlockInfo[]
    delete: IChangedBlockInfo[]
  }
}

interface IChangedBlockInfo {
  blockId: string
  blockType: BlockType
}
export const getChangedPortfolioInfo = (baseline: IPortFolio, editPortfolio: IPortFolio): IChangedPortfolioProperty => {
  const changed = diff(baseline, editPortfolio, { outputKeys: ["id", "type"] })
  const isBlocksChanged = !!changed?.blocks
  let changedBlockIdsByType = {
    add: [],
    update: [],
    delete: [],
  }
  if (isBlocksChanged) {
    const changedBlocks = changed.blocks.filter(blockChange => blockChange.length > 1).map(([operation, changeInfo]) => [operation, changeInfo.id, changeInfo.type])

    changedBlockIdsByType = changedBlocks.reduce(
      (acc, [changeOperation, blockId, blockType]) => {
        if (changeOperation === "+") {
          acc.add.push({ blockId, blockType })
        } else if (changeOperation === "~") {
          acc.update.push({ blockId, blockType })
        } else if (changeOperation === "-") {
          acc.delete.push({ blockId, blockType })
        }
        return acc
      },
      {
        add: [],
        update: [],
        delete: [],
      }
    )
  }

  const result = {
    // true 값들은 서버에서 주는대로 반영되므로 바뀌지 않더라도 서버로 전달
    blockLayout: true,
    blockTypeStyle: true,

    blocks: changedBlockIdsByType,
  }
  console.log(result)
  return result
}

export function getUpdatedPortfolio(portfolio: IPortFolio, changedPortfolioInfo: IChangedPortfolioProperty): { updatedPortfolioInfo; deletedBlockInfo: IChangedBlockInfo[] } {
  const updatedPortfolioInfo: any = {}
  let deletedBlockInfo: any = []
  if (changedPortfolioInfo.blockLayout) updatedPortfolioInfo.blockLayout = portfolio.blockLayout
  if (changedPortfolioInfo.blockTypeStyle) updatedPortfolioInfo.blockTypeStyle = portfolio.blockTypeStyle

  if (changedPortfolioInfo.blocks.add.length > 0 || changedPortfolioInfo.blocks.update.length > 0) {
    // 신규 추가 Block의 경우 id 삭제
    const addedBlocks = portfolio.blocks.filter(block => changedPortfolioInfo.blocks.add.some(({ blockId, blockType }) => block.id === blockId && block.type === blockType))
    const updatedBlocks = portfolio.blocks.filter(block => changedPortfolioInfo.blocks.update.some(({ blockId, blockType }) => block.id === blockId && block.type === blockType))
    const blocks = addedBlocks.concat(updatedBlocks)
    updatedPortfolioInfo.blocks = getPortfolioBlocksForRequest(blocks)
  }

  if (changedPortfolioInfo.blocks.delete.length > 0) {
    deletedBlockInfo = changedPortfolioInfo.blocks.delete
  }

  return { updatedPortfolioInfo, deletedBlockInfo }
}
