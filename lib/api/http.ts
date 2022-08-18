import axios from "axios"

export const setHeaderAuthorization = (accessToken: string) => {
  if (!accessToken) return
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
}

export const http = axios
