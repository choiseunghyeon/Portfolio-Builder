import { Box, Grid } from "@mui/material"
import React, { useState } from "react"
import Pagination from "./Pagination"

const arr = [1, 2, 3, 4, 5, 6]

function logsByCurrentPage(logs, logPerPage, currentPage) {
  const currentLogIndex = (currentPage - 1) * logPerPage
  return logs.slice(currentLogIndex, currentLogIndex + logPerPage)
}

interface ITechBlogLogBox {
  logs: any[]
}
function TechBlogLogBox({ logs }: ITechBlogLogBox) {
  const logPerPage = 2
  const totalPage = Math.ceil(logs.length / logPerPage)
  const [currentPage, setCurrentPage] = useState(1)
  const targetLogs = logsByCurrentPage(logs, logPerPage, currentPage)

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const handleBack = () => {
    setCurrentPage(currentPage - 1)
  }
  return (
    <>
      <Box sx={{ height: "300px", backgroundColor: "#FFFAEA", marginBottom: 1 }}>
        <Grid container justifyContent={"space-evenly"} alignItems={"center"} sx={{ height: "100%" }}>
          {targetLogs.map(log => (
            <Grid item key={log}>
              <Box>{log}</Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Pagination currentPage={currentPage} totalPage={totalPage} handleBack={handleBack} handleNext={handleNext} />
    </>
  )
}

export default TechBlogLogBox
