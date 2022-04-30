import { Grid, Divider, Typography, Theme, Box } from "@mui/material";
import { IBlockStyle } from "@type/block";

export interface IProfileProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  blockStyle: IBlockStyle;
}
const Profile = (props: IProfileProps) => {
  switch (props.blockStyle.styleType) {
    case "default":
      return <DefaultProfile {...props} />;
    case "second":
      return <SecondProfile {...props} />;
    default:
      return null;
  }
};

export default Profile;

function DefaultProfile({ title, subtitle, imageSrc }: IProfileProps) {
  return (
    <Box sx={{ textAlign: "center", margin: "24px 0 16px 0" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <img
            src={imageSrc}
            style={{
              maxWidth: "120px",
              borderRadius: "50%",
            }}
            alt="person"
          />
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3">
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}

function SecondProfile({ title, subtitle, imageSrc }: IProfileProps) {
  return (
    <Box sx={{ textAlign: "center", margin: "24px 0 16px 0" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <img
            src={imageSrc}
            style={{
              maxWidth: "120px",
              borderRadius: "50%",
            }}
            alt="person"
          />
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
    </Box>
  );
}
