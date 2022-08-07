import TechBlogCard from "@components/common/TechBlogCard"
import { Button, Chip, Grid, Typography } from "@mui/material"
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
      <Grid item xs={12} sx={{ marginBottom: 1.2 }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          {techblog === "favorite" ? (
            <>
              <Grid item>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    textDecoration: "none",
                  }}>
                  Favorite (10)
                </Typography>
              </Grid>
              <Grid item>*최신순으로 기본 정렬</Grid>
            </>
          ) : (
            <>
              <Grid item>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    textDecoration: "none",
                  }}>
                  All (50)
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="text">최신순</Button> |<Button variant="text">별점순</Button> |<Button variant="text">클릭순</Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={1}>
          {techBlogCardData.map(cardData => (
            <Grid key={cardData.companyName} item xs={4}>
              <TechBlogCard {...cardData} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default TechBlogCardContainer
