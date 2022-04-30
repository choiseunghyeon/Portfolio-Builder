import { ChangeEvent, useCallback } from "react";
import { IFieldProps } from "@type/block";
import { Box, TextField } from "@mui/material";

export default function InputField({ blockId, id, type, value, title, handleField }: IFieldProps) {
  const { input } = value;
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const valueId = event.target.dataset.valueid;
      const value = event.target.value;
      handleField(blockId, id, valueId, value);
    },
    [blockId, id, handleField]
  );
  return (
    <>
      <TextField inputProps={{ "data-valueid": "input" }} value={input} label={title} variant="standard" onChange={handleInput} />
    </>
  );
}
