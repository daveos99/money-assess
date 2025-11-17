export const ASSESSMENT_STORAGE_KEY = "money-assessment:snapshot";

const createInitialCustomReasons = () => [
  { id: "c1", text: "" },
  { id: "c2", text: "" },
  { id: "c3", text: "" },
];

export const createInitialReasonsState = () => ({
  showIntro: true,
  responses: {},
  customReasons: createInitialCustomReasons(),
  stage: "preset",
  ranking: [],
  currentIndex: 0,
});

export const createInitialSurveyState = (firstQuestionId = "1.1") => ({
  currentQuestionId: firstQuestionId,
  responses: {},
  questionHistory: [firstQuestionId],
  showThemeIntro: true,
  showReasons: false,
  surveyResults: null,
  reasonsState: createInitialReasonsState(),
});
