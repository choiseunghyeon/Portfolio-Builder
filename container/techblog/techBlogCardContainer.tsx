import { ALL_TECH_BLOG_BUTTON, FAVORITE_TECH_BLOG_BUTTON, TECH_BLOG_CARD_CONTAINER } from "@constants/testConstants"
import { Chip, Grid } from "@mui/material"
import React, { useState } from "react"
import AllTechBlogCardContainer from "./AllTechBlogCardContainer"
import FavoriteTechBlogCardContainer from "./FavoriteTechBlogCardContainer"

function TechBlogCardContainer() {
  const [techblog, setTechBlog] = useState<"favorite" | "all">("favorite")
  return (
    <Grid container sx={{ marginBottom: 2 }} data-testid={TECH_BLOG_CARD_CONTAINER}>
      <Grid item xs={12} sx={{ textAlign: "end", marginBottom: 2 }}>
        <Chip
          className={techblog === "favorite" ? "active" : ""}
          data-testid={FAVORITE_TECH_BLOG_BUTTON}
          label="Favorite"
          variant={techblog === "favorite" ? "filled" : "outlined"}
          color={techblog === "favorite" ? "primary" : "default"}
          onClick={() => {
            setTechBlog("favorite")
          }}
        />
        <Chip
          className={techblog === "all" ? "active" : ""}
          data-testid={ALL_TECH_BLOG_BUTTON}
          label="All"
          variant={techblog === "all" ? "filled" : "outlined"}
          color={techblog === "all" ? "primary" : "default"}
          onClick={() => {
            setTechBlog("all")
          }}
          sx={{ marginLeft: 1 }}
        />
      </Grid>
      {techblog === "all" ? <AllTechBlogCardContainer /> : <FavoriteTechBlogCardContainer />}
    </Grid>
  )
}

export default TechBlogCardContainer
