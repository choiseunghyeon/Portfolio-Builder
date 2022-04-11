import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import IconComponent from "../../common/IconComponent";
import { IBlock } from "@type/block";
import { fieldProvider } from "../fields/provider";

interface IBlockProps {
  blockInfo: IBlock;
  handleField: Function;
  draggableProps: any;
  dragHandleProps: any;
}

// eslint-disable-next-line react/display-name
const Block = React.forwardRef(({ draggableProps, dragHandleProps, blockInfo, handleField }: IBlockProps, ref: any) => {
  const { iconName, title, fields, id } = blockInfo;
  return (
    <Accordion disableGutters ref={ref} {...draggableProps}>
      <AccordionSummary expandIcon={<IconComponent icon={"ExpandMore"} />} aria-controls="panel1a-content">
        <span {...dragHandleProps}>
          <IconComponent icon={"DragIndicator"} />
        </span>
        <span>
          <IconComponent icon={iconName} />
        </span>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {fields.map(field => {
          const FieldComponent = fieldProvider[field.type];
          return <FieldComponent key={field.id} blockId={id} handleField={handleField} {...field} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
});
export default Block;
