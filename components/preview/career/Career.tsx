import { Grid, Divider, Typography, Theme, Box } from "@mui/material";

export interface ICareerProps {
  organigation: string;
  role: string;
  term: string;
  description: string;
  styleType: string;
}
const Career = ({ organigation, role, term, description, styleType }: ICareerProps) => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            {organigation}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{role}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="subtitle2">
            {term}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom variant="body1" color={"textSecondary"}>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Career;