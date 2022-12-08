import { ITechBlogResponse, SortByType } from "@type/api"
import { getCookie } from "./cookie"
import { API_URL, http, setHeaderAuthorization } from "./http"

interface ITechBlog {
  blogId: number
  logo: string
  officialName: string
  productName: string
  link: string
  updateDate: Date
  writeDate: Date
}

export const fetchTechBlog = (userId: string, sortBy: SortByType) => {
  const sessionKey = getCookie("sessionKey")
  setHeaderAuthorization(sessionKey)
  switch (sortBy) {
    case "latest":
      return http.get(`${API_URL}/api/tech-blog/${userId}`)
    case "click":
      return http.get<ITechBlogResponse[]>(`http://localhost:4000/techCardListByClick`)
    case "stars":
      return http.get<ITechBlogResponse[]>(`http://localhost:4000/techCardListByStars`)
    case "favorite":
      return http.get<ITechBlogResponse[]>(`http://localhost:4000/techCardListByFavorite`)
  }
}

export const updateTechBlogFavorite = (id: string, favorite: boolean) => {
  // return http.patch()
  return Promise.resolve()
}

export const updateTechBlogClicCount = (id: string) => {
  // http.put(`http://localhost:4000/techCardListByClick`)
  return Promise.resolve()
}
