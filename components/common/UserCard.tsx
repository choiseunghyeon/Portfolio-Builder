import * as React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"

import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"

interface IUserCardProps {
  imageSrc: string
  name: string
  description: string
  subDescription: string
}
export default function UserCard({ imageSrc, name, description, subDescription }: IUserCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image={imageSrc} alt="Paella dish" />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subDescription}
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
