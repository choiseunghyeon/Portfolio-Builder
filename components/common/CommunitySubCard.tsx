import { Button, Grid, Typography } from "@mui/material"
import React from "react"
import IconComponent from "./IconComponent"

function CommunitySubCard() {
  return (
    <Grid container direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
      <Grid item>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>관심있는 기업</Typography>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>현직자 1 on 1 바로가기</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1}>
          {["COFFEECHAT", "careerly"].map(career => (
            <Grid item key={career}>
              <Button variant="outlined" size="medium" sx={{ width: "100%" }}>
                {career}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item alignSelf={"flex-end"}>
        <Button variant="text" size="small" startIcon={<IconComponent icon={"Add"} />}>
          현직자를 만나면 어떤 걸 물어봐야 할까?
        </Button>
      </Grid>
    </Grid>
  )
}

export default CommunitySubCard
