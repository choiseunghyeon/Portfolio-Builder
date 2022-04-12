import { createSelector } from "@reduxjs/toolkit";
import { IProfileProps } from "@components/preview/Profile";
import { IBlock } from "@type/block";
import { RootState } from "..";
import { IProjectProps } from "@components/preview/Project";
import { ICareerProps } from "@components/preview/Career";
export const selectBlocks = (state: RootState) => state.blocks;
export const selectBlockById = createSelector([selectBlocks, (state: RootState, blockId: string) => blockId], (blocks, blockId) => blocks.find(block => block.id === blockId));

// for memoization
const selectProfileProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock): IProfileProps => {
    const [imageField, mainTextField, subTextField] = block.fields;
    return {
      imageSrc: imageField.value.imageSrc,
      title: mainTextField.value.input,
      subtitle: subTextField.value.input,
    };
  }
);

const selectProjectProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock): IProjectProps => {
    return {
      name: "aa",
      organigation: "asdf",
      description: "sdfs",
      skills: " asdf",
      term: "sdfas",
    };
  }
);

const selectCareerProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock): ICareerProps => {
    return {
      title: "TITLE",
      subtitle: "SUB TITLE",
      detail: "DEATIL",
    };
  }
);

export const previewSelectorProvider = {
  Profile: selectProfileProps,
  Project: selectProjectProps,
  Career: selectCareerProps,
};
