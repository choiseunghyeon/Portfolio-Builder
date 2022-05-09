import InputField from "./InputField";
import ImageField from "./ImageField";
import DateField from "./DateField";
import MultiLineInputField from "./MultiLineInputField";

export const fieldProvider: { [key: string]: any } = {
  Text: InputField,
  MultiLineText: MultiLineInputField,
  Image: ImageField,
  Date: DateField,
};
