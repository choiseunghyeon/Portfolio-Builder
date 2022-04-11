import { ChangeEvent, useCallback } from "react";
import { IFieldProps } from "@type/block";

export default function ImageField({ blockId, id, type, value, title, handleField }: IFieldProps) {
  const { imageSrc } = value;
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const valueId = event.target.dataset.valueid;
      const value = event.target.value;
      handleField(blockId, id, valueId, value);
    },
    [blockId, id, handleField]
  );
  return (
    <>
      <div>{title}</div>
      <input data-valueid="imageSrc" value={imageSrc} onChange={handleInput} />
    </>
  );
}
