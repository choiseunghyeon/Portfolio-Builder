import { ITechBlogResponse, SortByType } from "@type/api"
import { http } from "./http"

export const fetchTechBlog = (sortBy: SortByType) => {
  switch (sortBy) {
    case "latest":
      return http.get<ITechBlogResponse[]>(`http://localhost:4000/techCardListByLatest`)
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
