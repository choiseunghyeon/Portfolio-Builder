import { ChangeEvent, useCallback } from "react";
import { IFieldProps } from "@type/block";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// date-fns
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box } from "@mui/material";

function getToday(date) {
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + "-" + month + "-" + day;
}

export default function DateField({ blockId, id, type, value, title, handleField }: IFieldProps) {
  const { from, to } = value;
  const handleFromDate = useCallback(
    (newDate): void => {
      const newValue = getToday(newDate);
      handleField(blockId, id, "from", newValue);
    },
    [blockId, id, handleField]
  );
  const handleToDate = useCallback(
    (newDate): void => {
      const newValue = getToday(newDate);
      handleField(blockId, id, "to", newValue);
    },
    [blockId, id, handleField]
  );
  return (
    <>
      <div>{title}</div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker label="시작 날짜" value={from} onChange={handleFromDate} renderInput={params => <TextField {...params} />} />
        <DatePicker label="종료 날짜" value={to} onChange={handleToDate} renderInput={params => <TextField {...params} />} />
      </LocalizationProvider>
    </>
  );
}
