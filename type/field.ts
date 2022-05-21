export type FieldType = "Text" | "MultiLineText" | "Image" | "Date" | "Select";
export type FieldValueType = ITextFieldValue | IMultiLineTextFieldValue | IImageFieldValue | IDateFieldValue | ISelectFiedlValue;
export interface IField {
  id: string;
  type: FieldType;
  title: string;
  attributes: IFieldAttributes;
  value: FieldValueType;
}

interface IFieldAttributes {
  validation?: IFieldValidation;
  selectValue?: string;
  display?: boolean;
}

export interface IFieldValidation {
  dataType?: "numeric";
  limit?: number;
  includeSpecialChar?: boolean;
}

export interface ITextFieldValue {
  input: string;
}

export interface IMultiLineTextFieldValue {
  multiLineInput: string;
}

export interface IImageFieldValue {
  imageSrc: string;
}

export interface IDateFieldValue {
  from: string;
  to: string;
}

export interface ISelectFiedlValue {
  selectList: { label: string; value: string }[];
  selectedValue: string;
}

export interface IFieldProps extends IField {
  blockId: number;
  handleField: Function;
}
