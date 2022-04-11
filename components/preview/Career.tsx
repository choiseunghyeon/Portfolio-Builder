import { Grid, Divider, Typography, Theme, Box } from "@mui/material";
import IconComponent from "../common/IconComponent";

export interface ICareerProps {
  title: string;
  subtitle: string;
  detail: string;
}
const Career = ({ title, subtitle, detail }: ICareerProps) => {
  return (
    <Box sx={{ margin: "24px 0 16px 0" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography color="textSecondary" gutterBottom>
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3">
            {detail}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Career;
