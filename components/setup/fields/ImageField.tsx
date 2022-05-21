import { ChangeEvent, useCallback } from "react";
import { IFieldProps, IImageFieldValue } from "@type/field";

interface IImageFieldProps extends IFieldProps {
  value: IImageFieldValue;
}

export default function ImageField({ blockId, id, type, value, title, handleField, attributes }: IImageFieldProps) {
  const { imageSrc } = value;
  const { display } = attributes;
  const handleInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const valueId = event.target.dataset.valueid;
      const value = event.target.value;
      handleField(blockId, id, valueId, value);
    },
    [blockId, id, handleField]
  );
  if (display === false) {
    return null;
  }
  return (
    <>
      <div>{title}</div>
      <input data-valueid="imageSrc" value={imageSrc} onChange={handleInput} />
    </>
  );
}
