import React from "react"
import { IBlock } from "@type/block"
import { previewProvider } from "./preview/provider"
import { previewSelectorProvider } from "@store/selector"
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { IBlockTypeStyle } from "@type/blockStyle"
import { DEFINE_COLUMN_COUNT, DEFINE_COLUMN_COUNT_SELECT, DEFINE_LAYOUT_TYPE } from "@constants/testConstants"

interface IStylePanel extends IBlockTypeStyle {
  block: IBlock
  changableColumnCount: number[]
  changableLayoutTypes: string[]
  handleBlockStyleType: Function
}

// 드래그 요소 생성
const LayoutPanel = ({ block, layoutType, changableLayoutTypes, columnCount, changableColumnCount, handleBlockStyleType }: IStylePanel) => {
  const currentStyleType = layoutType
  const PreviewComponent = previewProvider[block.type]
  const previewProps = previewSelectorProvider[block.type](block, true)

  const handleChange = (event: SelectChangeEvent) => {
    const newColumnCount = parseInt(event.target.value)

    if (newColumnCount > 4) return
    handleBlockStyleType({ columnCount: newColumnCount })
  }

  return (
    <>
      <Grid container spacing={1}>
        {changableColumnCount.length > 0 && (
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">열 정의</InputLabel>
              <Select
                data-testid={DEFINE_COLUMN_COUNT_SELECT}
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={`${columnCount}`}
                onChange={handleChange}
                autoWidth
                label="열 정의">
                {changableColumnCount.map((column, index) => (
                  <MenuItem data-testid={DEFINE_COLUMN_COUNT} key={index} value={`${column}`}>
                    {column}열
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {changableLayoutTypes.map((layoutType, index) => {
          const attributes = {
            layoutType: layoutType,
          }
          const isSelectd = layoutType === currentStyleType
          return (
            <>
              <Grid
                data-testid={DEFINE_LAYOUT_TYPE}
                item
                xs={12}
                key={index}
                sx={{ opacity: isSelectd ? 1 : 0.5, ":hover": { opacity: 1 } }}
                onClick={() => handleBlockStyleType({ layoutType: layoutType })}>
                <PreviewComponent key={block.id} {...previewProps} attributes={attributes} />
              </Grid>
            </>
          )
        })}
      </Grid>
    </>
  )
}

export default LayoutPanel
