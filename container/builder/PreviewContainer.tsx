import { previewProvider } from "@components/preview/provider"
import { useDispatch, useSelector } from "react-redux"
import {
  previewSelectorProvider,
  selectBlockById,
  selectBlockLayout,
  selectBlocks,
  selectBlocksByType,
  selectBlockStyle,
  selectBlockTypeStyleByBlockType,
  selectChangedPortfolio,
} from "@store/selector"
import { Grid, Box, Divider } from "@mui/material"
import Timeline from "@mui/lab/Timeline"
import { convertColumnCountIntoXS, isGroupBlock, getDividerNameByBlockType } from "@store/utils"
import { ColumnCountType, IBlockTypeStyle } from "@type/blockStyle"
import { CAREER_PREVIEW, PREVIEW_CONTAINER } from "@constants/testConstants"
import React, { useEffect } from "react"
import { changePortfolioById, PortfolioPageType } from "@store/root"
import { BlockType, IBlock } from "@type/block"
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
    <Grid data-testid={PREVIEW_CONTAINER} container>
      {blockLayout.map((blockList, index) => {
        const columnCount = blockList.length as ColumnCountType
        const xs = convertColumnCountIntoXS(columnCount)
        return (
          <Grid data-testid="previewBlockContainer" key={index} container spacing={2}>
            {blockList.map(block => {
              if (isGroupBlock(block.blockType)) {
                return (
                  <Grid item xs={xs} key={block.blockType}>
                    <Grid container spacing={2}>
                      {getDividerNameByBlockType(block.blockType) && (
                        <Grid item xs={12}>
                          <Divider sx={{ marginTop: "24px", fontWeight: "bold", fontSize: "1.2rem" }} textAlign="left" component={"div"}>
                            {getDividerNameByBlockType(block.blockType)}
                          </Divider>
                        </Grid>
                      )}
                      <GroupBlock portfolioPageType={portfolioPageType} blockType={block.blockType} />
                    </Grid>
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

  if (blockType === "Career" && blockStyle.layoutType === "default" && blockStyle.columnCount === 1) {
    return (
      <Box data-testid={CAREER_PREVIEW} sx={{ p: 1 }}>
        <Grid justifyContent="flex-start" container>
          <Grid item xs={12} sx={{ paddingTop: 0 }}>
            <Timeline sx={{ marginY: 0, paddingY: 0 }}>
              {blocks.map(block => (
                <MemoizedPreview key={block.id} block={block} blockStyle={blockStyle} />
              ))}
            </Timeline>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <>
      {blocks.map(block => (
        <MemoizedPreview key={block.id} block={block} blockStyle={blockStyle} />
      ))}
    </>
  )
}

const Block = ({ blockType, portfolioPageType }: { blockType: BlockType; portfolioPageType: PortfolioPageType }) => {
  const blocks = useSelector(state => selectBlocksByType(state, portfolioPageType, blockType))
  const blockStyle = useSelector(state => selectBlockTypeStyleByBlockType(state, portfolioPageType, blockType))
  const block = blocks[0]
  if (!block) return null
  return <MemoizedPreview key={block.id} block={block} blockStyle={blockStyle} />
}

const PreView = ({ block, blockStyle }: { block: IBlock; blockStyle: IBlockTypeStyle }) => {
  const PreviewComponent = previewProvider[block.type]
  const previewProps = previewSelectorProvider[block.type](block, blockStyle)
  return (
    <Grid key={block.id} item xs={convertColumnCountIntoXS(blockStyle.columnCount)}>
      <PreviewComponent key={block.id} {...previewProps} />
    </Grid>
  )
}

const MemoizedPreview = React.memo(PreView)

export default PreviewContainer
