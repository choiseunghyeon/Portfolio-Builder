import { Grid, Divider, Typography, Theme, Box, Stack, Chip } from "@mui/material"
import { splitMultiLineText } from "@store/utils"
import { PROJECT_PREVIEW, PROJECT_PREVIEW_DESCRIPTION, PROJECT_PREVIEW_NAME, PROJECT_PREVIEW_ORGANIGATION, PROJECT_PREVIEW_SKILLS, PROJECT_PREVIEW_TERM } from "@constants/testConstants"
import { IBaseProps } from "@type/preview"
import { Paper } from "@mui/material"

export interface IProjectProps extends IBaseProps {
  name: string
  organigation: string
  term: string
  description: string
  skills: string
  skillSet: string[]
}

const Project = (props: IProjectProps) => {
  switch (props.attributes?.layoutType) {
    case "default":
      return <DefaultProject {...props} />
    default:
      return null
  }
}
const DefaultProject = ({ name = "", organigation = "", term = "", description = "", skills = "", skillSet = [], attributes }: IProjectProps) => {
  return (
    <Paper evaluation={2} data-testid={PROJECT_PREVIEW}>
      <Grid container spacing={0} sx={{ padding: "10px" }}>
        <Grid item xs={7}>
          <Typography data-testid={PROJECT_PREVIEW_NAME} sx={{ fontWeight: "bold" }} variant="h6">
            {name}
          </Typography>
        </Grid>
        <Grid container alignItems={"center"} justifyContent={"flex-end"} item xs={5}>
          <Typography data-testid={PROJECT_PREVIEW_TERM} gutterBottom variant="subtitle2">
            {term}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_ORGANIGATION} variant="subtitle1">
            {organigation}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_DESCRIPTION} gutterBottom variant="body1" color={"textSecondary"}>
            {description && splitMultiLineText(description).map((text, index) => <div key={index}>{text}</div>)}
            {/* {description} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_SKILLS} variant="body2" sx={{ marginBottom: "10px" }}>
            {skills && splitMultiLineText(skills).map((text, index) => <div key={index}>{`- ${text}`}</div>)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            <Stack direction="row" spacing={1}>
              {skillSet && skillSet.map(skill => <Chip key={skill} label={skill} color="primary" />)}
            </Stack>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Project
