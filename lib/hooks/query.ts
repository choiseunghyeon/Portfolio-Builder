import { skillSet } from "@constants/skillSet"
import axios from "axios"
import { useQuery } from "react-query"
import { ITechBlogResponse } from "@type/response"
import { fetchTechBlog } from "@lib/api/techblog"

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

export function useAutoCompleteList(autocompleteRequest: string | undefined) {
  if (autocompleteRequest === "skillSet") {
    return skillSet
    // skillSet의 경우 고정 되어 있으므로 client에서 관리
  } else {
    return []
    // const { data } = useQuery(["profileList"], async () => {
    //   const { data } = await axios.get(`http://localhost:4000/profileList/`)
    //   return data
    // })
    // return data
  }
}

export function useTechBlogCardList() {
  const { data } = useQuery(["techCardList"], async () => {
    const { data } = await fetchTechBlog()
    return data
  })
  return data
}

export function useFavoriteTechBlogCardList() {
  const { data } = useQuery(["favorite", "techCardList"], async () => {
    const { data } = await fetchTechBlog("favorite")
    return data
  })
  return data
}
