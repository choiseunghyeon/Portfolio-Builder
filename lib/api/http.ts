import axios from "axios"

// 로그인 임시 처리
axios.defaults.headers.common["sessionKey"] =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthb18yMjY2MTkzMDI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2NzczMjc0NywiZXhwIjoxNjY3NzM5OTQ3fQ.zS1gJOyR9KSL87kTevPL8biQteN6wxVQ4lktDwXByUQ"

export const API_URL = "http://3.35.186.99:8080"

export const setHeaderAuthorization = (sessionKey: string) => {
  if (!sessionKey) return
  axios.defaults.headers.common["sessionKey"] = sessionKey
}

export const http = axios
