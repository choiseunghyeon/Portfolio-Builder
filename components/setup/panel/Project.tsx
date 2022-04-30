import Tab from "@mui/material/Tab";
import { SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import TabPanel from "./TabPanel";
import BlockContainer from "@container/BlockContainer";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, Grid, Stack, TextField } from "@mui/material";
import IconComponent from "@components/common/IconComponent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
interface IProjectProps {
  value: "Project";
  onAddBlock: Function;
}

const defaultProejctName = "프로젝트";
export default function Project({ value, onAddBlock }: IProjectProps) {
  const [projectName, setProjectName] = useState(defaultProejctName);
  const handleProjectName = (event: any) => {
    setProjectName(event.target.value);
  };

  const handleAddBlock = (event: any) => {
    setProjectName(defaultProejctName);
    onAddBlock(value, projectName);
  };

  return (
    <>
      <BlockContainer blockType={value} />
      <Grid sx={{ marginTop: "10px" }} container justifyContent="center" alignItems="center">
        <Grid item xs={8}>
          <TextField id="standard-basic" label="프로젝트 이름" value={projectName} onChange={handleProjectName} variant="standard" />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" startIcon={<IconComponent icon="Add" />} onClick={handleAddBlock}>
            추가
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
