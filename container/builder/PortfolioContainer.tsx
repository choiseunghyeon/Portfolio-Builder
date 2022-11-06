import React, { useState } from "react"
import { Button, Dialog, DialogTitle, Grid, Box, Typography, Divider, IconButton, Drawer, CssBaseline } from "@mui/material"
import { useSelector } from "react-redux"
import { tabFold } from "@store/selector"
import SetupContainer from "./SetupContainer"
import PreviewContainer from "./PreviewContainer"
import SaveContainer from "./SaveContainer"

function PortfolioContainer() {
  const needTabFold = useSelector(tabFold)
  const setupWidthRatio = needTabFold ? 2 : 4
  const [currentPortfolioId, setCurrentPortfolioId] = useState("kakao_2266193025")
  return (
    <Grid container sx={{ overflow: "hidden" }}>
      <Grid item xs={setupWidthRatio} sx={{ borderRight: 1, borderColor: "divider", height: "calc(100vh - 64px)", overflowY: "auto" }}>
        <SetupContainer />
        <SaveContainer portfolioId={currentPortfolioId} />
      </Grid>
      <Grid item xs={8} sx={{ height: "calc(100vh - 64px)", overflowY: "auto", paddingX: 2 }}>
        {/* dummy data는 순위 높은 데이터 또는 특정 지정 데이터 */}
        <PreviewContainer portfolioId={currentPortfolioId} />
      </Grid>
    </Grid>
  )
}

export default PortfolioContainer
