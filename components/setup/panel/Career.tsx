import BlockContainer from "@container/BlockContainer"
import { CAREER_TAB_PANEL } from "@constants/testConstants"

interface IProfileProps {
  value: "Career"
}

export default function Career({ value }: IProfileProps) {
  return (
    <>
      <BlockContainer dataTestId={CAREER_TAB_PANEL} blockType={"Career"} />
    </>
  )
}
