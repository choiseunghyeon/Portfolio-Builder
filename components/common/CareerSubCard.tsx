import { Button, Grid, Typography } from "@mui/material"
import React from "react"
import IconComponent from "./IconComponent"

function CareerSubCard() {
  return (
    <Grid container direction="column" justifyContent="space-between" sx={{ height: "100%" }}>
      <Grid item>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>관심있는 기업</Typography>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>채용 홈페이지 바로가기</Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1}>
          {["토스", "당근마켓", "뱅크샐러드"].map(career => (
            <Grid item key={career}>
              <Button variant="contained" color="info" size="medium" sx={{ width: "100%", color: "white" }}>
                {career}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item alignSelf={"flex-end"}>
        <Button variant="text" size="small" startIcon={<IconComponent icon={"Add"} />}>
          more
        </Button>
      </Grid>
    </Grid>
  )
}

export default CareerSubCard
