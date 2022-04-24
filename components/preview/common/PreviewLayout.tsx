import { Grid, Divider, Typography, Theme, Box } from "@mui/material";

export interface IPreviewLayoutProps {
  // 열 개수 지정
  columnCount: 1 | 2 | 3 | 4;
  infos: any[];
}
const PreviewLayout = ({ columnCount, infos }: IPreviewLayoutProps) => {
  const size = 12 / columnCount;
  return (
    <Box sx={{ margin: "24px 0 16px 0" }}>
      <Grid container spacing={2}>
        {infos.map(info => {
          <Grid item xs={size}></Grid>;
        })}
      </Grid>
    </Box>
  );
};

export default PreviewLayout;
