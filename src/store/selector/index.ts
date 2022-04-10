import { createSelector } from "@reduxjs/toolkit";
import { IProfileProps } from "../../components/preview/Profile";
import { IBlock } from "../../types/block";
import { RootState } from "../index";
export const selectBlocks = (state: RootState) => state.blocks;

export const previewSelectorProvider = {
  Profile: (block: IBlock): IProfileProps => {
    const [imageField, mainTextField, subTextField] = block.fields;
    return {
      imageSrc: imageField.value.imageUrl,
      title: mainTextField.value.input,
      subtitle: subTextField.value.input,
    };
  },
};
