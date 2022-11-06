import { savePortfolioById } from "@lib/api/builder"
import { usePortfolioeMutation } from "@lib/hooks/query"
import React from "react"

interface ISaveContainerProps {
  portfolioId: string
}
function SaveContainer({ portfolioId }: ISaveContainerProps) {
  const portfolioeMutation = usePortfolioeMutation(portfolioId)
  const onClick = () => {
    portfolioeMutation.mutate()
  }
  return <button onClick={onClick}>저장</button>
}

export default SaveContainer
