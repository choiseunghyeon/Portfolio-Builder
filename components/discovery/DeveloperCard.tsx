import React from "react"
import { Grid, Chip, Stack, IconButton, CardContent, Typography, Avatar, Card } from "@mui/material"
import IconComponent, { Icons } from "@components/common/IconComponent"

export interface IDeveloperCard {
  imageSrc: string
  name: string
  skillSet: string[]
}

function DeveloperCard({ imageSrc, name, skillSet }: IDeveloperCard) {
  return (
    <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"} sx={{ border: "2px solid grey", borderRadius: "10px 10px 10px 10px", padding: 1 }}>
      <Grid item alignSelf={"flex-end"}>
        <Typography sx={{ textAlign: "right" }} variant="h6" component="div">
          <IconButton onClick={() => {}}>
            <IconComponent icon={Icons.OpenInFull} />
          </IconButton>
        </Typography>
      </Grid>
      <Grid item>
        <Avatar sx={{ width: 56, height: 56 }} src={imageSrc} />
      </Grid>
      <Grid item>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </Grid>
      <Grid item>
        <Stack direction="row" spacing={1}>
          {skillSet && skillSet.map(skill => <Chip size="small" sx={{ backgroundColor: "black", color: "white" }} key={skill} label={skill} />)}
        </Stack>
      </Grid>
    </Grid>
  )
}

export default DeveloperCard
