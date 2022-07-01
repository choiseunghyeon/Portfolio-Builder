import BlockContainer from "@container/BlockContainer"
import { PROJECT_TAB_PANEL } from "@constants/testConstants"

interface IProjectProps {
  value: "Project"
}

export default function Project({ value }: IProjectProps) {
  return (
    <>
      <BlockContainer dataTestId={PROJECT_TAB_PANEL} blockType={"Project"} />
    </>
  )
}
