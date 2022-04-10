import SampleDoubleTextField from "./SampleDoubleTextField";
import TextField from "./TextField";
import ImageField from "./ImageField";

export const fieldProvider: { [key: string]: any } = {
  Text: TextField,
  SampleDoubleText: SampleDoubleTextField,
  Image: ImageField,
};
