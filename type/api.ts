export interface ITechBlogResponse {
  id: string // tech blog card 식별값
  favorite: boolean // tech blog 즐겨찾기 여부
  companyName: string // 회사 이름
  serviceName?: string // 서비스 이름
  techBlogUrl: string // 테크블로그 URL 주소
  iconUrl: string // 회사 아이콘 URL 주소
  dateFromLastUpdate: string // 마지막으로 등록된 날짜 ex) 2022:09:12 등
  companyInformationUrl: string // THE VC URL 주소
  videoUrl: string // 유튜브 URL 주소
}

// 현재 주고 있는 response
export interface ITechBlog {
  blogId: number
  logo: string
  officialName: string
  productName: string
  link: string
  updateDate: Date
  writeDate: Date
}

export type SortByType = "latest" | "stars" | "click" | "favorite"
