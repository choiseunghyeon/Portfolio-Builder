import { Grid, Divider, Typography, Theme, Box, Stack, Chip } from "@mui/material"
import { splitMultiLineText } from "@store/utils"
import { IBlockStyle } from "@type/block"
import { PROJECT_PREVIEW, PROJECT_PREVIEW_DESCRIPTION, PROJECT_PREVIEW_NAME, PROJECT_PREVIEW_ORGANIGATION, PROJECT_PREVIEW_SKILLS, PROJECT_PREVIEW_TERM } from "@constants/testConstants"
import { IBaseProps } from "@type/preview"

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
    <Box data-testid={PROJECT_PREVIEW} sx={{ textAlign: "left", p: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_NAME} sx={{ fontWeight: "bold" }} variant="h6">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_ORGANIGATION} variant="subtitle1">
            {organigation}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_TERM} gutterBottom variant="subtitle2">
            {term}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_DESCRIPTION} gutterBottom variant="body1" color={"textSecondary"}>
            {description && splitMultiLineText(description).map((text, index) => <div key={index}>{text}</div>)}
            {/* {description} */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography data-testid={PROJECT_PREVIEW_SKILLS} variant="body2">
            <ul>{skills && splitMultiLineText(skills).map((text, index) => <li key={index}>{text}</li>)}</ul>
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
      <Divider sx={{ marginTop: 1 }} />
    </Box>
  )
}

export default Project
