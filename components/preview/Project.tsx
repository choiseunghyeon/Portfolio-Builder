import { Grid, Divider, Typography, Theme, Box } from "@mui/material";
import IconComponent from "../common/IconComponent";

export interface IProjectProps {
  name: string;
  organigation: string;
  term: string;
  description: string;
  skills: string;
}

const Project = ({ name, organigation, term, description, skills }: IProjectProps) => {
  return (
    <Box sx={{ textAlign: "center", margin: "24px 0 16px 0" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography color="textSecondary" gutterBottom>
            {name}
            {organigation}
            {term}
            {description}
            {skills}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3"></Typography>
        </Grid>
        {/* <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="body1">{content}</Typography>
        </Grid>
        {icons.map((icon, idx) => (
          <Grid item xs={4} key={idx}>
            <IconComponent {...icon} fontSize="1.5rem" />
          </Grid>
        ))} */}
      </Grid>
      <Divider />
    </Box>
  );
};

export default Project;
