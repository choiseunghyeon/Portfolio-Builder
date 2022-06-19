import * as React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"

interface IUserCardProps {}
export default function UserCard({}: IUserCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image="https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg" alt="Paella dish" />
      <CardContent>
        <Typography variant="h5" component="div">
          최승현
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Front End Developer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          안녕하세요 프론트엔드 개발자 최승현입니다.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
