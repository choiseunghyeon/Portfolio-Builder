import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import Block from "./setup/blocks/Block";
import { BlockType, IBlock } from "@type/block";
import { previewProvider } from "./preview/provider";
import { previewSelectorProvider } from "@store/selector";
import { Checkbox, Divider, FormControl, Grid, InputLabel, ListItem, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent } from "@mui/material";
import IconComponent from "./common/IconComponent";
import { ColumnCountType, IBlockTypeStyle } from "@type/blockStyle";
import { changeBlockTypeStyle } from "@store/root";

interface IStylePanel extends IBlockTypeStyle {
  block: IBlock;
  handleBlockStyleType: Function;
}
// 드래그 요소 생성
const StylePanel = ({ block, styleType, changableStyleTypes, columnCount, changableColumnCount, handleBlockStyleType }: IStylePanel) => {
  const currentStyleType = styleType;
  const PreviewComponent = previewProvider[block.type];
  const previewProps = previewSelectorProvider[block.type](block);

  const handleChange = (event: SelectChangeEvent) => {
    const newColumnCount = parseInt(event.target.value);

    if (newColumnCount > 4) return;
    handleBlockStyleType({ columnCount: newColumnCount });
  };

  return (
    <>
      <Grid container spacing={1}>
        {changableColumnCount.length > 0 && (
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">열 정의</InputLabel>
              <Select labelId="demo-simple-select-autowidth-label" id="demo-simple-select-autowidth" value={`${columnCount}`} onChange={handleChange} autoWidth label="열 정의">
                {changableColumnCount.map((column, index) => (
                  <MenuItem key={index} value={`${column}`}>
                    {column}열
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {changableStyleTypes.map((changableStyleType, index) => {
          const attributes = {
            styleType: changableStyleType,
          };
          return (
            <>
              <Grid item xs={12} key={index}>
                <Checkbox
                  checked={changableStyleType === currentStyleType}
                  onChange={() => handleBlockStyleType({ styleType: changableStyleType })}
                  icon={<IconComponent icon="FavoriteBorder" />}
                  checkedIcon={<IconComponent icon="Favorite" />}
                />
                <PreviewComponent key={block.id} {...previewProps} attributes={attributes} />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default StylePanel;
