import * as React from "react"
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@mui/material"
import { Favorite, Share } from "@mui/icons-material"

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
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
  )
}
