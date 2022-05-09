import BlockContainer from "@container/BlockContainer";

interface IPortfolioProps {
  value: "Portfolio";
}

export default function Portfolio({ value }: IPortfolioProps) {
  console.log(value);
  return <BlockContainer blockType={"Portfolio"} />;
}
