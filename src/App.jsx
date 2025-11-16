import React, { useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import PreferredNamePage from "./pages/PreferredNamePage";
import PleaseNotePage from "./pages/PleaseNotePage";
import SurveyPage from "./pages/SurveyPage";
import ResultsPage from "./pages/ResultsPage";
import { surveyData } from "./data/surveydata";

export default function App() {
  const [stage, setStage] = useState("welcome"); // "welcome" | "preferred-name" | "please-note" | "survey" | "results"
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState(null);
  const [preferredName, setPreferredName] = useState("");

  const handleSurveyComplete = (computedResults) => {
    setResults({
      ...computedResults,
      preferredName: preferredName.trim(),
    });
    setStage("results");
  };

  const handleRestart = () => {
    setResults(null);
    setPreferredName("");
    setStage("welcome");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 to-teal-500 text-white flex items-center justify-center p-6">
      {stage === "welcome" && (
        <WelcomePage onStart={() => setStage("preferred-name")} />
      )}
      {stage === "preferred-name" && (
        <PreferredNamePage
          initialName={preferredName}
          onContinue={(name) => {
            setPreferredName(name);
            setStage("please-note");
          }}
        />
      )}
      {stage === "please-note" && (
        <PleaseNotePage onContinue={() => setStage("survey")} />
      )}
      {stage === "survey" && (
        <SurveyPage data={surveyData} onComplete={handleSurveyComplete} />
      )}
      {stage === "results" && (
        <ResultsPage results={results} onRestart={handleRestart} />
      )}
    </div>
  );
}
