import { ChangeEvent, useCallback, useState } from "react"
import { IFieldProps, IMultiLineTextFieldValue } from "@type/field"
import { Box, InputAdornment, TextField } from "@mui/material"
import { getValidationLimitMessage, validateValue } from "@store/utils"
import { MULTI_LINE_INPUT_FIELD_TEST_ID } from "@type/constants"

interface IMultiLineInputFieldProps extends IFieldProps {
  value: IMultiLineTextFieldValue
}

export default function MultiLineInputField({ blockId, id, type, value, title, handleField, attributes }: IMultiLineInputFieldProps) {
  const { multiLineText } = value
  const { display, placeholder, validation } = attributes
  const [errorInfo, setErrorInfo] = useState<{ pass: boolean; errorMessage: string | null }>({ pass: true, errorMessage: "" })
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const valueId = "multiLineText"
      const value = event.target.value
      if (validation) {
        const { pass, canValueChange, errorMessage } = validateValue(value, validation)
        setErrorInfo({ pass: pass, errorMessage: errorMessage })
        if (canValueChange === false) return
      }
      handleField(blockId, id, valueId, value)
    },
    [blockId, id, handleField]
  )

  if (display === false) {
    return null
  }
  return (
    <>
      <TextField
        data-testid={MULTI_LINE_INPUT_FIELD_TEST_ID}
        placeholder={placeholder?.multiLineText}
        InputProps={{
          endAdornment: <InputAdornment position="end">{getValidationLimitMessage(validation, multiLineText)}</InputAdornment>,
        }}
        label={title}
        multiline
        value={multiLineText}
        onChange={handleInput}
      />
    </>
  )
}
