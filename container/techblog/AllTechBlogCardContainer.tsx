import IconComponent from "@components/common/IconComponent"
import TechBlogCard from "@components/common/TechBlogCard"
import { updateTechBlogClicCount, updateTechBlogFavorite } from "@lib/api/techblog"
import { useTechBlogCardList } from "@lib/hooks/query"
import { Button, Chip, Grid, IconButton, Typography } from "@mui/material"
import React, { useState } from "react"

function AllTechBlogCardContainer() {
  const techBlogList = useTechBlogCardList()

  const onToggleFavorite = (id: string) => {
    const targetTechBlog = techBlogList?.find(techblog => techblog.id === id)
    if (!targetTechBlog) return
    updateTechBlogFavorite(targetTechBlog.id, !targetTechBlog.favorite)
  }

  const onClickContent = (id: string) => {
    const targetTechBlog = techBlogList?.find(techblog => techblog.id === id)
    if (!targetTechBlog) return
    updateTechBlogClicCount(id)
  }

  const onNextPage = () => {}

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
              <TechBlogCard {...cardData} onClickContent={onClickContent} onClickFavorite={onToggleFavorite} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <IconButton onClick={onNextPage} size="large" edge="start" color="inherit">
              <IconComponent icon="ArrowDropDown" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AllTechBlogCardContainer
