import { Box, Typography, Toolbar, CssBaseline, Grid, Stack } from "@mui/material"
import CareerSubCard from "./CareerSubCard"
import TechBlogHeader from "./TechBlogHeader"
import Navigation from "./Navigation"
import CommunitySubCard from "./CommunitySubCard"
import Title from "./Title"
import TechBlogCardContainer from "@container/techblog/TechBlogCardContainerTemp"
import { ActivatablePageType } from "@type/common"

interface IPageLayout {
  activePageId: ActivatablePageType
}
function PageLayout({ activePageId }: IPageLayout) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TechBlogHeader />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Grid container sx={{ overflow: "hidden" }}>
          {/* Navigation 영역 */}
          <Grid item xs={2} sx={{ backgroundColor: "black", color: "white", borderTopRightRadius: "55px 65px", height: "calc(100vh - 64px)", padding: 2 }}>
            <Navigation activePageId={activePageId} />
          </Grid>
          {/* Main 영역 */}
          <Grid item xs={7} sx={{ overflowY: "auto", height: "calc(100vh - 64px)", padding: 2 }}>
            <Typography paragraph>PPB는 기술블로그를 꾸준히 운영하는 기업이 개발자가 성장하기 좋은 개발 문화를 가진 공간이라고 믿어요.</Typography>
            <Stack spacing={2}>
              <Title title="Tech-blog" subTitle="official" />
              <TechBlogCardContainer />
            </Stack>
          </Grid>

          {/* Side 영역 */}
          <Grid item xs={3} sx={{ height: "calc(100vh - 64px)", padding: 2 }}>
            <Grid container direction="column" columns={16} sx={{ height: "100%" }}>
              <Grid item xs={6} sx={{ border: "1px solid black", padding: 1 }}>
                <CareerSubCard />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={9} sx={{ border: "1px solid black", padding: 1 }}>
                <CommunitySubCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default PageLayout
