import { ChangeEvent, useCallback } from "react";
import { IFieldProps } from "../../../types/block";

export default function TextField({ blockId, id, type, title, handleField }: IFieldProps) {
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      handleField(blockId, id, "input", event.target.value);
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
