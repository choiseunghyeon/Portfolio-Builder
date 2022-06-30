import BlockContainer from "@container/BlockContainer"
import { PORTFOLIO_TAB_PANEL } from "@constants/testConstants"

interface IPortfolioProps {
  value: "Portfolio"
}

export default function Portfolio({ value }: IPortfolioProps) {
  console.log(value)
  return <BlockContainer dataTestId={PORTFOLIO_TAB_PANEL} blockType={"Portfolio"} />
}
