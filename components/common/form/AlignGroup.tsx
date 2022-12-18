import { Box } from "@mui/material"
interface IAlignGroup {
  children: React.ReactNode
}
export default function AlignGroup({ children }: IAlignGroup) {
  return <Box sx={{ "& > :not(:last-child)": { marginRight: 1.5 } }}>{children}</Box>
}
