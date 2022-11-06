import { LayoutBlock } from "@store/root"
import { BlockType } from "@type/block"
import { EachBlockTypeStyle } from "@type/blockStyle"

type DefaultBlockTypeStyleType = {
  [blockType in BlockType]: {
    changableLayoutTypes: string[]
    changableColumnCount: number[]
  }
}

export const DefaultBlockTypeStyleForComponent: DefaultBlockTypeStyleType = {
  Profile: {
    changableLayoutTypes: ["default", "second"],
    changableColumnCount: [],
  },
  Project: {
    changableLayoutTypes: ["default"],
    changableColumnCount: [1, 2, 3, 4],
  },
  Career: {
    changableLayoutTypes: ["default"],
    changableColumnCount: [1, 2, 3, 4],
  },
  Portfolio: {
    changableLayoutTypes: ["default"],
    changableColumnCount: [1, 2, 3, 4],
  },
  MarkDown: {
    changableLayoutTypes: [],
    changableColumnCount: [1, 2, 3, 4],
  },
}

type DefaultBlockTypeStyle = {
  [blockType in BlockType]: {
    layoutType: string
    columnCount: number
  }
}
export const defaultBlockTypeStyle: DefaultBlockTypeStyle = {
  Career: {
    layoutType: "default",
    columnCount: 1,
  },
  Profile: {
    layoutType: "default",
    columnCount: 1,
  },
  Project: {
    layoutType: "default",
    columnCount: 1,
  },
  MarkDown: {
    layoutType: "default",
    columnCount: 1,
  },
  Portfolio: {
    layoutType: "default",
    columnCount: 1,
  },
}

export const setDefaultBlockTypeStyle = (blockTypeStyle: EachBlockTypeStyle) => {
  blockTypeStyle.Profile.columnCount = 1
  return blockTypeStyle
}

export const createDefaultBlockLayout = (blockLayout: any[][]): LayoutBlock[][] => {
  return blockLayout.reduce((accRow, row) => {
    const rowLayout = row.reduce((colAcc, col) => {
      const layout: any = { ...col }
      if (layout.blockType === "Profile") layout.title = "프로필"
      else if (layout.blockType === "Career") layout.title = "커리어"
      else if (layout.blockType === "Project") layout.title = "프로젝트"
      else if (layout.blockType === "Portfolio") layout.title = "포트폴리오"
      else if (layout.blockType === "MarkDown") layout.title = "마크다운"
      colAcc.push(layout)
      return colAcc
    }, [])
    accRow.push(rowLayout)
    return accRow
  }, [])
}
