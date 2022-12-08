import { isLoggedIn } from "@lib/util/common"
import { useState, useEffect } from "react"
interface ILoginTypographyProps {
  needLogin: boolean
  handleLoginOpen: Function
}
function LoginTypography({ needLogin, handleLoginOpen }: ILoginTypographyProps) {
  //   const [title, setTitle] = useState<"로그인" | "로그아웃">("로그인")

  //   useEffect(() => {
  //     setTitle(isLoggedIn() ? "로그아웃" : "로그인")
  //   })
  const onClick = () => {
    handleLoginOpen()
  }

  return <div onClick={onClick}>{needLogin ? "로그인" : "로그아웃"}</div>
}

export default LoginTypography
