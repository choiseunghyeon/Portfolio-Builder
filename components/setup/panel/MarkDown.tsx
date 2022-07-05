import BlockContainer from "@container/BlockContainer"
import { MARKDOWN_TAB_PANEL } from "@constants/testConstants"

interface IMarkDownProps {
  value: "MarkDown"
}

export default function MarkDown({ value }: IMarkDownProps) {
  return (
    <>
      <BlockContainer dataTestId={MARKDOWN_TAB_PANEL} blockType={"MarkDown"} />
    </>
  )
}
