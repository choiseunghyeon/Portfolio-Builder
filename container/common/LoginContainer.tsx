import LoginDialog from "@components/common/LoginDialog"
import LoginTypography from "@components/common/LoginTypography"
import { removeCookie } from "@lib/api/cookie"
import { isLoggedIn } from "@lib/util/common"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

interface ILoginContainerProps {
  pageUri: string
}

function LoginContainer({ pageUri }: ILoginContainerProps) {
  const [winReady, setWinReady] = useState(false)
  const router = useRouter()
  const [openLogin, setLoginOpen] = useState(false)
  const [needLogin, setNeedLogin] = useState(true)

  const handleLoginOpen = () => {
    if (needLogin) {
      setLoginOpen(true)
      return
    } else {
      // page refresh??
      removeCookie("sessionKey")
      removeCookie("userId")
      router.reload()
    }
  }

  const handleLoginClose = () => {
    setLoginOpen(false)
  }

  useEffect(() => {
    setWinReady(true)
  }, [])

  useEffect(() => {
    setNeedLogin(isLoggedIn() ? false : true)
  })

  if (!winReady) return null

  return (
    <>
      <LoginTypography needLogin={needLogin} handleLoginOpen={handleLoginOpen} />
      <LoginDialog open={openLogin} onClose={handleLoginClose} pageUri={pageUri} />
    </>
  )
}

export default LoginContainer
