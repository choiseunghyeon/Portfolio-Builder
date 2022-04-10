import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IBlock } from "../../../types/block";
import IconComponent from "../../common/IconComponent";
import { fieldProvider } from "../fields/provider";

interface IBlockProps {
  blockInfo: IBlock;
  draggableProps: any;
  dragHandleProps: any;
}

// eslint-disable-next-line react/display-name
const Block = React.forwardRef(({ draggableProps, dragHandleProps, blockInfo }: IBlockProps, ref: any) => {
  const { iconName, title, fields } = blockInfo;
  return (
    <Accordion disableGutters ref={ref} {...draggableProps}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
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
          return <FieldComponent key={field.id} {...field} />;
        })}
      </AccordionDetails>
    </Accordion>
  );
});
export default Block;
