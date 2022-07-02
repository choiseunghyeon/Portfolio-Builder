import { previewProvider } from "@components/preview/provider"
import { useDispatch, useSelector } from "react-redux"
import { previewSelectorProvider, selectBlockById, selectBlockLayout, selectBlocks, selectBlocksByType, selectBlockStyle, selectBlockTypeStyleByBlockType } from "@store/selector"
import { Grid } from "@mui/material"
import { convertColumnCountIntoXS, isGroupBlock } from "../store/utils"
import { ColumnCountType } from "@type/blockStyle"
import { PREVIEW_CONTAINER } from "@constants/testConstants"
import { useQuery } from "react-query"
import axios from "axios"
import { useEffect } from "react"
import { changePortfolioById, PortfolioPageType } from "@store/root"
import { BlockType } from "@type/block"
import { usePortfolio } from "@lib/hooks/query"
interface IPreviewContainer {
  portfolioId: string
  portfolioPageType?: PortfolioPageType
}

const PreviewContainer = ({ portfolioId, portfolioPageType = "edit" }: IPreviewContainer) => {
  const dispatch = useDispatch()
  const blockLayout = useSelector(state => selectBlockLayout(state, portfolioPageType))
  const portfolio = usePortfolio(portfolioId)
  useEffect(() => {
    if (portfolio) {
      dispatch(changePortfolioById({ portfolioPageType, portfolio }))
    }
  }, [portfolio])
  return (
    <Grid data-testid={PREVIEW_CONTAINER} container spacing={1}>
      {blockLayout.map((blockList, index) => {
        const columnCount = blockList.length as ColumnCountType
        const xs = convertColumnCountIntoXS(columnCount)
        return (
          <Grid data-testid="previewBlockContainer" key={index} container>
            {blockList.map(block => {
              if (isGroupBlock(block.blockType)) {
                return (
                  <Grid container item xs={xs} key={block.blockType}>
                    <GroupBlock portfolioPageType={portfolioPageType} blockType={block.blockType} />
                  </Grid>
                )
              } else {
                return (
                  <Grid item xs={xs} key={block.blockType}>
                    <Block key={block.blockType} portfolioPageType={portfolioPageType} blockType={block.blockType} />
                  </Grid>
                )
              }
            })}
          </Grid>
        )
      })}
    </Grid>
  )
}

const GroupBlock = ({ blockType, portfolioPageType }: { blockType: BlockType; portfolioPageType: PortfolioPageType }) => {
  const blocks = useSelector(state => selectBlocksByType(state, portfolioPageType, blockType))
  const blockStyle = useSelector(state => selectBlockTypeStyleByBlockType(state, portfolioPageType, blockType))
  return (
    <>
      {blocks.map(block => {
        const PreviewComponent = previewProvider[block.type]
        const previewProps = previewSelectorProvider[block.type](block, blockStyle)
        return (
          <Grid key={block.id} item xs={convertColumnCountIntoXS(blockStyle.columnCount)}>
            <PreviewComponent key={block.id} {...previewProps} />
          </Grid>
        )
      })}
    </>
  )
}

const Block = ({ blockType, portfolioPageType }: { blockType: BlockType; portfolioPageType: PortfolioPageType }) => {
  const blocks = useSelector(state => selectBlocksByType(state, portfolioPageType, blockType))
  const blockStyle = useSelector(state => selectBlockTypeStyleByBlockType(state, portfolioPageType, blockType))

  console.log(blocks)
  const block = blocks[0]
  if (!block) return null
  const PreviewComponent = previewProvider[block.type]
  const previewProps = previewSelectorProvider[block.type](block, blockStyle)
  return (
    <Grid key={block.id} item xs={convertColumnCountIntoXS(blockStyle.columnCount)}>
      <PreviewComponent key={block.id} {...previewProps} />
    </Grid>
  )
}

export default PreviewContainer
