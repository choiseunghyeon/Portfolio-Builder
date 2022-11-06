import { getPortfolioBlocksForRequest } from "@store/defaultData/converter"
import { getChangedPortfolioInfo, getUpdatedPortfolio } from "@store/selector/utils"
import axios from "axios"
import store from "store"
import { API_URL } from "./http"

export const fetchPortfolio = (portfolioId: string) => {
  return axios.get(`${API_URL}/api/v1/builder/${portfolioId}`)
  // return axios.get(`http://localhost:4000/portfolio/`)
}

export const fetchPortfolioList = () => {
  return axios.get(`http://localhost:4000/profileList/`)
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

  await axios.post(`${API_URL}/api/v1/builder`, updatePortfolio)

  // if (deletedBlockInfo.length > 0) {
  //   await axios.delete(`http://3.35.186.99:8080/api/builder`, deletedBlockInfo)
  // }
}
