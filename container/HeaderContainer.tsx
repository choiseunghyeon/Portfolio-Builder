import Header from "@components/common/Header"
import { useRouter } from "next/router"
export default function HeaderContainer({ open, drawerWidth, handleDrawerOpen }: any) {
  const router = useRouter()
  const handleNavigate = (href: string): void => {
    router.push(href)
  }
  return <Header handleNavigate={handleNavigate} open={open} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen} />
}
