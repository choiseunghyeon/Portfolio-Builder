import React, { ChangeEvent, useCallback, useState } from "react";
import { IFieldProps } from "@type/block";
import { Box, TextField } from "@mui/material";
import { validateValue } from "@store/utils";

function InputField({ blockId, id, type, value, title, handleField, validation }: IFieldProps) {
  console.log("re-render input field");
  const { input } = value;
  const [errorInfo, setErrorInfo] = useState<{ pass: boolean; errorMessage: string | null }>({ pass: true, errorMessage: "" });
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      // setTimeout(() => {
      // }, 100);
      const value = event.target.value;
      if (validation !== undefined) {
        const { pass, errorMessage } = validateValue(value, validation);
        setErrorInfo({ pass: pass, errorMessage: errorMessage });
      }
      const valueId = event.target.dataset.valueid;
      handleField(blockId, id, valueId, value);
      handleField(blockId, id, valueId, value + 1);
      handleField(blockId, id, valueId, value + 2);
    },
    [blockId, id, handleField]
  );
  return (
    <>
      <TextField error={!errorInfo.pass} helperText={errorInfo.errorMessage} inputProps={{ "data-valueid": "input" }} value={input} label={title} variant="standard" onChange={handleInput} />
    </>
  );
}

export default React.memo(InputField);
