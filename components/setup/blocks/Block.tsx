import { useState, useCallback, forwardRef } from "react"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import IconComponent from "../../common/IconComponent"
import { IBlock } from "@type/block"
import { fieldProvider } from "../fields/provider"
import { Box } from "@mui/material"
import { SETUP_BLOCK, SETUP_BLOCK_EXPAND_ICON, SETUP_BLOCK_TITLE } from "@constants/testConstants"
import { isGroupBlock } from "@store/utils"

interface IBlockProps {
  blockInfo: IBlock
  handleField: Function
  draggableProps?: any
  dragHandleProps?: any
  onRemoveBlock?: Function
}

// eslint-disable-next-line react/display-name
const Block = forwardRef(({ draggableProps, dragHandleProps, blockInfo, handleField, onRemoveBlock }: IBlockProps, ref: any) => {
  const { iconName, title, fields, id, type } = blockInfo
  const [needExpand, setNeedExpand] = useState<boolean>(false)
  const handleAccordion = useCallback((event: React.SyntheticEvent, expanded: boolean) => {
    setNeedExpand(expanded)
  }, [])
  const removeBlock = useCallback(
    (event: any) => {
      if (onRemoveBlock) {
        onRemoveBlock(id)
      }
    },
    [id]
  )
  return (
    <Accordion data-testid={SETUP_BLOCK} expanded={needExpand} onChange={handleAccordion} disableGutters ref={ref} {...draggableProps}>
      <AccordionSummary expandIcon={<IconComponent dataTestId={SETUP_BLOCK_EXPAND_ICON} icon={"ExpandMore"} />} aria-controls="panel1a-content">
        {dragHandleProps && (
          <span {...dragHandleProps}>
            <IconComponent icon={"DragIndicator"} />
          </span>
        )}
        <span style={{ marginRight: "5px" }}>
          <IconComponent icon={iconName} />
        </span>
        <Typography data-testid={SETUP_BLOCK_TITLE}>{title}</Typography>
        {isGroupBlock(type) && (
          <span style={{ marginLeft: "5px" }} onClick={removeBlock}>
            <IconComponent icon="Delete" />
          </span>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off">
          {fields.map(field => {
            const FieldComponent = fieldProvider[field.type]
            return <FieldComponent key={field.id} blockId={id} handleField={handleField} {...field} />
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
})
export default Block
