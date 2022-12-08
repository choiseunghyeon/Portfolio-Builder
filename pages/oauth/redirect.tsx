import { Box, CssBaseline, Grid } from "@mui/material"
import type { NextPage, GetServerSideProps } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { setCookie } from "@lib/api/cookie"
import { setHeaderAuthorization } from "@lib/api/http"
import { fetchUser } from "@lib/api/user"

export const getServerSideProps: GetServerSideProps = async function ({ req, res, query }) {
  console.log(query)
  // console.log(req)
  // const { user } = req.session
  const { sessionkey, page_uri } = query // "ppbTestdev"
  // const redirect = "/"

  return {
    props: { sessionKey: sessionkey, redirect: page_uri },
  }
}

const Directory: NextPage = ({ sessionKey, redirect }: any) => {
  const router = useRouter()

  useEffect(() => {
    async function setAuth() {
      setHeaderAuthorization(sessionKey)
      setCookie("sessionKey", sessionKey)
      const result = await fetchUser()
      setCookie("userId", result.data.body.id)
      router.push(`${redirect}`)
    }

    setAuth()
  })
  return (
    <>
      <Box sx={{ display: "flex" }}>리다이렉트..</Box>
    </>
  )
}

export default Directory
