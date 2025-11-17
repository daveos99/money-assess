import React, { useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import PreferredNamePage from "./pages/PreferredNamePage";
import PleaseNotePage from "./pages/PleaseNotePage";
import SurveyPage from "./pages/SurveyPage";
import ResultsPage from "./pages/ResultsPage";
import { surveyDataByType } from "./data/surveydata";

export default function App() {
  const [stage, setStage] = useState("welcome"); // "welcome" | "preferred-name" | "please-note" | "survey" | "results"
  const [results, setResults] = useState(null);
  const [participantNames, setParticipantNames] = useState({
    primary: "",
    partner: "",
  });

  const trimmedPrimaryName = participantNames.primary.trim();
  const trimmedPartnerName = participantNames.partner.trim();
  const participantType = trimmedPartnerName ? "couple" : "single";
  const surveyData = surveyDataByType[participantType] ?? [];

  const handleSurveyComplete = (computedResults) => {
    const payload = {
      primary: trimmedPrimaryName,
      partner: trimmedPartnerName,
    };
    setResults({
      ...computedResults,
      participantType,
      participantNames: payload,
      preferredName: trimmedPartnerName
        ? `${trimmedPrimaryName} & ${trimmedPartnerName}`
        : trimmedPrimaryName,
    });
    setStage("results");
  };

  const handleRestart = () => {
    setResults(null);
    setParticipantNames({ primary: "", partner: "" });
    setStage("welcome");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 to-teal-500 text-white flex items-center justify-center p-6">
      {stage === "welcome" && (
        <WelcomePage onStart={() => setStage("preferred-name")} />
      )}
      {stage === "preferred-name" && (
        <PreferredNamePage
          initialPrimaryName={participantNames.primary}
          initialPartnerName={participantNames.partner}
          onContinue={({ primary, partner }) => {
            setParticipantNames({ primary, partner });
            setStage("please-note");
          }}
        />
      )}
      {stage === "please-note" && (
        <PleaseNotePage onContinue={() => setStage("survey")} />
      )}
      {stage === "survey" && (
        <SurveyPage
          data={surveyData}
          participantType={participantType}
          onComplete={handleSurveyComplete}
        />
      )}
      {stage === "results" && (
        <ResultsPage results={results} onRestart={handleRestart} />
      )}
    </div>
  );
}
