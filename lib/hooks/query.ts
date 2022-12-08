import { skillSet } from "@constants/skillSet"
import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { ITechBlogResponse, SortByType } from "@type/api"
import { fetchTechBlog } from "@lib/api/techblog"
import { fetchPortfolio, fetchPortfolioList, savePortfolioById } from "@lib/api/builder"
import { getCookie } from "@lib/api/cookie"

export function usePortfolio(portfolioId: string) {
  const { data } = useQuery(["portfolio", portfolioId], async () => {
    const {
      data: { body, statusCode },
    } = await fetchPortfolio(portfolioId)
    // const { data } = await axios.get(`${BASE_URL}/api/builder/${portfolioId}`)
    return body
  })
  return data
}

export function usePortfolioeMutation(portfolioId: string) {
  const queryClient = useQueryClient()
  return useMutation(
    () => {
      return savePortfolioById()
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["portfolio", portfolioId]),
    }
  )
}

export function useProfileList() {
  const { data } = useQuery(["profileList"], async () => {
    const { data } = await fetchPortfolioList()
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

export function useTechBlogCardList(sortBy: SortByType) {
  const { data } = useQuery(["techCardList", sortBy], async () => {
    const userId = getCookie("userId")
    if (!userId) return

    const { data } = await fetchTechBlog(userId, sortBy)
    return data.body
  })

  let result
  if (sortBy === "favorite") {
    result = data?.techFavorite
  } else {
    result = data?.techOfficialList
  }

  return result
}

export function useTechBlogCardFavoriteMutation(sortBy: SortByType) {
  const queryClient = useQueryClient()

  return useMutation(({ id, favorite }: any) => Promise.resolve(), {
    onSuccess: () => queryClient.invalidateQueries(["techCardList", sortBy]),
  })
}

export function useTechBlogCardClickCountMutation(sortBy: SortByType) {
  const queryClient = useQueryClient()

  return useMutation(({ id }: any) => Promise.resolve(), {
    onSuccess: () => queryClient.invalidateQueries(["techCardList", sortBy]),
  })
}
