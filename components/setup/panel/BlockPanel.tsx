import BlockContainer from "@container/builder/BlockContainer"
import { CAREER_TAB, CAREER_TAB_PANEL, MARKDOWN_TAB_PANEL, PORTFOLIO_TAB_PANEL, PROFILE_TAB_PANEL, PROJECT_TAB_PANEL } from "@constants/testConstants"
import { BlockType } from "@type/block"

interface IBlockPanelProps {
  value: BlockType
}

function getTestIdByBlockType(type: BlockType) {
  switch (type) {
    case "Career":
      return CAREER_TAB_PANEL
    case "Project":
      return PROJECT_TAB_PANEL
    case "Portfolio":
      return PORTFOLIO_TAB_PANEL
    case "MarkDown":
      return MARKDOWN_TAB_PANEL
    case "Profile":
      return PROFILE_TAB_PANEL
  }
}
export default function BlockPanel({ value }: IBlockPanelProps) {
  return (
    <>
      <BlockContainer dataTestId={getTestIdByBlockType(value)} blockType={value} />
    </>
  )
}
