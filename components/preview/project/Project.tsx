import { Grid, Divider, Typography, Theme, Box } from "@mui/material";
import { IBlockStyle } from "@type/block";
import { IBaseProps } from "@type/preview";

export interface IProjectProps extends IBaseProps {
  name: string;
  organigation: string;
  term: string;
  description: string;
  skills: string;
}
function splitMultiLineText(multiLineText: string): string[] {
  return multiLineText.split("\n");
}
const Project = ({ name = "", organigation = "", term = "", description = "", skills = "", attributes }: IProjectProps) => {
  return (
    <Box sx={{ textAlign: "left", p: 1 }}>
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
            {description && splitMultiLineText(description).map((text, index) => <div key={index}>{text}</div>)}
            {/* {description} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            <ul>{skills && splitMultiLineText(skills).map((text, index) => <li key={index}>{text}</li>)}</ul>
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
};

export default Project;
