import * as React from "react"
import { useTheme } from "@mui/material/styles"
import MobileStepper from "@mui/material/MobileStepper"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import { Box, Grid, IconButton } from "@mui/material"
import IconComponent from "./IconComponent"

interface IPagination {
  children?: React.ReactChildren
  currentPage: number
  totalPage: number
  handleNext: any
  handleBack: any
}

export default function Pagination({ children, currentPage, totalPage, handleNext, handleBack }: IPagination) {
  const canGoBack = currentPage - 1 >= 1
  const canGoNext = currentPage + 1 <= totalPage

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item>
        <IconButton onClick={handleBack} color="primary" disabled={!canGoBack}>
          <IconComponent icon={"ArrowBack"} />
        </IconButton>
      </Grid>
      <Grid item>
        <Grid container justifyContent={"space-around"}>
          <Button variant="contained" startIcon={<IconComponent icon={"Create"} />}>
            New Draft
          </Button>
          <Box component="span" sx={{ p: 1 }}></Box>
          <Button variant="outlined" startIcon={<IconComponent icon={"ChatBubble"} />}>
            View All
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={handleNext} color="primary" disabled={!canGoNext}>
          <IconComponent icon={"ArrowForward"} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
