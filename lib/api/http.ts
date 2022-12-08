import axios from "axios"

// 로그인 임시 처리
// axios.defaults.headers.common["sessionKey"] =
//   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrYWthb18yMjY2MTkzMDI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2Nzc0MTg2OSwiZXhwIjoxNjY3NzQ5MDY5fQ.vrW3F3X3cVc-rTU3Vb5vkgHK__OPsirJ_LdAtif6A8k"

export const API_URL = "http://3.35.186.99:8080"
export const http = axios

export const setHeaderAuthorization = (sessionKey: string) => {
  if (!sessionKey) return
  http.defaults.headers.common["sessionKey"] = sessionKey
}
