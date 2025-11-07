import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

export default function SurveyPage({ data, onComplete }) {
  const [currentQuestionId, setCurrentQuestionId] = useState("1.1");
  const [responses, setResponses] = useState({});

  const allQuestions = data.flatMap((t) => t.questions);
  const currentQuestion = allQuestions.find((q) => q.id === currentQuestionId);
  const totalQuestions = allQuestions.length;
  const currentIndex = allQuestions.findIndex((q) => q.id === currentQuestionId);

  const handleAnswer = (value, next) => {
    const updated = { ...responses, [currentQuestionId]: value };
    setResponses(updated);

    if (next === null) {
      // compute results
      const results = calculateResults(updated, data);
      onComplete(results);
    } else {
      setCurrentQuestionId(next);
    }
  };

  const calculateResults = (responses, data) => {
    const themeScores = data.map((theme) => {
      const questions = theme.questions;
      const total = questions.reduce((sum, q) => sum + (responses[q.id] || 0), 0);
      const max = 8; // max score per theme
      return {
        themeId: theme.themeId,
        themeName: theme.themeName,
        total,
        max,
        percent: Math.round((total / max) * 100),
      };
    });

    const overallTotal = themeScores.reduce((sum, t) => sum + t.total, 0);
    const overallMax = themeScores.reduce((sum, t) => sum + t.max, 0);

    return {
      themes: themeScores,
      overallPercent: Math.round((overallTotal / overallMax) * 100),
    };
  };

  const theme = data.find((t) => t.questions.some((q) => q.id === currentQuestionId));

  return (
    <div className="max-w-xl w-full bg-white text-gray-900 rounded-2xl p-8 shadow-lg">
      <ProgressBar current={currentIndex + 1} total={totalQuestions} />
      <QuestionCard
        theme={theme}
        question={currentQuestion}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
