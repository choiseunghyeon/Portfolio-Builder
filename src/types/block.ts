type BlockType = "Profile" | "Career" | "Project";
export interface IBlock {
  id: string;
  type: BlockType;
  title: string;
  iconName: string;
  fields: IField[];
}

type FieldType = "Text" | "Link" | "image" | "video" | "date" | "style" | "SampleDoubleText";
export interface IField {
  id: string;
  type: FieldType;
  title: string;
  value: ITextFieldValue | IDoubleTextField | { [key: string]: any };
}

export interface IFieldProps extends IField {
  blockId: number;
  handleField: Function;
}

export interface ITextFieldValue {
  input: string;
}

export interface IDoubleTextField {
  input: string;
  input2: string;
}
