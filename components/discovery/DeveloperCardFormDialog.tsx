import React, { useState } from "react"
import {
  Button,
  Dialog,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  OutlinedInput,
  Box,
  Chip,
  Typography,
  Grid,
  TextField,
  Divider,
} from "@mui/material"
import AlignGroup from "@components/common/form/AlignGroup"
import FormInput from "@components/common/form/FormInput"

function DeveloperCardFormDialog({ onClose, open }) {
  return (
    <Dialog onClose={onClose} open={open}>
      <Grid container spacing={2} sx={{ padding: 3 }} direction={"column"} justifyContent="center" alignItems="left">
        <Grid item>
          <Typography variant="h5">프로필 카드</Typography>
        </Grid>
        <Grid item>
          <FormInput title={"이름"} required>
            <TextField fullWidth required placeholder="박필봉" variant="outlined" />
          </FormInput>
        </Grid>
        <Grid item>
          <SelectChips />
        </Grid>
        <Grid item>
          <RadioButtons />
        </Grid>

        <Grid item>
          <FormInput title={"개인 블로그 URL"}>
            <TextField fullWidth required placeholder="https://so-so.dev/" variant="outlined" />
          </FormInput>
        </Grid>
        <Grid item alignSelf={"flex-end"} sx={{ marginTop: 1 }}>
          <AlignGroup>
            <Button variant="contained" sx={{ backgroundColor: "white", color: "red" }}>
              닫기
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "red", color: "white" }}>
              완료
            </Button>
          </AlignGroup>
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default DeveloperCardFormDialog

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const names = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard", "Omar Alexander", "Carlos Abbott", "Miriam Wagner", "Bradley Wilkerson", "Virginia Andrews", "Kelly Snyder"]

function SelectChips() {
  const [personName, setPersonName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  return (
    <FormInput title={"기술 스택"} required>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        fullWidth
        multiple
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={selected => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}>
        {names.map(name => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormInput>
  )
}

function RadioButtons() {
  const [selectedValue, setSelectedValue] = useState<string>("yes")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }
  return (
    <>
      <FormInput title={"사이드 프로젝트 멤버 (연락 희망)"}>
        <Radio id="yes-radio" checked={selectedValue === "yes"} onChange={handleChange} value="yes" name="radio-buttons" inputProps={{ "aria-label": "A" }} />
        <label htmlFor="yes-radio">Yes</label>
        <Radio id="no-radio" checked={selectedValue === "no"} onChange={handleChange} value="no" name="radio-buttons" inputProps={{ "aria-label": "B" }} />
        <label htmlFor="no-radio">No</label>
      </FormInput>
    </>
  )
}
