import { Button, Grid } from "@mui/material"
import React from "react"
import IconComponent from "./IconComponent"

function Navigation() {
  return (
    <Grid container direction="column" justifyContent="space-between" sx={{ height: "100% !important" }}>
      <Grid item>
        <Grid container spacing={1}>
          {[
            { text: "Home", icon: "Inbox" },
            { text: "Discovery", icon: "Inbox" },
            { text: "Tech-blog", icon: "Inbox" },
            { text: "Career", icon: "Inbox" },
            { text: "Community", icon: "Inbox" },
          ].map(({ text, icon }, index) => (
            <Grid key={text} item xs={12}>
              <Button variant="text" size="medium" startIcon={<IconComponent icon={icon} />} sx={{ color: "white" }}>
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
