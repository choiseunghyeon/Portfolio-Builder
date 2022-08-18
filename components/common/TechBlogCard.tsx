import * as React from "react"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Button, Grid, Menu, MenuItem, Stack } from "@mui/material"
import IconComponent from "./IconComponent"
import { ITechBlogResponse } from "@type/response"

interface ITechBlogCardProps extends ITechBlogResponse {}

export default function TechBlogCard({ companyName, serviceName, dateFromLastUpdate, favorite, iconUrl, companyInformationUrl, recentPostUrl, clickCount }: ITechBlogCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: "center", height: "190px", padding: 1, backgroundColor: "#f7f7f7", justifyContent: "center" }}>
        <Typography sx={{ textAlign: "left" }} variant="h6" component="div">
          <IconButton onClick={() => {}} color="primary" aria-label="add to shopping cart">
            <IconComponent icon={favorite ? "Star" : "StarBorder"} />
          </IconButton>
        </Typography>
        <Stack direction={"row"}>
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
