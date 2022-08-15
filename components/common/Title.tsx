import { Breadcrumbs, Typography } from "@mui/material"
import React from "react"

interface ITitleProps {
  title: string
  subTitle: string
}
function Title({ title, subTitle }: ITitleProps) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="h6" sx={{ color: "red", fontWeight: "bold" }}>
        {subTitle}
      </Typography>
    </Breadcrumbs>
  )
}

export default Title
