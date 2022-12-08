import { getPortfolioBlocksForRequest } from "@store/defaultData/converter"
import { getChangedPortfolioInfo, getUpdatedPortfolio } from "@store/selector/utils"
import store from "store"
import { API_URL, http } from "./http"

export const fetchPortfolio = (portfolioId: string) => {
  return http.get(`${API_URL}/api/v1/builder/${portfolioId}`)
  // return axios.get(`http://localhost:4000/portfolio/`)
}

export const fetchPortfolioList = () => {
  return http.get(`http://localhost:4000/profileList/`)
}

export const savePortfolioById = async () => {
  const state = store.getState()
  const { baseline, edit } = state.portfolio

  const changedInfo = getChangedPortfolioInfo(baseline, edit)
  const { updatedPortfolioInfo, deletedBlockInfo } = getUpdatedPortfolio(edit, changedInfo)
  const updatePortfolio = {
    id: edit.id,
    ...updatedPortfolioInfo,
  }

  debugger

  await http.post(`${API_URL}/api/v1/builder`, updatePortfolio)

  if (deletedBlockInfo.length > 0) {
    for await (const blockInfo of deletedBlockInfo) {
      await http.put(`${API_URL}/api/v1/builder`, { id: blockInfo.blockId, blockType: blockInfo.blockType })
    }
    // await axios.delete(`http://3.35.186.99:8080/api/builder`, deletedBlockInfo)
  }
}
