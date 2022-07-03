import { Grid, Divider, Typography, Theme, Box } from "@mui/material"
import { splitMultiLineText } from "@store/utils"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import { IBaseProps } from "@type/preview"
import { makeStyles } from "@mui/styles"
import { Paper } from "@mui/material"

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
          <Grid item xs="3">
            <Typography variant="h6" component="span">
              <Paper elevation={1} sx={{ backgroundColor: "primary.dark", color: "white", display: "inline-block", padding: "5px 8px" }}>
                {organigation}
              </Paper>
            </Typography>
            <Typography color="textSecondary">{term}</Typography>
          </Grid>
          <Grid item xs="1"></Grid>
          <Grid alignItems="center" container item xs="8">
            <Typography variant="h6" component="span">
              {role}
            </Typography>
            <Typography color="textSecondary">{description && splitMultiLineText(description).map((text, index) => <div key={index}>{`- ${text}`}</div>)}</Typography>
          </Grid>
        </Grid>
      </TimelineContent>
    </TimelineItem>
  )
}

export default Career
