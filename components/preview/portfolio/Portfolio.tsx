import { Grid, Divider, Typography, Theme, Box } from "@mui/material";
import { splitMultiLineText } from "@store/utils";
import { IBlockStyle } from "@type/block";
import { IBaseProps } from "@type/preview";

export interface IPortfolioProps extends IBaseProps {
  mediaSrc: string;
  title: string;
  content: string;
  link: string;
}
const Portfolio = ({ mediaSrc, title, content, link, attributes }: IPortfolioProps) => {
  return (
    <Box sx={{ textAlign: "center", margin: "24px 0 16px 0" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <img
            src={mediaSrc}
            style={{
              maxWidth: "120px",
              borderRadius: "50%",
            }}
            alt="media"
          />
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3">
            {content && splitMultiLineText(content).map((text, index) => <div key={index}>{text}</div>)}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3">
            {link && splitMultiLineText(link).map((text, index) => <div key={index}>{text}</div>)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Portfolio;
