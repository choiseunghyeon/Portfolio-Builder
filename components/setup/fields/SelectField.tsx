import React, { ChangeEvent, useCallback, useState } from "react"
import { IFieldProps, ISelectFiedlValue } from "@type/field"
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { SELECT_FIELD_TEST_ID } from "@type/constants"

interface ISelectFieldProps extends IFieldProps {
  value: ISelectFiedlValue
}

function SelectField({ blockId, id, type, value, title, handleField, attributes }: ISelectFieldProps) {
  const { selectList, selectedValue } = value
  const { display } = attributes

  const handleChange = useCallback(
    (event: SelectChangeEvent): void => {
      const valueId = "selectedValue"
      const value = event.target.value
      handleField(blockId, id, valueId, value)
    },
    [blockId, id, handleField]
  )

  if (display === false) {
    return null
  }

  return (
    <>
      <FormControl data-testid={SELECT_FIELD_TEST_ID} fullWidth variant="filled">
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={selectedValue} label="Age" onChange={handleChange}>
          {selectList.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default React.memo(SelectField)
