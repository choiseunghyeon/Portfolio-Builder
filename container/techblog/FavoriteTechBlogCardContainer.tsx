import IconComponent from "@components/common/IconComponent"
import TechBlogCard from "@components/common/TechBlogCard"
import { updateTechBlogClicCount, updateTechBlogFavorite } from "@lib/api/techblog"
import { useFavoriteTechBlogCardList, useTechBlogCardList } from "@lib/hooks/query"
import { Button, Chip, Grid, IconButton, Typography } from "@mui/material"
import React, { useState } from "react"

const techBlogCardData = [
  {
    companyName: "비바리퍼블리카",
    serviceName: "토스",
    favorite: true,
    days: 3,
  },
  {
    companyName: "카카오",
    favorite: false,
    days: 31,
  },
]

function FavoriteTechBlogCardContainer() {
  const techBlogList = useFavoriteTechBlogCardList()
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
              Favorite ({techBlogList.length})
            </Typography>
          </Grid>
          <Grid item>*최신순으로 기본 정렬</Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {techBlogList.map(cardData => (
            <Grid key={cardData.companyName} item xs={4}>
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

export default FavoriteTechBlogCardContainer
