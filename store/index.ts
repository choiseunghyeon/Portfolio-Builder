import { configureStore } from "@reduxjs/toolkit"
// import { combineReducers } from "redux";
import rootReducer from "./root"
const store = configureStore({ reducer: rootReducer, devTools: true })

export type RootState = ReturnType<typeof rootReducer>

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

export type AppDispatch = typeof store.dispatch
export default store
