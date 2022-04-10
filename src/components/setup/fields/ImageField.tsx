import { ChangeEvent, useCallback } from "react";
import { IFieldProps } from "../../../types/block";

export default function ImageField({ blockId, id, type, title, handleField }: IFieldProps) {
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      handleField(blockId, id, "imageUrl", event.target.value);
    },
    [blockId, id, handleField]
  );
  return (
    <>
      <div>{title}</div>
      <input onChange={handleInput} />
    </>
  );
}
