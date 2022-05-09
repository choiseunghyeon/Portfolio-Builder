export type BlockType = "Profile" | "Career" | "Project" | "Portfolio";
export interface IBlock {
  id: string;
  type: BlockType;
  title: string;
  iconName: string;
  style: IBlockStyle;
  fields: IField[];
}

export interface IBlockStyle {
  styleType: string;
  xs: BlockXSType;
}

export type BlockXSType = 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1;

export interface IFieldValidation {
  dataType?: "numeric";
  limit?: number;
  includeSpecialChar?: boolean;
}
type FieldType = "Text" | "MultiLineText" | "Link" | "Image" | "Video" | "Date" | "Style";
export interface IField {
  id: string;
  type: FieldType;
  title: string;
  validation?: IFieldValidation;
  value: { [key: string]: any };
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
