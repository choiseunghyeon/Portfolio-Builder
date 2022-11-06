const asa = {
  id: "kakao_2266193025",
  blocks: [
    {
      blockType: "Career",
      id: 15,
      idx: "2",
      fieldValues: {
        careerMainText: "현대 자동차 12345",
        careerSubText: "Front-End",
        careerDescription: "View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리\n redux, redux-saga 적용 및 가이드 공유",
        careerTerm: {
          from: "2022-04-01",
          to: "2022-05-30",
        },
      },
    },
  ],
  blockLayout: [
    [
      {
        blockType: "Profile",
      },
    ],
    [
      {
        blockType: "Project",
      },
    ],
    [
      {
        blockType: "Portfolio",
      },
      {
        blockType: "Career",
      },
    ],
    [
      {
        blockType: "MarkDown",
      },
    ],
  ],
  blockTypeStyle: {
    Career: {
      layoutType: "default",
      columnCount: 1,
    },
    Profile: {
      layoutType: "default",
      columnCount: 1,
    },
    Project: {
      layoutType: "default",
      columnCount: 2,
    },
    MarkDown: {
      layoutType: "default",
      columnCount: 1,
    },
    Portfolio: {
      layoutType: "default",
      columnCount: 4,
    },
  },
}

const bb = {
  id: "kakao_2266193025",
  blockLayout: [
    [{ blockType: "Profile", title: "프로필" }],
    [{ blockType: "Project", title: "프로젝트" }],
    [
      { blockType: "Portfolio", title: "포트폴리오" },
      { blockType: "Career", title: "커리어" },
    ],
    [{ blockType: "MarkDown", title: "마크다운" }],
  ],
  blockTypeStyle: {
    Career: { layoutType: "default", columnCount: 1 },
    Profile: { layoutType: "default", columnCount: 1 },
    Project: { layoutType: "default", columnCount: 2 },
    MarkDown: { layoutType: "default", columnCount: 1 },
    Portfolio: { layoutType: "default", columnCount: 4 },
  },
  blocks: [
    {
      blockType: "Project",
      idx: "1",
      fieldValues: {
        projectName: "대출 추천 재개발 123",
        projectOrganigation: "현대 자동차",
        projectTerm:
          "도시·개발계획 분석 전문가인 엄재웅(서경파파)씨가 신간 ‘강남 되는 강북 부동산은 정해져 있다’(위즈덤하우스)를 펴냈다. 엄씨는 부동산에서 가장 중요한 것은 입지가 아닌 정책이 부동산 시장에서 교통\n 호재는 언제나 많은 관심을 부르는 키워드입니다. 특히 교통 호재는 계획 발표",
        projectDescription: { from: "2022-04-01", to: "2022-05-30" },
        projectSkills: "View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리\nredux, redux-saga 적용 및 가이드 공유",
        projectSkillSet: ["React"],
      },
      id: 9,
    },
  ],
}
