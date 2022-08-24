import * as React from "react"
import { Button, Grid, Menu, MenuItem, Stack, IconButton, CardContent, CardActions, Typography, Avatar, Card } from "@mui/material"
import IconComponent from "./IconComponent"
import { ITechBlogResponse } from "@type/response"

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
  recentPostUrl,
  clickCount,
  onClickContent,
  onClickFavorite,
}: ITechBlogCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickCard = React.useCallback(() => {
    onClickContent(id)
  }, [])

  const onClickFav = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // event 전파로 인한 onClickCard event 발생 막기
    event.stopPropagation()
    onClickFavorite(id)
  }, [])

  return (
    <Card>
      <CardContent sx={{ textAlign: "center", height: "190px", padding: 1, backgroundColor: "#f7f7f7", "&:hover": { cursor: "pointer" } }} onClick={onClickCard}>
        <Typography sx={{ textAlign: "left" }} variant="h6" component="div">
          <IconButton onClick={onClickFav} color="primary" aria-label="add to shopping cart">
            <IconComponent icon={favorite ? "Star" : "StarBorder"} />
          </IconButton>
        </Typography>
        <Stack direction={"row"} sx={{ justifyContent: "center" }}>
          <Avatar src={iconUrl} />
        </Stack>
        <Typography variant="h6" component="div">
          {companyName}
        </Typography>
        {serviceName && (
          <Typography variant="h6" component="div">
            {serviceName}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              최근 업로드 날짜로부터
            </Typography>
            <Typography>{dateFromLastUpdate}일 지남</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClick} color="primary" aria-label="add to shopping cart">
              <IconComponent icon={"MoreHoriz"} />
            </IconButton>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>
                <a href={companyInformationUrl} target="blank">
                  스타트업 정보 바로가기
                </a>
              </MenuItem>
              <MenuItem>
                <a href={recentPostUrl} target="blank">
                  가장 최신 글 바로가기
                </a>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
