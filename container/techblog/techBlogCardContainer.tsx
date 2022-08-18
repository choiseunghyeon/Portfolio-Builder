import TechBlogCard from "@components/common/TechBlogCard"
import { Button, Chip, Grid, Typography } from "@mui/material"
import React, { useState } from "react"
import AllTechBlogCardContainer from "./AllTechBlogCardContainer"
import FavoriteTechBlogCardContainer from "./FavoriteTechBlogCardContainer"

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

function TechBlogCardContainer() {
  const [techblog, setTechBlog] = useState<"favorite" | "all">("favorite")
  return (
    <Grid container sx={{ marginBottom: 2 }}>
      <Grid item xs={12} sx={{ textAlign: "end", marginBottom: 2 }}>
        <Chip
          label="Favorite"
          variant={techblog === "favorite" ? "filled" : "outlined"}
          color={techblog === "favorite" ? "primary" : "default"}
          onClick={() => {
            setTechBlog("favorite")
          }}
        />
        <Chip
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
