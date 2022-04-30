import { BlockType } from "./block";
export type ColumnCountType = 1 | 2 | 3 | 4;

export type EachBlockTypeStyle = {
  [key in BlockType]: {
    columnCount: ColumnCountType;
    changableColumnCount: number[];
    styleTypes: string[];
  };
};

export interface IBlockTypeStyle {
  columnCount: ColumnCountType;
  changableColumnCount: number[];
  styleTypes: string[];
}
