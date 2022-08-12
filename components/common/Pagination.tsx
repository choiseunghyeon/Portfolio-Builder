import * as React from "react"
import { useTheme } from "@mui/material/styles"
import MobileStepper from "@mui/material/MobileStepper"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import { Box, Grid, IconButton } from "@mui/material"
import IconComponent from "./IconComponent"

interface IPagination {
  children: React.ReactChildren
  handleNext: Function
  handleBack: Function
}

export default function Pagination() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item>
        <IconButton onClick={() => {}} color="primary">
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
        <IconButton onClick={() => {}} color="primary">
          <IconComponent icon={"ArrowForward"} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
