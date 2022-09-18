import { Button, Dialog, DialogTitle, Typography, Grid } from "@mui/material"
import React, { useCallback } from "react"
import IconComponent from "./IconComponent"

interface LoginDialogProps {
  open: boolean
  onClose: () => void
}
function LoginDialog({ onClose, open }: LoginDialogProps) {
  const handleClose = useCallback(() => {
    onClose()
  }, [])

  //   const handleListItemClick = (value: string) => {
  //     onClose(value)
  //   }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Grid container spacing={1} justifyContent="center" alignItems="center" sx={{ textAlign: "center", padding: "16px" }}>
        <Grid item xs={12}>
          <Typography variant="h4">로그인</Typography>
        </Grid>
        <Grid item xs>
          <Button sx={{ backgroundColor: "yellow", border: "1px solid yellow", color: "black" }} variant="contained" size="large" startIcon={<IconComponent icon="Kakao" />}>
            Kakao
          </Button>
        </Grid>
        <Grid item xs>
          <Button sx={{ backgroundColor: "white", border: "1px solid white", color: "black" }} variant="contained" size="large" startIcon={<IconComponent icon="Google" />}>
            Google
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default LoginDialog
