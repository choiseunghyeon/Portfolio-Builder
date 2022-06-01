import React, { ChangeEvent, useCallback, useState } from "react";
import { IFieldProps, IFieldValidation, ITextFieldValue } from "@type/field";
import { Box, InputAdornment, TextField } from "@mui/material";
import { getValidationLimitMessage, validateValue } from "@store/utils";

interface IInputFieldProps extends IFieldProps {
  value: ITextFieldValue;
}

function InputField({ blockId, id, type, value, title, handleField, attributes }: IInputFieldProps) {
  const { text } = value;
  const { validation, display, placeholder } = attributes;
  const [errorInfo, setErrorInfo] = useState<{ pass: boolean; errorMessage: string | null }>({ pass: true, errorMessage: "" });
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.value;
      if (validation) {
        const { pass, canValueChange, errorMessage } = validateValue(value, validation);
        setErrorInfo({ pass: pass, errorMessage: errorMessage });
        if (canValueChange === false) return;
      }
      const valueId = "text";
      handleField(blockId, id, valueId, value);
    },
    [blockId, id, handleField]
  );

  if (display === false) {
    return null;
  }
  return (
    <>
      <TextField
        placeholder={placeholder?.text}
        error={!errorInfo.pass}
        helperText={errorInfo.errorMessage}
        InputProps={{
          endAdornment: <InputAdornment position="end">{getValidationLimitMessage(validation, text)}</InputAdornment>,
        }}
        value={text}
        label={title}
        variant="standard"
        onChange={handleInput}
      />
    </>
  );
}

export default React.memo(InputField);
