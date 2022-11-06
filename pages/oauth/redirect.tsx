import { Box, CssBaseline, Grid } from "@mui/material"
import type { NextPage, GetServerSideProps } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { setCookie } from "@lib/api/cookie"
import { setHeaderAuthorization } from "@lib/api/http"

export const getServerSideProps: GetServerSideProps = async function ({ req, res, query }) {
  console.log(query)
  // const { user } = req.session
  const session = "ppbTestdev"
  const redirect = "/"

  return {
    props: { sessionKey: session, redirect: redirect },
  }
}

const Directory: NextPage = ({ sessionKey, redirect }: any) => {
  const router = useRouter()

  useEffect(() => {
    setHeaderAuthorization("ppbTestdev")
    setCookie("sessionKey", sessionKey)
    router.push(`${redirect}`)
  })
  return (
    <>
      <Box sx={{ display: "flex" }}>리다이렉트..</Box>
    </>
  )
}

export default Directory
