import { IFieldProps } from "@type/block";
import { ChangeEvent, useCallback } from "react";

export default function SampleDoubleTextField({ blockId, id, type, title, handleField }: IFieldProps) {
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
      <div>
        <input data-valueid="input" onChange={handleInput} />
        <input data-valueid="input2" onChange={handleInput} />
      </div>
    </>
  );
}
