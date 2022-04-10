type BlockType = "Profile" | "Career" | "Project";
export interface IBlock {
  id: string;
  type: BlockType;
  title: string;
  iconName: string;
  fields: IField[];
}

type FieldType = "Text" | "Link" | "image" | "video" | "date" | "style";
export interface IField {
  id: string;
  type: FieldType;
  title: string;
}
