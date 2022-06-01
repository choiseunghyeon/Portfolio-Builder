import { ICareerProps } from "@components/preview/career/Career";
import { IPortfolioProps } from "@components/preview/portfolio/Portfolio";
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
  (block: IBlock, needDummyData?: boolean) => needDummyData,
  (block: IBlock, needDummyData?: boolean): IProfileProps => {
    const [imageField, mainTextField, subTextField] = block.fields;

    if (needDummyData) {
      return {
        imageSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
        title: "Front End Developer",
        subtitle: `안녕하세요 :) 서핏 팀의 디자이너 박소연입니다. 
        저는 좋은 디자인이 사용자의 삶을 달라지게 하고 나아가서는 사회를
        더 나아가서는 세상을 바꿀 수 있다고 생각합니다.`,
        attributes: {
          layoutType: block.style.layoutType,
        },
      };
    }
    return {
      imageSrc: imageField.value.imageSrc,
      title: mainTextField.value.input,
      subtitle: subTextField.value.input,
      attributes: {
        layoutType: block.style.layoutType,
      },
    };
  }
);

const selectProjectProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock, needDummyData?: boolean) => needDummyData,
  (block: IBlock, needDummyData?: boolean): IProjectProps => {
    const [nameField, organigationField, termField, descriptionField, skillsFeild] = block.fields;
    const termValue = getTermValue(termField.value.from, termField.value.to);
    if (needDummyData) {
      return {
        name: "대출 추천 재개발",
        organigation: "현대 자동차",
        description: `도시·개발계획 분석 전문가인 엄재웅(서경파파)씨가 신간 ‘강남 되는 강북 부동산은 정해져 있다’(위즈덤하우스)를 펴냈다. 엄씨는 부동산에서 가장 중요한 것은 입지가 아닌 정책이 부동산 시장에서 교통
        호재는 언제나 많은 관심을 부르는 키워드입니다. 특히 교통 호재는 계획 발표`,
        term: "2021.04 ~ 2021.08",
        skills: `- View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리
        - redux, redux-saga 적용 및 가이드 공유`,
        attributes: {
          layoutType: block.style.layoutType,
        },
      };
    }
    return {
      name: nameField.value.input,
      organigation: organigationField.value.input,
      description: descriptionField.value.multiLineInput,
      term: termValue,
      skills: skillsFeild.value.multiLineInput,
      attributes: {
        layoutType: block.style.layoutType,
      },
    };
  }
);

const selectCareerProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock, needDummyData?: boolean) => needDummyData,
  (block: IBlock, needDummyData?: boolean): ICareerProps => {
    const [organigationField, roleField, termField, descriptionField] = block.fields;
    const termValue = getTermValue(termField.value.from, termField.value.to);
    if (needDummyData) {
      return {
        organigation: "현대 자동차",
        role: "Front-End",
        term: "2021.04 ~ 2021.08",
        description: `- PC/모바일/인공지능 스피커 등 다양한 기기에 맞는 일관된 디자인 구축에시 말말말말
      - 어린이, 중장년 등 모든 연령대의 사용자를 고려한 인터렉선 재설계 몰라몰라 아아아아`,
        attributes: {
          layoutType: block.style.layoutType,
        },
      };
    }
    return {
      organigation: organigationField.value.input,
      role: roleField.value.input,
      term: termValue,
      description: descriptionField.value.multiLineInput,
      attributes: {
        layoutType: block.style.layoutType,
      },
    };
  }
);

const selectPortfolioProps = createSelector(
  (block: IBlock) => block,
  (block: IBlock, needDummyData?: boolean) => needDummyData,
  (block: IBlock, needDummyData?: boolean): IPortfolioProps => {
    const [mediaField, linkField, titleField, contentField] = block.fields;
    if (needDummyData) {
      return {
        mediaSrc: "https://image.shutterstock.com/image-photo/osaka-japan-june-24-2017-600w-669537982.jpg",
        title: "MZ세대 언어",
        content: `어남선생 류수영, 레시피 여왕 박복순 박솔미, 국민아들 찬또배기 이찬원이 치열한 경쟁을 예고한 류진과 폭풍 성장한 두 아들 찬형X찬호 형제 삼부자가 출사표를 던졌다.`,
        link: `http://sports.hankooki.com/news/articleView.html?idxno=6798068`,
        attributes: {
          layoutType: block.style.layoutType,
        },
      };
    }
    return {
      mediaSrc: mediaField.value.imageSrc,
      link: linkField.value.input,
      title: titleField.value.input,
      content: contentField.value.multiLineInput,
      attributes: {
        layoutType: block.style.layoutType,
      },
    };
  }
);

type PreviewSelectorProviderType = {
  [key in BlockType]: Function;
};
export const previewSelectorProvider: PreviewSelectorProviderType = {
  Profile: selectProfileProps,
  Project: selectProjectProps,
  Career: selectCareerProps,
  Portfolio: selectPortfolioProps,
};

function getTermValue(from, to) {
  if (from && to) {
    return `${from} ~ ${to}`;
  } else if (from) {
    return `${from} ~ 현재 진행 중`;
  } else {
    return "";
  }
}
