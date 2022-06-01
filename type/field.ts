export type FieldType = "Text" | "MultiLineText" | "Image" | "Date" | "Select";
export type FieldValueType = ITextFieldValue | IMultiLineTextFieldValue | IImageFieldValue | IDateFieldValue | ISelectFiedlValue;
export interface IField {
  id: string;
  type: FieldType;
  title: string;
  // reference:
  attributes: IFieldAttributes;
  value: { [key: string]: any };
}

// System에서 field를 인식하기 위한 reference
type FieldRefereceType = "profileImage" | "profileMainText" | "profileSubText" | "profileAdditionalnfo";
export interface IFieldAttributes {
  placeholder?: { [key: string]: string }; // UI에 보이는 설명 글
  validation?: IFieldValidation; // 값 검증
  relatedSelectValue?: string; // 관련된 selectValue 값
  display?: boolean; // 보이기 / 숨김
}

export interface IFieldValidation {
  dataType?: "numeric" | "phoneNumber" | "email";
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
