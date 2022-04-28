import { Grid, Divider, Typography, Theme, Box } from "@mui/material";

export interface IProjectProps {
  name: string;
  organigation: string;
  term: string;
  description: string;
  skills: string;
  styleType: string;
}

const Project = ({ name, organigation, term, description, skills, styleType }: IProjectProps) => {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography sx={{ fontWeight: "bold" }} variant="h6">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{organigation}</Typography>
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
        <Grid item xs={12}>
          <Typography variant="body2">{skills}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Project;
