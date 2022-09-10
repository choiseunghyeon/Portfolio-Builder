import TechBlogCard from "@components/common/TechBlogCard"
import {
  ALL_TECH_BLOG_BUTTON,
  FAVORITE_TECH_BLOG_BUTTON,
  ORDER_BY_CLICK_TECH_BLOG_BUTTON,
  ORDER_BY_LATEST_TECH_BLOG_BUTTON,
  ORDER_BY_STARS_TECH_BLOG_BUTTON,
  TECH_BLOG_CARD_CONTAINER,
  TECH_BLOG_CARD_CONTAINER_TITLE,
} from "@constants/testConstants"
import { fetchTechBlog, updateTechBlogClicCount, updateTechBlogFavorite } from "@lib/api/techblog"
import { useTechBlogCardClickCountMutation, useTechBlogCardFavoriteMutation, useTechBlogCardList } from "@lib/hooks/query"
import { Chip, Grid, Button, IconButton, Typography } from "@mui/material"
import { SortByType } from "@type/api"
import axios from "axios"
import React, { useState } from "react"
import { useMutation, useQueryClient } from "react-query"

function TechBlogCardContainer() {
  const [techblog, setTechBlog] = useState<"favorite" | "all">("all")
  const [sortBy, setSortBy] = useState<SortByType>("latest")
  const techBlogList = useTechBlogCardList(sortBy)
  const techBlogCardFavoriteMutation = useTechBlogCardFavoriteMutation(sortBy)
  const techBlogCardClickCountMutation = useTechBlogCardClickCountMutation(sortBy)

  const onToggleFavorite = (id: string) => {
    const targetTechBlog = techBlogList?.find(techblog => techblog.id === id)
    if (!targetTechBlog) return
    techBlogCardFavoriteMutation.mutate({ id: targetTechBlog.id, favorite: !targetTechBlog.favorite })
    // updateTechBlogFavorite(targetTechBlog.id, !targetTechBlog.favorite)
  }

  const onClickContent = (id: string) => {
    const targetTechBlog = techBlogList?.find(techblog => techblog.id === id)
    if (!targetTechBlog) return
    techBlogCardClickCountMutation.mutate({ id: targetTechBlog.id })
    // updateTechBlogClicCount(id)
  }

  if (!techBlogList) return null

  return (
    <Grid container sx={{ marginBottom: 2 }} data-testid={TECH_BLOG_CARD_CONTAINER}>
      <Grid item xs={12} sx={{ textAlign: "end", marginBottom: 2 }}>
        <Chip
          data-active={techblog === "favorite" ? "true" : "false"}
          data-testid={FAVORITE_TECH_BLOG_BUTTON}
          label="Favorite"
          variant={techblog === "favorite" ? "filled" : "outlined"}
          color={techblog === "favorite" ? "primary" : "default"}
          onClick={() => {
            setTechBlog("favorite")
            setSortBy("favorite")
          }}
        />
        <Chip
          data-active={techblog === "all" ? "true" : "false"}
          data-testid={ALL_TECH_BLOG_BUTTON}
          label="All"
          variant={techblog === "all" ? "filled" : "outlined"}
          color={techblog === "all" ? "primary" : "default"}
          onClick={() => {
            setTechBlog("all")
            setSortBy("latest")
          }}
          sx={{ marginLeft: 1 }}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 1.2 }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          {techblog === "all" ? <AllTechBlog cardCount={techBlogList.length} sortBy={sortBy} handleSortBy={setSortBy} /> : <FavoriteTechBlog cardCount={techBlogList.length} />}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {techBlogList.map((cardData, index) => (
            <Grid key={cardData.id} item xs={4}>
              <TechBlogCard {...cardData} onClickContent={onClickContent} onClickFavorite={onToggleFavorite} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TechBlogCardContainer

function AllTechBlog({ cardCount, handleSortBy, sortBy }) {
  return (
    <>
      <Grid item>
        <Typography
          data-testid={TECH_BLOG_CARD_CONTAINER_TITLE}
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
          }}>
          All ({cardCount})
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="text"
          onClick={() => {
            handleSortBy("latest")
          }}
          data-testid={ORDER_BY_LATEST_TECH_BLOG_BUTTON}
          data-active={sortBy === "latest" ? "true" : "false"}>
          최신순
        </Button>{" "}
        |
        <Button
          variant="text"
          onClick={() => {
            handleSortBy("stars")
          }}
          data-testid={ORDER_BY_STARS_TECH_BLOG_BUTTON}
          data-active={sortBy === "stars" ? "true" : "false"}>
          별점순
        </Button>{" "}
        |
        <Button
          variant="text"
          onClick={() => {
            handleSortBy("click")
          }}
          data-testid={ORDER_BY_CLICK_TECH_BLOG_BUTTON}
          data-active={sortBy === "click" ? "true" : "false"}>
          클릭순
        </Button>
      </Grid>
    </>
  )
}

function FavoriteTechBlog({ cardCount }) {
  return (
    <>
      <Grid item>
        <Typography
          data-testid={TECH_BLOG_CARD_CONTAINER_TITLE}
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            letterSpacing: ".3rem",
            textDecoration: "none",
          }}>
          Favorite ({cardCount})
        </Typography>
      </Grid>
      <Grid item>*최신순으로 기본 정렬</Grid>
    </>
  )
}
