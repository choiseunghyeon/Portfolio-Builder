import { TECH_BLOG_CARD_COMPANY_INFO_LINK, TECH_BLOG_CARD_COMPANY_VIDEO_LINK } from "@constants/testConstants"
import { Box, Button, Grid, IconButton, Typography } from "@mui/material"
import React from "react"
import IconComponent from "./IconComponent"

interface ICardMenuProps {
  companyInformationUrl: string
  videoUrl: string
  onClose: () => void
}

function CardMenu({ companyInformationUrl, videoUrl, onClose }: ICardMenuProps) {
  return (
    <Box sx={{ backgroundColor: "black", opacity: "0.7", width: "100%", position: "absolute", bottom: 0 }}>
      <Grid container justifyContent={"center"} alignItems={"center"} spacing={2} sx={{ padding: 1.5 }}>
        <Grid item>
          <Button data-testid={TECH_BLOG_CARD_COMPANY_INFO_LINK} href={companyInformationUrl} target="blank" variant="outlined" sx={{ color: "white", borderColor: "white" }}>
            <Typography variant="button" display="block" gutterBottom>
              스타트업 정보
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              (THE VC)
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button data-testid={TECH_BLOG_CARD_COMPANY_VIDEO_LINK} href={videoUrl} target="blank" variant="outlined" sx={{ color: "white", borderColor: "white" }}>
            <Typography variant="button" display="block" gutterBottom>
              스타트업 영상
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              (Youtube)
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "right" }}>
          <IconButton sx={{ color: "white" }} onClick={onClose}>
            <IconComponent icon="Cancel" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CardMenu
