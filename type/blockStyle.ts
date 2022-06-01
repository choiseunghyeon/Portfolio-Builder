import { BlockType } from "./block";
export type ColumnCountType = 1 | 2 | 3 | 4;

export type EachBlockTypeStyle = {
  [key in BlockType]: IBlockTypeStyle;
};

export interface IBlockTypeStyle {
  columnCount: ColumnCountType;
  layoutType: string;
}
