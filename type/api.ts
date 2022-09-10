export interface ITechBlogResponse {
  id: string
  favorite: boolean
  companyName: string
  serviceName?: string
  techBlogUrl: string // url
  iconUrl: string // url
  dateFromLastUpdate: string // Date
  companyInformationUrl: string // url
  videoUrl: string // url
}

export type SortByType = "latest" | "stars" | "click" | "favorite"
