import { IField } from "./field"

export type BlockType = "Profile" | "Career" | "Project" | "Portfolio" | "MarkDown"
export interface IBlock {
  id: string | number
  idx: string
  type: BlockType
  title: string
  iconName: string
  // style: IBlockStyle;
  fields: IField[]
}

export interface IBlockStyle {
  layoutType: string
  xs: BlockXSType
}

export type BlockXSType = 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1
