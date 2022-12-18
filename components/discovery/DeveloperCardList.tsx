import React from "react"
import { Grid, Chip, Stack, IconButton, CardContent, Typography, Avatar, Card } from "@mui/material"
import IconComponent, { Icons } from "@components/common/IconComponent"
import DeveloperCard, { IDeveloperCard } from "./DeveloperCard"

interface IDeveloperCardList {
  cardList: IDeveloperCard[]
}
function DeveloperCardList({ cardList }: IDeveloperCardList) {
  return (
    <Grid container spacing={1} justifyContent={"center"} alignItems={"center"}>
      {cardList.map((card, index) => (
        <Grid key={index} item xs={3}>
          <DeveloperCard {...card} />
        </Grid>
      ))}
    </Grid>
  )
}

export default DeveloperCardList
