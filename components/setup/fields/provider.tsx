import InputField from "./InputField";
import ImageField from "./ImageField";
import DateField from "./DateField";
import MultiLineInputField from "./MultiLineInputField";
import SelectField from "./SelectField";
import { FieldType } from "@type/field";
type IFieldProvider = {
  [key in FieldType]: any;
};
export const fieldProvider: IFieldProvider = {
  Text: InputField,
  MultiLineText: MultiLineInputField,
  Image: ImageField,
  Date: DateField,
  Select: SelectField,
};
