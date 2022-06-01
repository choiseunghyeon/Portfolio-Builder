import { Grid, Divider, Typography, Theme, Box } from "@mui/material";
import { splitMultiLineText } from "@store/utils";
import { IBlockStyle } from "@type/block";
import { IBaseProps } from "@type/preview";

export interface ICareerProps extends IBaseProps {
  organigation: string;
  role: string;
  term: string;
  description: string;
}
const Career = ({ organigation, role, term, description, attributes }: ICareerProps) => {
  return (
    <Box sx={{ p: 1 }}>
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
            <ul>{description && splitMultiLineText(description).map((text, index) => <li key={index}>{text}</li>)}</ul>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Career;
