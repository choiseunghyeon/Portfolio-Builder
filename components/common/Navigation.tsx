import { NAVIGATION_CONTAINER } from "@constants/testConstants"
import LoginContainer from "@container/common/LoginContainer"
import { isLoggedIn } from "@lib/util/common"
import { Button, Grid } from "@mui/material"
import { ActivatablePageType } from "@type/common"
import { useState } from "react"
import IconComponent from "./IconComponent"
import LoginDialog from "./LoginDialog"
import LoginTypography from "./LoginTypography"

interface INavigationProps {
  activePageId: ActivatablePageType
}

function getPageUriByPageId(pageId: ActivatablePageType): string {
  switch (pageId) {
    case "tech-blog":
      return "/techblog"
    default:
      return "/"
  }
}

const navigatablePage: { text: string; icon: string; pageId: ActivatablePageType }[] = [
  { text: "Home", icon: "Home", pageId: "home" },
  { text: "Discovery", icon: "Code", pageId: "discovery" },
  { text: "Tech-blog", icon: "Lightbulb", pageId: "tech-blog" },
  { text: "Career", icon: "Timeline", pageId: "career" },
  { text: "Community", icon: "Language", pageId: "community" },
]
function Navigation({ activePageId }: INavigationProps) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Grid data-testid={NAVIGATION_CONTAINER} container direction="column" justifyContent="space-between" sx={{ height: "100% !important" }}>
      <Grid item>
        <Grid container spacing={1}>
          {navigatablePage.map(({ text, icon, pageId }, index) => (
            <Grid key={text} item xs={12}>
              <Button
                data-active={activePageId === pageId ? "true" : "false"}
                color={activePageId === pageId ? "info" : "inherit"}
                variant="text"
                size="medium"
                startIcon={<IconComponent icon={icon} />}
                // color={}
                // sx={{ color: `${activePageId === pageId ? "orange" : "white"}` }}
              >
                {text}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* <Grid item>팀 소개 페이지</Grid> */}
      <Grid item>
        <Button onClick={handleClickOpen} variant="text" size="medium" startIcon={<IconComponent icon={"Person"} />} sx={{ color: "white" }}>
          <LoginContainer pageUri={getPageUriByPageId(activePageId)} />
          {/* <LoginTypography />
          <LoginDialog open={open} onClose={handleClose} pageUri={getPageUriByPageId(activePageId)} /> */}
        </Button>
      </Grid>
    </Grid>
  )
}

export default Navigation
