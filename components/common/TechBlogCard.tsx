import { Button, Grid, Menu, MenuItem, Stack, IconButton, CardContent, CardActions, Typography, Avatar, Card } from "@mui/material"
import IconComponent from "./IconComponent"
import { ITechBlog, ITechBlogResponse } from "@type/api"
import { useState, useCallback, MouseEvent } from "react"
import {
  TECH_BLOG_CARD,
  TECH_BLOG_CARD_COMPANY_NAME,
  TECH_BLOG_CARD_CONTENT,
  TECH_BLOG_CARD_DESCRIPTION,
  TECH_BLOG_CARD_FAVORITE,
  TECH_BLOG_CARD_MENU,
  TECH_BLOG_CARD_SERVICE_NAME,
} from "@constants/testConstants"
import { openWindow } from "@lib/util/native"
import CardMenu from "./CardMenu"

interface ITechBlogCardProps extends ITechBlog {
  favorite: boolean
  onClickContent: (event: any) => void
  onClickFavorite: (event: any) => void
}

export default function TechBlogCard({
  blogId,
  link,
  logo,
  officialName,
  productName,
  updateDate,
  writeDate,
  favorite,
  // id,
  // companyName,
  // serviceName,
  // dateFromLastUpdate,
  // favorite,
  // iconUrl,
  // companyInformationUrl,
  // techBlogUrl,
  // videoUrl,
  onClickContent,
  onClickFavorite,
}: ITechBlogCardProps) {
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const getDateFromLastUpdate = () => {
    // updateDate 가공해서 몇일 지났는지 알려주기
    return 3
  }
  const showMenu = () => {
    setOpenMenu(true)
  }

  const hideMenu = () => {
    setOpenMenu(false)
  }

  const onClickCard = useCallback(() => {
    openWindow(link)
    onClickContent(blogId)
  }, [blogId])

  const onClickFav = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      // event 전파로 인한 onClickCard event 발생 막기
      event.stopPropagation()
      onClickFavorite(blogId)
    },
    [blogId]
  )

  return (
    <Card data-testid={TECH_BLOG_CARD} sx={{ position: "relative" }}>
      <CardContent data-testid={TECH_BLOG_CARD_CONTENT} sx={{ textAlign: "center", height: "190px", padding: 1, backgroundColor: "#f7f7f7", "&:hover": { cursor: "pointer" } }} onClick={onClickCard}>
        <Typography sx={{ textAlign: "left" }} variant="h6" component="div">
          <IconButton data-active={favorite ? "true" : "false"} data-testid={TECH_BLOG_CARD_FAVORITE} onClick={onClickFav} color="primary" aria-label="add to shopping cart">
            <IconComponent icon={favorite ? "Star" : "StarBorder"} />
          </IconButton>
        </Typography>
        <Stack direction={"row"} sx={{ justifyContent: "center" }}>
          <Avatar src={logo} />
        </Stack>
        <Typography variant="h6" component="div" data-testid={TECH_BLOG_CARD_COMPANY_NAME}>
          {officialName}
        </Typography>
        {productName && (
          <Typography variant="h6" component="div" data-testid={TECH_BLOG_CARD_SERVICE_NAME}>
            {productName}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item data-testid={TECH_BLOG_CARD_DESCRIPTION}>
            <Typography variant="body2" color="text.secondary">
              최근 업로드 날짜로부터
            </Typography>
            <Typography>{getDateFromLastUpdate()}일 지남</Typography>
          </Grid>
          <Grid item>
            <IconButton data-testid={TECH_BLOG_CARD_MENU} onClick={showMenu} color="primary" aria-label="add to shopping cart">
              <IconComponent icon={"MoreHoriz"} />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
      {openMenu && <CardMenu companyInformationUrl={"http://naver.com"} videoUrl={"http://naver.com"} onClose={hideMenu} />}
    </Card>
  )
}
