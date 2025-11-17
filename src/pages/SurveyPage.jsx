import React, { useEffect, useRef, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import ReasonsPage from "./ReasonsPage";
import BackButton from "../components/BackButton";
import {
  createInitialReasonsState,
  createInitialSurveyState,
} from "../constants/assessmentState";

export default function SurveyPage({
  data,
  onComplete,
  participantType = "single",
  initialState,
  onStateChange,
  onBack,
}) {
  const defaultsRef = useRef(createInitialSurveyState());
  const defaults = defaultsRef.current;
  const firstQuestionId =
    data?.[0]?.questions?.[0]?.id ??
    initialState?.currentQuestionId ??
    defaults.currentQuestionId ??
    "1.1";

  const [currentQuestionId, setCurrentQuestionId] = useState(
    initialState?.currentQuestionId ?? defaults.currentQuestionId ?? firstQuestionId
  );
  const [responses, setResponses] = useState(
    initialState?.responses ?? defaults.responses
  );
  const [showThemeIntro, setShowThemeIntro] = useState(
    initialState?.showThemeIntro ?? defaults.showThemeIntro
  );
  const [showReasons, setShowReasons] = useState(
    initialState?.showReasons ?? defaults.showReasons
  );
  const [surveyResults, setSurveyResults] = useState(
    initialState?.surveyResults ?? defaults.surveyResults
  );
  const [reasonsState, setReasonsState] = useState(
    () => initialState?.reasonsState ?? defaults.reasonsState
  );
  const [questionHistory, setQuestionHistory] = useState(() => {
    if (initialState?.questionHistory?.length) {
      return initialState.questionHistory;
    }
    if (defaults.questionHistory?.length) {
      return defaults.questionHistory;
    }
    return [initialState?.currentQuestionId ?? firstQuestionId];
  });

  const allQuestions = data.flatMap((theme) => theme.questions);
  const currentQuestion = allQuestions.find((q) => q.id === currentQuestionId);
  const totalQuestions = allQuestions.length;
  const currentIndex = allQuestions.findIndex((q) => q.id === currentQuestionId);
  const progressCurrent = currentIndex >= 0 ? currentIndex + 1 : 0;

  const theme = data.find((t) =>
    t.questions.some((q) => q.id === currentQuestionId)
  );

  const normalizeHistory = (
    historyInput,
    referenceId = currentQuestionId ?? firstQuestionId
  ) => {
    const safeHistory = Array.isArray(historyInput)
      ? [...historyInput]
      : [];
    const targetId = referenceId ?? firstQuestionId;
    if (safeHistory.length === 0) {
      if (targetId) {
        safeHistory.push(targetId);
      }
      return safeHistory;
    }
    if (!targetId) {
      return safeHistory;
    }
    const lastIndex = safeHistory.lastIndexOf(targetId);
    if (lastIndex === -1) {
      safeHistory.push(targetId);
      return safeHistory;
    }
    return safeHistory.slice(0, lastIndex + 1);
  };

  useEffect(() => {
    if (!questionHistory?.length && (currentQuestionId || firstQuestionId)) {
      setQuestionHistory([currentQuestionId ?? firstQuestionId]);
    }
  }, [questionHistory, currentQuestionId, firstQuestionId]);

  useEffect(() => {
    if (allQuestions.length === 0) return;
    if (currentQuestion) return;
    setCurrentQuestionId(firstQuestionId);
    setQuestionHistory([firstQuestionId]);
    setResponses({});
    setShowThemeIntro(true);
    setShowReasons(false);
    setSurveyResults(null);
  }, [allQuestions.length, currentQuestion, firstQuestionId]);

  const goBackOneQuestion = () => {
    const history = normalizeHistory(questionHistory);
    if (history.length <= 1) {
      const firstId = history[0] ?? firstQuestionId;
      if (firstId) {
        setResponses((prev) => {
          const copy = { ...prev };
          delete copy[currentQuestionId];
          delete copy[firstId];
          return copy;
        });
        setCurrentQuestionId(firstId);
        setQuestionHistory([firstId]);
      }
      setSurveyResults(null);
      setShowThemeIntro(false);
      return false;
    }

    const updatedHistory = history.slice(0, -1);
    const previousId = updatedHistory[updatedHistory.length - 1] ?? firstQuestionId;

    setQuestionHistory(updatedHistory);
    setResponses((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestionId];
      if (previousId) {
        delete copy[previousId];
      }
      return copy;
    });
    setCurrentQuestionId(previousId);
    setSurveyResults(null);
    setShowThemeIntro(false);
    return true;
  };

  const handleBackNavigation = () => {
    const navigated = goBackOneQuestion();
    if (!navigated) {
      onBack?.();
    }
  };

  const handleReasonsBack = () => {
    setReasonsState(createInitialReasonsState());
    setShowReasons(false);
    setSurveyResults(null);
    setResponses((prev) => {
      if (!currentQuestionId) return prev;
      const copy = { ...prev };
      delete copy[currentQuestionId];
      return copy;
    });
    setQuestionHistory((prev) => normalizeHistory(prev, currentQuestionId));
    if (!currentQuestionId) {
      onBack?.();
    } else {
      setShowThemeIntro(false);
    }
  };

  useEffect(() => {
    onStateChange?.({
      currentQuestionId,
      responses,
      questionHistory,
      showThemeIntro,
      showReasons,
      surveyResults,
      reasonsState,
    });
  }, [
    currentQuestionId,
    responses,
    questionHistory,
    showThemeIntro,
    showReasons,
    surveyResults,
    reasonsState,
    onStateChange,
  ]);

  const handleAnswer = (selectedValue, next, selectedLabel) => {
    const updated = {
      ...responses,
      [currentQuestionId]: {
        label: selectedLabel,
        value: selectedValue,
      },
    };
    setResponses(updated);
    setQuestionHistory((prev) => {
      const trimmed = normalizeHistory(prev, currentQuestionId);
      if (next === null || next === "End") {
        return trimmed;
      }
      return [...trimmed, next];
    });

    if (next === null || next === "End") {
      const results = calculateResults(updated, data);
      setSurveyResults(results);
      setShowReasons(true);
      return;
    }

    const nextQuestion = allQuestions.find((q) => q.id === next);
    const currentThemeId = theme?.themeId;
    const nextThemeId = data.find((t) =>
      t.questions.some((q) => q.id === nextQuestion?.id)
    )?.themeId;

    if (nextThemeId && currentThemeId && nextThemeId !== currentThemeId) {
      setShowThemeIntro(true);
    }

    setCurrentQuestionId(next);
  };

  const calculateResults = (responses, data) => {
    const themeScores = data.map((theme) => {
      const questions = theme.questions.map((q) => ({
        ...q,
        selectedLabel: responses[q.id]?.label ?? "Not answered",
        score: responses[q.id]?.value ?? 0,
      }));

      const total = questions.reduce((sum, q) => sum + (q.score || 0), 0);
      const max = 8; // Max per theme -- adjust as needed

      return {
        themeId: theme.themeId,
        themeName: theme.themeName,
        total,
        max,
        percent: Math.round((total / max) * 100),
        questions,
      };
    });

    const overallTotal = themeScores.reduce((sum, t) => sum + t.total, 0);
    const overallMax = themeScores.reduce((sum, t) => sum + t.max, 0);

    return {
      themes: themeScores,
      overallPercent: Math.round((overallTotal / overallMax) * 100),
    };
  };

  if (showReasons && surveyResults) {
    return (
      <ReasonsPage
        participantType={participantType}
        initialState={reasonsState}
        onStateChange={setReasonsState}
        onBack={handleReasonsBack}
        onComplete={(reasonsData) => {
          const mergedResults = {
            ...surveyResults,
            ...(reasonsData || {}),
            reasons: reasonsData?.reasons || reasonsData,
          };
          onComplete(mergedResults);
        }}
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {showThemeIntro ? (
        <motion.div
          key="intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full sm:w-[640px] max-w-2xl bg-white text-gray-900 rounded-2xl p-8 shadow-lg text-center"
        >
          <div className="mb-6 text-left">
            <BackButton onClick={handleBackNavigation} />
          </div>
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            {theme?.themeName}
          </h2>
          <p className="text-gray-700 text-lg mb-6">{theme?.description}</p>
          <button
            onClick={() => setShowThemeIntro(false)}
            className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
          >
            Go To Questions
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="question"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full sm:w-[640px] max-w-2xl bg-white text-gray-900 rounded-2xl p-8 shadow-lg"
        >
          <div className="mb-4 text-left">
            <BackButton onClick={handleBackNavigation} />
          </div>
          <ProgressBar current={progressCurrent} total={totalQuestions} />
          <QuestionCard
            question={currentQuestion}
            onAnswer={(value, next) => {
              const selectedLabel = currentQuestion?.options.find(
                (opt) => opt.value === value
              )?.label;
              handleAnswer(value, next, selectedLabel);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
