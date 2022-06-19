import { ChangeEvent, useCallback } from "react"
import { IDateFieldValue, IFieldProps } from "@type/field"
import TextField from "@mui/material/TextField"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { Box } from "@mui/material"
import { DATE_FIELD_FROM_TEST_ID, DATE_FIELD_TO_TEST_ID } from "@type/constants"

function getToday(date) {
  if (!date || date === "") return ""
  var year = date.getFullYear()
  var month = ("0" + (1 + date.getMonth())).slice(-2)
  var day = ("0" + date.getDate()).slice(-2)

  return year + "-" + month + "-" + day
}

interface IDateFieldProps extends IFieldProps {
  value: IDateFieldValue
}

export default function DateField({ blockId, id, type, value, title, handleField, attributes }: IDateFieldProps) {
  const { from, to } = value
  const { display, placeholder } = attributes
  const handleFromDate = useCallback(
    (newDate): void => {
      const newValue = getToday(newDate)
      handleField(blockId, id, "from", newValue)
    },
    [blockId, id, handleField]
  )
  const handleToDate = useCallback(
    (newDate): void => {
      const newValue = getToday(newDate)
      handleField(blockId, id, "to", newValue)
    },
    [blockId, id, handleField]
  )

  if (display === false) {
    return null
  }
  return (
    <>
      <div>{title}</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker label={placeholder?.from} value={from} onChange={handleFromDate} renderInput={params => <TextField data-testid={DATE_FIELD_FROM_TEST_ID} {...params} />} />
        <DatePicker label={placeholder?.to} value={to} onChange={handleToDate} renderInput={params => <TextField data-testid={DATE_FIELD_TO_TEST_ID} {...params} />} />
      </LocalizationProvider>
    </>
  )
}
