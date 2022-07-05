import { previewProvider } from "@components/preview/provider"
import { useDispatch, useSelector } from "react-redux"
import { previewSelectorProvider, selectBlockById, selectBlockLayout, selectBlocks, selectBlocksByType, selectBlockStyle, selectBlockTypeStyleByBlockType } from "@store/selector"
import { Grid } from "@mui/material"
import Timeline from "@mui/lab/Timeline"
import { convertColumnCountIntoXS, isGroupBlock, getDividerNameByBlockType } from "../store/utils"
import { ColumnCountType } from "@type/blockStyle"
import { CAREER_PREVIEW, PREVIEW_CONTAINER } from "@constants/testConstants"
import { useEffect } from "react"
import { changePortfolioById, PortfolioPageType } from "@store/root"
import { BlockType } from "@type/block"
import { usePortfolio } from "@lib/hooks/query"
import { Box } from "@mui/material"
import { Divider } from "@mui/material"
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
    <Grid data-testid={PREVIEW_CONTAINER} container sx={{ padding: "16px" }}>
      {blockLayout.map((blockList, index) => {
        const columnCount = blockList.length as ColumnCountType
        const xs = convertColumnCountIntoXS(columnCount)
        return (
          <Grid data-testid="previewBlockContainer" key={index} container spacing={1.5}>
            {blockList.map(block => {
              if (isGroupBlock(block.blockType)) {
                return (
                  <Grid container item xs={xs} key={block.blockType} spacing={1.5}>
                    <Grid item xs={12}>
                      <Divider sx={{ marginTop: "24px", fontWeight: "bold", fontSize: "1.2rem" }} textAlign="left">
                        {getDividerNameByBlockType(block.blockType)}
                      </Divider>
                    </Grid>
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

  if (blockType === "Career" && blockStyle.layoutType === "default" && blockStyle.columnCount === "1") {
    return (
      <Box data-testid={CAREER_PREVIEW} sx={{ p: 1 }}>
        <Grid justifyContent="flex-start" container>
          <Grid item xs={12}>
            <Timeline sx={{ marginY: 0, paddingY: 0 }}>
              {blocks.map(block => {
                const PreviewComponent = previewProvider[block.type]
                const previewProps = previewSelectorProvider[block.type](block, blockStyle)
                return <PreviewComponent key={block.id} {...previewProps} />
              })}
            </Timeline>
          </Grid>
        </Grid>
      </Box>
    )
  }

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
