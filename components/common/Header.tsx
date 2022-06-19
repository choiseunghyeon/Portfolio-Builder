import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material"
import IconComponent from "./IconComponent"

interface IHeaderProps {
  handleNavigate: (href: string) => void
}
export default function Header({ handleNavigate }: IHeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PPB
          <Button color="inherit" onClick={() => handleNavigate("directory")}>
            디렉토리
          </Button>
          <Button color="inherit" onClick={() => handleNavigate("/")}>
            포트폴리오 제작
          </Button>
          <Button color="inherit">채용</Button>
          <Button color="inherit">로그인</Button>
        </Typography>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <IconComponent icon="Search" />
        </IconButton>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <IconComponent icon="Menu" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
