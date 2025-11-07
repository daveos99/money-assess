import React, { useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import SurveyPage from "./pages/SurveyPage";
import ResultsPage from "./pages/ResultsPage";
import { surveyData } from "./data/surveydata";

export default function App() {
  const [stage, setStage] = useState("welcome"); // "welcome" | "survey" | "results"
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState(null);

  const handleSurveyComplete = (computedResults) => {
    setResults(computedResults);
    setStage("results");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 to-teal-500 text-white flex items-center justify-center p-6">
      {stage === "welcome" && <WelcomePage onStart={() => setStage("survey")} />}
      {stage === "survey" && (
        <SurveyPage data={surveyData} onComplete={handleSurveyComplete} />
      )}
      {stage === "results" && (
        <ResultsPage results={results} onRestart={() => setStage("welcome")} />
      )}
    </div>
  );
}
