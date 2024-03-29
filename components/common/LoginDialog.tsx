import { http } from "@lib/api/http"
import { Button, Dialog, DialogTitle, Typography, Grid } from "@mui/material"
import React, { useCallback } from "react"
import IconComponent from "./IconComponent"

interface LoginDialogProps {
  open: boolean
  onClose: () => void
  pageUri: string
}

// const LOGIN_URL = `http://3.35.186.99:8080/oauth2/authorization/kakao?redirect_uri=http://3.35.186.99:8080/login/oauth2/code/kakao`
// const LOGIN_URL = `http://3.35.186.99:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/redirect`

function getLoginUrl(social_type: "kakao" | "github", pageUri: string) {
  const redirect = getRedirectUri()
  return `http://3.35.186.99:8080/oauth2/authorization/${social_type}?redirect_uri=${redirect}?page_uri=${pageUri}`
}

function getRedirectUri() {
  let redirectUri = ""
  if (window.location.origin.search(/portfolio-builder/g) > -1) {
    redirectUri = `${window.location.origin}/oauth/redirect`
  } else {
    redirectUri = "http://localhost:3000/oauth/redirect"
  }
  return redirectUri
}
// function TestApi() {
//   http.post(LOGIN_URL).then(res => {
//     debugger
//     console.log(res)
//   })
// }

// 임시 처리

function LoginDialog({ onClose, open, pageUri = "/" }: LoginDialogProps) {
  return (
    <Dialog onClose={onClose} open={open}>
      <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ textAlign: "center", padding: "16px" }}>
        <Grid item xs={12}>
          <Typography variant="h4">로그인</Typography>
        </Grid>
        <Grid item xs>
          <Button
            href={getLoginUrl("kakao", pageUri)}
            sx={{ backgroundColor: "yellow", border: "1px solid yellow", color: "black" }}
            variant="contained"
            size="large"
            startIcon={<IconComponent icon="Kakao" />}>
            Kakao
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            href={getLoginUrl("github", pageUri)}
            sx={{ backgroundColor: "white", border: "1px solid white", color: "black" }}
            variant="contained"
            size="large"
            startIcon={<IconComponent icon="Github" />}>
            Github
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default LoginDialog
