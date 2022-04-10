import SampleDoubleTextField from "./SampleDoubleTextField";
import TextField from "./TextField";

export const fieldProvider: { [key: string]: any } = {
  Text: TextField,
  SampleDoubleText: SampleDoubleTextField,
};
