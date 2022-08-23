export interface ITechBlogResponse {
  id: string
  favorite: boolean
  companyName: string
  serviceName?: string
  iconUrl: string // url
  dateFromLastUpdate: string // Date
  companyInformationUrl: string // url
  recentPostUrl: string // url
  clickCount: number
}
