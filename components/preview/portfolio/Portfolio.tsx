import { Grid, Divider, Typography, Theme, Box } from "@mui/material"
import { splitMultiLineText } from "@store/utils"
import { PORTFOLIO_CONTENT, PORTFOLIO_LINK, PORTFOLIO_MEDIA, PORTFOLIO_PREVIEW, PORTFOLIO_TITLE } from "@constants/testConstants"
import { IBaseProps } from "@type/preview"
import React from "react"

export interface IPortfolioProps extends IBaseProps {
  mediaSrc: string
  title: string
  content: string
  link: string
}
const Portfolio = ({ mediaSrc, title, content, link, attributes }: IPortfolioProps) => {
  return (
    <Box data-testid={PORTFOLIO_PREVIEW} sx={{ wordBreak: "break-all" }}>
      <Grid container spacing={1}>
        <Grid justifyContent={"center"} container item xs={12}>
          <img
            data-testid={PORTFOLIO_MEDIA}
            src={mediaSrc}
            style={{
              height: "100%",
              width: "100%",
              maxHeight: "360px",
              maxWidth: "360px",
            }}
            alt="media"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" component="h3" gutterBottom data-testid={PORTFOLIO_TITLE}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary" data-testid={PORTFOLIO_CONTENT}>
            {content && splitMultiLineText(content).map((text, index) => <div key={index}>{text}</div>)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="div" fontSize={"0.8rem"} data-testid={PORTFOLIO_LINK}>
            <a href="link">{link}</a>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default React.memo(Portfolio)
