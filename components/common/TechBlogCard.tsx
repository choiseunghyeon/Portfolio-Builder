import { Button, Grid, Menu, MenuItem, Stack, IconButton, CardContent, CardActions, Typography, Avatar, Card } from "@mui/material"
import IconComponent from "./IconComponent"
import { ITechBlogResponse } from "@type/response"
import { useState, useCallback, MouseEvent } from "react"
import {
  TECH_BLOG_CARD,
  TECH_BLOG_CARD_COMPANY_INFO_LINK,
  TECH_BLOG_CARD_COMPANY_NAME,
  TECH_BLOG_CARD_COMPANY_VIDEO_LINK,
  TECH_BLOG_CARD_CONTENT,
  TECH_BLOG_CARD_DESCRIPTION,
  TECH_BLOG_CARD_FAVORITE,
  TECH_BLOG_CARD_MENU,
  TECH_BLOG_CARD_SERVICE_NAME,
} from "@constants/testConstants"
import { openWindow } from "@lib/util/native"

interface ITechBlogCardProps extends ITechBlogResponse {
  onClickContent: (event: any) => void
  onClickFavorite: (event: any) => void
}

export default function TechBlogCard({
  id,
  companyName,
  serviceName,
  dateFromLastUpdate,
  favorite,
  iconUrl,
  companyInformationUrl,
  techBlogUrl,
  videoUrl,
  clickCount,
  onClickContent,
  onClickFavorite,
}: ITechBlogCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickCard = useCallback(() => {
    openWindow(techBlogUrl)
    onClickContent(id)
  }, [id])

  const onClickFav = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      // event 전파로 인한 onClickCard event 발생 막기
      event.stopPropagation()
      onClickFavorite(id)
    },
    [id]
  )

  return (
    <Card data-testid={TECH_BLOG_CARD}>
      <CardContent data-testid={TECH_BLOG_CARD_CONTENT} sx={{ textAlign: "center", height: "190px", padding: 1, backgroundColor: "#f7f7f7", "&:hover": { cursor: "pointer" } }} onClick={onClickCard}>
        <Typography sx={{ textAlign: "left" }} variant="h6" component="div">
          <IconButton data-active={favorite ? "true" : "false"} data-testid={TECH_BLOG_CARD_FAVORITE} onClick={onClickFav} color="primary" aria-label="add to shopping cart">
            <IconComponent icon={favorite ? "Star" : "StarBorder"} />
          </IconButton>
        </Typography>
        <Stack direction={"row"} sx={{ justifyContent: "center" }}>
          <Avatar src={iconUrl} />
        </Stack>
        <Typography variant="h6" component="div" data-testid={TECH_BLOG_CARD_COMPANY_NAME}>
          {companyName}
        </Typography>
        {serviceName && (
          <Typography variant="h6" component="div" data-testid={TECH_BLOG_CARD_SERVICE_NAME}>
            {serviceName}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item data-testid={TECH_BLOG_CARD_DESCRIPTION}>
            <Typography variant="body2" color="text.secondary">
              최근 업로드 날짜로부터
            </Typography>
            <Typography>{dateFromLastUpdate}일 지남</Typography>
          </Grid>
          <Grid item>
            <IconButton data-testid={TECH_BLOG_CARD_MENU} onClick={handleClick} color="primary" aria-label="add to shopping cart">
              <IconComponent icon={"MoreHoriz"} />
            </IconButton>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem data-testid={TECH_BLOG_CARD_COMPANY_INFO_LINK}>
                <a href={companyInformationUrl} target="blank">
                  스타트업 정보 바로가기(THE VC)
                </a>
              </MenuItem>
              <MenuItem data-testid={TECH_BLOG_CARD_COMPANY_VIDEO_LINK}>
                <a href={videoUrl} target="blank">
                  스타트업 영상(YouTue)
                </a>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
