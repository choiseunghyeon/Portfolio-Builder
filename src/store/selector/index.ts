import { createSelector } from "@reduxjs/toolkit";
import { IBlock } from "../../types/block";
import { RootState } from "../index";
export const selectBlocks = (state: RootState) => state.blocks;
