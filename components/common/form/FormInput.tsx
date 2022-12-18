import { Box, Typography } from "@mui/material"
interface IFormInput {
  title: string
  required?: boolean
  children: React.ReactNode
}
export default function FormInput({ title, required, children }: IFormInput) {
  return (
    <>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {title} {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </>
  )
}
