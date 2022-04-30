import { ICareerProps } from "@components/preview/career/Career";
import { IProfileProps } from "@components/preview/profile/Profile";
import { IProjectProps } from "@components/preview/project/Project";
import { createSelector } from "@reduxjs/toolkit";
import { BlockType, IBlock } from "@type/block";
import { RootState } from "..";
export const selectBlocks = (state: RootState) => state.blocks;
export const selectBlockStyle = (state: RootState) => state.blockStyle;
export const selectBlockById = createSelector([selectBlocks, (state: RootState, blockId: string) => blockId], (blocks, blockId) => blocks.find(block => block.id === blockId));
export const tabFold = (state: RootState) => state.tabFold;

export const selectBlocksByType = createSelector([selectBlocks, (state: RootState, blockType: BlockType) => blockType], (blocks, blockType) => blocks.filter(block => block.type === blockType));
export const selectStyleTypesByBlockType = createSelector([selectBlockStyle, (state: RootState, blockType: BlockType) => blockType], (blockStyle, blockType) => blockStyle[blockType].styleTypes);
// for memoization
const selectProfileProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock): IProfileProps => {
    const [imageField, mainTextField, subTextField] = block.fields;
    return {
      imageSrc: imageField.value.imageSrc,
      title: mainTextField.value.input,
      subtitle: subTextField.value.input,
      styleType: block.styleType,
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
      styleType: block.styleType,
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
      styleType: block.styleType,
    };
  }
);

export const previewSelectorProvider = {
  Profile: selectProfileProps,
  Project: selectProjectProps,
  Career: selectCareerProps,
};
