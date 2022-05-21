import React, { ChangeEvent, useCallback, useState } from "react";
import { IFieldProps, ITextFieldValue } from "@type/field";
import { Box, TextField } from "@mui/material";
import { validateValue } from "@store/utils";

interface IInputFieldProps extends IFieldProps {
  value: ITextFieldValue;
}

function InputField({ blockId, id, type, value, title, handleField, attributes }: IInputFieldProps) {
  console.log("re-render input field");
  const { input } = value;
  const { validation, display } = attributes;
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
    },
    [blockId, id, handleField]
  );

  if (display === false) {
    return null;
  }
  return (
    <>
      <TextField error={!errorInfo.pass} helperText={errorInfo.errorMessage} inputProps={{ "data-valueid": "input" }} value={input} label={title} variant="standard" onChange={handleInput} />
    </>
  );
}

export default React.memo(InputField);
