import Header from "@components/common/Header"
import { useRouter } from "next/router"
export default function HeaderContainer() {
  const router = useRouter()
  const handleNavigate = (href: string): void => {
    router.push(href)
  }
  return <Header handleNavigate={handleNavigate} />
}
