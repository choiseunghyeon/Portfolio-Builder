import { LayoutBlock } from "@store/root"
import { EachBlockTypeStyle } from "@type/blockStyle"

export const DefaultBlockTypeStyle = {
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
}

export const setDefaultBlockTypeStyle = (blockTypeStyle: EachBlockTypeStyle) => {
  blockTypeStyle.Profile.columnCount = 1
  return blockTypeStyle
}

export const setDefaultBlockLayout = (blockLayout: LayoutBlock[][]) => {
  const flatLayoutList = blockLayout.flat()
  flatLayoutList.forEach(layout => {
    if (layout.id === "profile_id") layout.title = "프로필"
    else if (layout.groupBlockType === "Career") layout.title = "커리어"
    else if (layout.groupBlockType === "Project") layout.title = "프로젝트"
    else if (layout.groupBlockType === "Portfolio") layout.title = "포트폴리오"
  })
}
