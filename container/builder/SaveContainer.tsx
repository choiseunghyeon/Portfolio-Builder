import { savePortfolioById } from "@lib/api/builder"
import { usePortfolioeMutation } from "@lib/hooks/query"
import { Alert } from "@mui/material"
import React, { useEffect, useState } from "react"

interface ISaveContainerProps {
  portfolioId: string
}

function SaveContainer({ portfolioId }: ISaveContainerProps) {
  const [showAlert, setShowAlert] = useState(false)
  const portfolioeMutation = usePortfolioeMutation(portfolioId)

  const onClick = () => {
    portfolioeMutation.mutate()
    setShowAlert(true)
  }

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    }
  }, [showAlert])
  return (
    <>
      <button onClick={onClick}>저장</button>
      {showAlert && <Alert severity="info">저장되었습니다.</Alert>}
    </>
  )
}

export default SaveContainer
