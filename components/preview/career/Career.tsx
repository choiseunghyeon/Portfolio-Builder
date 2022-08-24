import { Grid, Typography, Paper } from "@mui/material"
import { splitMultiLineText } from "@store/utils"
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab"
import { IBaseProps } from "@type/preview"
import React from "react"
import { CARRER_DESCRIPTION, CARRER_ORGANIGATION, CARRER_ROLE, CARRER_TERM } from "@constants/testConstants"

export interface ICareerProps extends IBaseProps {
  organigation: string
  role: string
  term: string
  description: string
}
const Career = ({ organigation, role, term, description, attributes }: ICareerProps) => {
  return (
    <TimelineItem
      sx={{
        "&:before": { flex: 0, padding: 0 },
      }}>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ px: 2 }}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant="h6" component="span" data-testid={CARRER_ORGANIGATION}>
              <Paper elevation={1} sx={{ backgroundColor: "primary.dark", color: "white", display: "inline-block", padding: "5px 8px" }}>
                {organigation}
              </Paper>
            </Typography>
            <Typography color="textSecondary" data-testid={CARRER_TERM}>
              {term}
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid alignItems="center" container item xs={8}>
            <Typography variant="h6" component="span" data-testid={CARRER_ROLE}>
              {role}
            </Typography>
            <Typography color="textSecondary" data-testid={CARRER_DESCRIPTION}>
              {description && splitMultiLineText(description).map((text, index) => <div key={index}>{`- ${text}`}</div>)}
            </Typography>
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  )
}

export default React.memo(Career)
