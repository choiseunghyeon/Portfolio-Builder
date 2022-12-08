// UI에서 넘겨주는 update portfolio 값
// server에 맞는 형태여야함 (default value 제거)
const a = {
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
      id: 14,
      type: "Project",
      title: "이카운트 5.0 123",
      iconName: "Computer",
      fields: [
        {
          id: "ad0e2c08-a2e9-49f0-bf24-d5d58d490e1f",
          type: "Text",
          title: "프로젝트",
          value: { text: "이카운트 5.0 123" },
          attributes: { placeholder: { text: "예) 대출 추천 재개발" }, validation: { limit: 50 } },
        },
        { id: "78263071-6359-42cc-8d9b-512edc82df6a", type: "Text", title: "소속 / 기관", value: { text: "EFA" }, attributes: { placeholder: { text: "예) Banksalad" }, validation: { limit: 50 } } },
        {
          id: "e04c8760-a719-4892-9234-965cc6783315",
          type: "Date",
          title: "기간",
          value: { from: "2022-04-01", to: "2022-05-30" },
          attributes: { placeholder: { from: "시작 날짜", to: "종료 날짜" } },
        },
        {
          id: "b61dbfe7-b7b6-43ca-9d98-0557b667d066",
          type: "MultiLineText",
          title: "배경 / 설명",
          value: {
            multiLineText:
              "도시·개발계획 분석 전문가인 엄재웅(서경파파)씨가 신간 ‘강남 되는 강북 부동산은 정해져 있다’(위즈덤하우스)를 펴냈다. 엄씨는 부동산에서 가장 중요한 것은 입지가 아닌 정책이 부동산 시장에서 교통\n 호재는 언제나 많은 관심을 부르는 키워드입니다. 특히 교통 호재는 계획 발표",
          },
          attributes: {
            placeholder: {
              multiLineText:
                "예) 레거시 등으로 개발 단계에서 많은 에러가 발생하는 문제가 있었습니다. 이에 재개발을 제안하여 비즈니스 로직을 좀 더 파악하기 쉽고 빠르게 임팩를 낼 수 있도록 하는데 기여하였습니다.",
            },
            validation: { limit: 200 },
          },
        },
        {
          id: "52be8cbc-03af-428f-a148-13822bfe4db9",
          type: "MultiLineText",
          title: "Skills",
          value: { multiLineText: "View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리\nredux, redux-saga 적용 및 가이드 공유" },
          attributes: { placeholder: { multiLineText: "- View와 Data를 분리하고 모든 비즈니스 로직을 redux, middleware에서 처리" }, validation: { limit: 100 } },
        },
        {
          id: "534c7dad-04d0-44c0-a2c4-329c2258b263",
          type: "AutoCompleteText",
          title: "Skill Set",
          value: { textList: [], selectedTextList: ["React"] },
          attributes: { placeholder: { text: "React" }, autocompleteRequest: "skillSet" },
        },
      ],
    },
  ],
}

const b = {
  id: "kakao_2266193025",
  blocks: [
    {
      blockType: "Project",
      id: 14,
      idx: "2",
      fieldValues: {
        projectName: "이카운트 5.0",
        projectOrganigation: "EFA",
        projectDescription:
          "도시·개발계획 분석 전문가인 엄재웅(서경파파)씨가 신간 ‘강남 되는 강북 부동산은 정해져 있다’(위즈덤하우스)를 펴냈다. 엄씨는 부동산에서 가장 중요한 것은 입지가 아닌 정책이 부동산 시장에서 교통\n 호재는 언제나 많은 관심을 부르는 키워드입니다. 특히 교통 호재는 계획 발표",
        projectTerm: {
          from: "2022-04-01",
          to: "2022-05-30",
        },
        projectSkills: "View와 Data를 분리하고 모든 비즈니스 로직을 redux middleware에서 처리\nredux, redux-saga 적용 및 가이드 공유",
        projectSkillSet: ["React"],
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

const markdown = {
  id: "kakao_2266193025",
  blockLayout: [
    [{ title: "프로필", blockType: "Profile" }],
    [{ title: "프로젝트", blockType: "Project" }],
    [
      { title: "포트폴리오", blockType: "Portfolio" },
      { title: "커리어", blockType: "Career" },
    ],
    [{ title: "마크다운", blockType: "MarkDown" }],
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
      blockType: "MarkDown",
      idx: "2",
      fieldValues: {
        markdownText:
          "# Multi Project Extension 제작 회고\n\n## 제작 동기\n\n현재 다니고 있는 ECount 회사는 Client/Server Framework를 자체 제작해서 사용한다.  \n신규 Framework를 제작 중인데 핵심 개념은 모듈화다.  \n가능한 모듈로 분리하고 조립하여 하나의 기능, 사이트를 제작한다는 컨셉이다.\n\n이런 식의 개발 방식에는 여러 이점이 있다.\n\n1. 코드의 재사용\n2. 모듈이 담당하는 로직에만 집중\n3. 테스트하기 좋다.\n\n지금은 개발 초기라 개발 및 관리해야 하는 모듈이 굉장히 많다.  \n문제는 각 모듈마다 Visual Studio Code를 켜서 개발을 했는데  \n켜져 있는 Visual Studio Code가 많아서 특정 모듈을 찾기 힘들었다.\n\n이 불편함을 해소하기 위해 Multi Project Extension을 제작했다.\n\n## 사용자\n\n이 불편함을 가지고 있는게 우리 회사 뿐만 있다고 생각하지는 않아서 최대한 많은 사람을 타겟으로 제작을 했다.  \n그래서 코드 구현이나 기능이 ECount 회사 종속적이지는 않다.\n\n현재는 신규 Framework 제작 팀원 분들은 모두 사용하는 것 같다.\n\n",
      },
    },
  ],
}
