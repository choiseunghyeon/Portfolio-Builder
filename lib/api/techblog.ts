import { ITechBlogResponse } from "@type/response"
import { http } from "./http"

export const fetchTechBlog = (query?: string) => {
  if (query === "favorite") return http.get<ITechBlogResponse[]>(`http://localhost:4000/favoriteTechCardList/`)
  return http.get<ITechBlogResponse[]>(`http://localhost:4000/techCardList/`)
}
