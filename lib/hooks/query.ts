import axios from "axios"
import { useQuery } from "react-query"
import http from "../http/http"

export function usePortfolio(portfolioId: string) {
  const { data } = useQuery(["portfolio", portfolioId], async () => {
    const { data } = await axios.get(`http://localhost:4000/portfolio/${portfolioId}`)
    return data
  })
  return data
}

export function useProfileList() {
  const { data } = useQuery(["profileList"], async () => {
    const { data } = await axios.get(`http://localhost:4000/profileList/`)
    return data
  })
  return data
}
