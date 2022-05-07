import { ICareerProps } from "@components/preview/career/Career";
import { IProfileProps } from "@components/preview/profile/Profile";
import { IProjectProps } from "@components/preview/project/Project";
import { createSelector } from "@reduxjs/toolkit";
import { BlockType, IBlock } from "@type/block";
import { RootState } from "..";
export const selectBlocks = (state: RootState) => state.blocks;
export const selectBlockStyle = (state: RootState) => state.blockTypeStyle;

export const selectBlockIndexById = createSelector([selectBlocks, (state: RootState, blockId: string) => blockId], (blocks, blockId) => blocks.findIndex(block => block.id === blockId));
export const selectBlockById = createSelector([selectBlocks, (state: RootState, blockId: string) => blockId], (blocks, blockId) => blocks.find(block => block.id === blockId));
export const tabFold = (state: RootState) => state.tabFold;

export const selectBlocksByType = createSelector([selectBlocks, (state: RootState, blockType: BlockType) => blockType], (blocks, blockType) => blocks.filter(block => block.type === blockType));
export const selectBlockTypeStyleByBlockType = createSelector([selectBlockStyle, (state: RootState, blockType: BlockType) => blockType], (blockStyle, blockType) => blockStyle[blockType]);

export const selectBlockLayout = (state: RootState) => state.blockLayout;

// for memoization
const selectProfileProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock): IProfileProps => {
    const [imageField, mainTextField, subTextField] = block.fields;
    return {
      imageSrc: imageField.value.imageSrc,
      title: mainTextField.value.input,
      subtitle: subTextField.value.input,
      attributes: {
        styleType: block.style.styleType,
      },
    };
  }
);

const selectProjectProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock): IProjectProps => {
    const [nameField, organigationField, termField, descriptionField, skillsFeild] = block.fields;
    return {
      name: nameField.value.input,
      organigation: organigationField.value.input,
      description: descriptionField.value.multiLineInput,
      term: `${termField.value.from} ~ ${termField.value.to}`,
      skills: skillsFeild.value.multiLineInput,
      attributes: {
        styleType: block.style.styleType,
      },
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
      attributes: {
        styleType: block.style.styleType,
      },
    };
  }
);

export const previewSelectorProvider = {
  Profile: selectProfileProps,
  Project: selectProjectProps,
  Career: selectCareerProps,
};
