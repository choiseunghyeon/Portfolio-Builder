import React, { ChangeEvent, useCallback, useState } from "react"
import { IAutoCompleteValue, IFieldProps, IFieldValidation, ITextFieldValue } from "@type/field"
import { Autocomplete, Box, InputAdornment, TextField } from "@mui/material"
import { getValidationLimitMessage, validateValue } from "@store/utils"
import { AUTO_COMPLETE_FIELD_TEST_ID } from "@type/constants"

interface IInputFieldProps extends IFieldProps {
  value: IAutoCompleteValue
}

function AutoCompleteField({ blockId, id, type, value, title, handleField, attributes }: IInputFieldProps) {
  const { textList, selectedTextList } = value
  const { validation, display, placeholder } = attributes
  const [errorInfo, setErrorInfo] = useState<{ pass: boolean; errorMessage: string | null }>({ pass: true, errorMessage: "" })
  const handleInput = useCallback(
    (event: any, selectedTextList: string[]) => {
      debugger
      // if (validation) {
      //   const { pass, canValueChange, errorMessage } = validateValue(value, validation);
      //   setErrorInfo({ pass: pass, errorMessage: errorMessage });
      //   if (canValueChange === false) return;
      // }
      const valueId = "selectedTextList"
      handleField(blockId, id, valueId, selectedTextList)
    },
    [blockId, id, handleField]
  )

  if (display === false) {
    return null
  }
  return (
    <>
      <Autocomplete
        data-testid={AUTO_COMPLETE_FIELD_TEST_ID}
        multiple
        id="size-small-standard-multi"
        options={textList}
        getOptionLabel={option => option}
        defaultValue={selectedTextList}
        // value={selectedTextList}
        onChange={handleInput}
        renderInput={params => <TextField {...params} variant="standard" label={title} placeholder={placeholder?.text} error={!errorInfo.pass} helperText={errorInfo.errorMessage} />}
      />
    </>
  )
}

export default React.memo(AutoCompleteField)
