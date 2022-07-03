import { Grid, Divider, Typography, Theme, Box } from "@mui/material"
import { splitMultiLineText } from "@store/utils"
import { PORTFOLIO_PREVIEW } from "@constants/testConstants"
import { IBaseProps } from "@type/preview"

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
          <Typography variant="h5" component="h3" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="textSecondary">{content && splitMultiLineText(content).map((text, index) => <div key={index}>{text}</div>)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component="div" fontSize={"0.8rem"}>
            <a href="link">{link}</a>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Portfolio
