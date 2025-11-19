import React, { useCallback, useEffect, useRef, useState } from "react";
import WelcomePage from "./pages/WelcomePage";
import PreferredNamePage from "./pages/PreferredNamePage";
import PleaseNotePage from "./pages/PleaseNotePage";
import SurveyPage from "./pages/SurveyPage";
import ResultsPage from "./pages/ResultsPage";
import { surveyDataByType } from "./data/surveydata";
import { createInitialSurveyState } from "./constants/assessmentState";
import {
  clearAssessmentSnapshot,
  loadAssessmentSnapshot,
  persistAssessmentSnapshot,
} from "./utils/assessmentStorage";

export default function App() {
  const snapshotRef = useRef(loadAssessmentSnapshot());
  const snapshot = snapshotRef.current;

  const [stage, setStage] = useState(snapshot?.stage ?? "welcome"); // "welcome" | "preferred-name" | "please-note" | "survey" | "results"
  const [results, setResults] = useState(snapshot?.results ?? null);
  const [participantNames, setParticipantNames] = useState(
    snapshot?.participantNames ?? {
      primary: "",
      partner: "",
    }
  );
  const [surveyState, setSurveyState] = useState(
    snapshot?.surveyState ?? createInitialSurveyState()
  );

  useEffect(() => {
    persistAssessmentSnapshot({
      stage,
      results,
      participantNames,
      surveyState,
    });
  }, [stage, results, participantNames, surveyState]);

  const trimmedPrimaryName = participantNames.primary.trim();
  const trimmedPartnerName = participantNames.partner.trim();
  const participantType = trimmedPartnerName ? "couple" : "single";
  const surveyData = surveyDataByType[participantType] ?? [];

  const logAssessmentCompletion = useCallback(async (submission) => {
    if (!submission) return;
    try {
      const response = await fetch("/api/logAssessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submission),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to log assessment completion:", errorText);
      }
    } catch (error) {
      console.error("Unexpected error logging assessment completion:", error);
    }
  }, []);

  const handleSurveyComplete = (computedResults) => {
    const participantPayload = {
      primary: trimmedPrimaryName,
      partner: trimmedPartnerName,
    };
    const preferredName = trimmedPartnerName
      ? `${trimmedPrimaryName} & ${trimmedPartnerName}`
      : trimmedPrimaryName;
    const mergedResults = {
      ...computedResults,
      participantType,
      participantNames: participantPayload,
      preferredName,
    };
    setResults(mergedResults);
    setStage("results");
    logAssessmentCompletion({
      participantNames: participantPayload,
      participantType,
      preferredName,
      results: mergedResults,
    });
  };

  const handleRestart = () => {
    setResults(null);
    setParticipantNames({ primary: "", partner: "" });
    setSurveyState(createInitialSurveyState());
    setStage("welcome");
    clearAssessmentSnapshot();
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
          onNamesChange={(names) => setParticipantNames(names)}
          onBack={() => setStage("welcome")}
          onContinue={({ primary, partner }) => {
            setParticipantNames({ primary, partner });
            setStage("please-note");
          }}
        />
      )}
      {stage === "please-note" && (
        <PleaseNotePage
          onBack={() => setStage("preferred-name")}
          onContinue={() => setStage("survey")}
        />
      )}
      {stage === "survey" && (
        <SurveyPage
          data={surveyData}
          participantType={participantType}
          initialState={surveyState}
          onStateChange={setSurveyState}
          onBack={() => setStage("please-note")}
          onComplete={handleSurveyComplete}
        />
      )}
      {stage === "results" && (
        <ResultsPage
          results={results}
          onRestart={handleRestart}
          onBack={() => setStage("survey")}
        />
      )}
    </div>
  );
}
