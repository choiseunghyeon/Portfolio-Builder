import { BlockXSType } from "@type/block";
import { ColumnCountType } from "@type/blockStyle";

export function convertColumnCountIntoXS(columnCount: ColumnCountType): BlockXSType {
  return (12 / columnCount) as BlockXSType;
}
