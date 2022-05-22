import { ChangeEvent, useCallback } from "react";
import { IFieldProps, IMultiLineTextFieldValue } from "@type/field";
import { Box, TextField } from "@mui/material";

interface IMultiLineInputFieldProps extends IFieldProps {
  value: IMultiLineTextFieldValue;
}

export default function MultiLineInputField({ blockId, id, type, value, title, handleField, attributes }: IMultiLineInputFieldProps) {
  const { multiLineInput } = value;
  const { display, placeholder } = attributes;
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const valueId = event.target.dataset.valueid;
      const value = event.target.value;
      handleField(blockId, id, valueId, value);
    },
    [blockId, id, handleField]
  );

  if (display === false) {
    return null;
  }
  return (
    <>
      <TextField placeholder={placeholder?.multiLineInput} inputProps={{ "data-valueid": "multiLineInput" }} label={title} multiline value={multiLineInput} onChange={handleInput} />
    </>
  );
}
