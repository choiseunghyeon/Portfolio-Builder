import { createSelector } from "@reduxjs/toolkit";
import { IProfileProps } from "@components/preview/Profile";
import { BlockType, IBlock } from "@type/block";
import { RootState } from "..";
import { IProjectProps } from "@components/preview/Project";
import { ICareerProps } from "@components/preview/Career";
export const selectBlocks = (state: RootState) => state.blocks;
export const selectBlockById = createSelector([selectBlocks, (state: RootState, blockId: string) => blockId], (blocks, blockId) => blocks.find(block => block.id === blockId));
export const tabFold = (state: RootState) => state.tabFold;

export const selectBlockByType = createSelector([selectBlocks, (state: RootState, blockType: BlockType) => blockType], (blocks, blockType) => blocks.filter(block => block.type === blockType));

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
      organigation: "회사",
      role: "Front End Developer",
      term: "2021-12 - 2022-12",
      description: "웹 개발 및 유지보수",
    };
  }
);

export const previewSelectorProvider = {
  Profile: selectProfileProps,
  Project: selectProjectProps,
  Career: selectCareerProps,
};
