import { API_URL, http } from "./http"

interface IUserResopnse {
  id: string
  username: string
  email: string
  role: string
  profile?: any
  createDate: Date
}

export const fetchUser = () => {
  return http.get(`${API_URL}/api/v1/user`)
  // return axios.get(`http://localhost:4000/portfolio/`)
}
