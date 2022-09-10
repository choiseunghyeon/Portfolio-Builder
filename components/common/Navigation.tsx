import { NAVIGATION_CONTAINER } from "@constants/testConstants"
import { Button, Grid } from "@mui/material"
import { ActivatablePageType } from "@type/common"
import React from "react"
import IconComponent from "./IconComponent"

interface INavigationProps {
  activePageId: ActivatablePageType
}

const navigatablePage: { text: string; icon: string; pageId: ActivatablePageType }[] = [
  { text: "Home", icon: "Inbox", pageId: "home" },
  { text: "Discovery", icon: "Inbox", pageId: "discovery" },
  { text: "Tech-blog", icon: "Inbox", pageId: "tech-blog" },
  { text: "Career", icon: "Inbox", pageId: "career" },
  { text: "Community", icon: "Inbox", pageId: "community" },
]
function Navigation({ activePageId }: INavigationProps) {
  return (
    <Grid data-testid={NAVIGATION_CONTAINER} container direction="column" justifyContent="space-between" sx={{ height: "100% !important" }}>
      <Grid item>
        <Grid container spacing={1}>
          {navigatablePage.map(({ text, icon, pageId }, index) => (
            <Grid key={text} item xs={12}>
              <Button
                data-active={activePageId === pageId ? "true" : "false"}
                color={activePageId === pageId ? "secondary" : "inherit"}
                variant="text"
                size="medium"
                startIcon={<IconComponent icon={icon} />}
                sx={{ color: "white" }}>
                {text}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {/* <Grid item>팀 소개 페이지</Grid> */}
      <Grid item>
        <Button variant="text" size="medium" startIcon={<IconComponent icon={"Person"} />} sx={{ color: "white" }}>
          Login
        </Button>
      </Grid>
    </Grid>
  )
}

export default Navigation
