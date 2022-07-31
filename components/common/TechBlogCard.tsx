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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function TechBlogCard() {
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
      <CardMedia component="img" height="194" image="https://image.shutterstock.com/image-photo/osaka-japan-jun e-24-2017-600w-669537982.jpg" alt="Paella dish" />
      <CardContent sx={{ padding: "12px !important" }}>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Typography variant="body2" color="text.secondary">
              최근 업로드 날짜로부터
            </Typography>
            <Typography>1일 지남</Typography>
          </Grid>
          <Grid item>
            <span>
              <IconComponent icon={"StarBorder"} />
            </span>
            <span onClick={handleClick}>
              <IconComponent icon={"MoreHoriz"} />
            </span>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Profile</MenuItem>
              {/* <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem> */}
            </Menu>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
