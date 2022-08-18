import TechBlogCard from "@components/common/TechBlogCard"
import { useTechBlogCardList } from "@lib/hooks/query"
import { Button, Chip, Grid, Typography } from "@mui/material"
import React, { useState } from "react"

function AllTechBlogCardContainer() {
  const techBlogList = useTechBlogCardList()

  if (!techBlogList) return null
  return (
    <>
      <Grid item xs={12} sx={{ marginBottom: 1.2 }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}>
              All ({techBlogList.length})
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="text">최신순</Button> |<Button variant="text">별점순</Button> |<Button variant="text">클릭순</Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {techBlogList.map((cardData, index) => (
            <Grid key={index} item xs={4}>
              <TechBlogCard {...cardData} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default AllTechBlogCardContainer
