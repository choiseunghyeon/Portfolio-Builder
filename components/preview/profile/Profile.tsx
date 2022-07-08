import IconComponent from "@components/common/IconComponent"
import { Grid, Divider, Typography, Theme, Box, Stack, Chip } from "@mui/material"
import { PROFILE_PREVIEW, PROFILE_PREVIEW_MAIN_TEXT, PROFILE_PREVIEW_SUB_TEXT } from "@constants/testConstants"
import { IBaseProps } from "@type/preview"
import { splitMultiLineText } from "@store/utils"
import React from "react"

interface IProfileAdditionalInformation {
  apply?: {
    applyCompany: string
    applyPosition: string
  }
  contact?: {
    phoneNumber: string
    email: string
  }
  github?: {
    url: string
  }
  keyword?: {
    keywordList: string[]
  }
}
export interface IProfileProps extends IBaseProps, IProfileAdditionalInformation {
  title: string
  subtitle: string
  imageSrc: string
}

const Profile = (props: IProfileProps) => {
  switch (props.attributes?.layoutType) {
    case "default":
      return <DefaultProfile {...props} />
    case "second":
      return <SecondProfile {...props} />
    default:
      return null
  }
}

export default React.memo(Profile)

function DefaultProfile({ title, subtitle, imageSrc, apply, contact, github, keyword }: IProfileProps) {
  return (
    // sx={{ textAlign: "center", margin: "24px 0 16px 0" }}
    <Box data-testid={PROFILE_PREVIEW}>
      <Grid container alignItems={"center"} spacing={1}>
        <Grid item xs={7}>
          <Typography variant="h5" component="h3" data-testid={PROFILE_PREVIEW_MAIN_TEXT}>
            {title}
          </Typography>
          <Typography color="textSecondary" gutterBottom data-testid={PROFILE_PREVIEW_SUB_TEXT}>
            {splitMultiLineText(subtitle).map((text, index) => (
              <div key={index}>{text}</div>
            ))}
          </Typography>
        </Grid>
        <Grid container justifyContent={"flex-end"} item xs={5}>
          <img
            src={imageSrc}
            style={{
              height: "100%",
              width: "100%",
              maxHeight: "240px",
              maxWidth: "240px",
            }}
            alt="person"
          />
        </Grid>

        <DefaultAdditionalInformation apply={apply} contact={contact} github={github} keyword={keyword} />
      </Grid>
    </Box>
  )
}

function DefaultAdditionalInformation({ apply, contact, github, keyword }: IProfileAdditionalInformation) {
  if (apply) {
    const { applyCompany, applyPosition } = apply
    return (
      <Grid item xs={12} sx={{ margin: "0 10px" }}>
        <Typography variant="h5" component="h3">
          {applyPosition}
        </Typography>
        <Typography variant="h5" component="h3">
          {applyCompany}
        </Typography>
      </Grid>
    )
  } else if (contact) {
    const { phoneNumber, email } = contact
    return (
      <Grid item xs={12} sx={{ margin: "0 10px" }}>
        <Typography variant="h5" component="h3">
          <IconComponent icon="LocalPhone" />
          {phoneNumber}
          <IconComponent icon="Email" />
          {email}
        </Typography>
      </Grid>
    )
  } else if (github) {
    const { url } = github
    return (
      <Grid item xs={12} sx={{ margin: "0 10px" }}>
        <Typography variant="h5" component="h3">
          {`GitHub ${url}`}
        </Typography>
      </Grid>
    )
  } else if (keyword) {
    const { keywordList } = keyword
    return (
      <Grid item xs={12} sx={{ margin: "0 10px" }}>
        <Typography variant="h5" component="h3">
          <Stack direction="row" spacing={1}>
            {keywordList && keywordList.map(keyword => <Chip key={keyword} label={keyword} color="primary" />)}
          </Stack>
        </Typography>
      </Grid>
    )
  } else {
    return null
  }
}

function SecondProfile({ title, subtitle, imageSrc }: IProfileProps) {
  return (
    <Box data-testid="profilePriview" sx={{ textAlign: "center", margin: "24px 0 16px 0" }}>
      <Grid container spacing={1} data-testid={PROFILE_PREVIEW_SUB_TEXT}>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <Typography variant="h5" component="h3">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }}>
          <img
            src={imageSrc}
            style={{
              maxWidth: "120px",
              borderRadius: "50%",
            }}
            alt="person"
          />
        </Grid>
        <Grid item xs={12} sx={{ margin: "0 10px" }} data-testid={PROFILE_PREVIEW_MAIN_TEXT}>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
