import React from "react";
import SurveyButton from "../components/Button";

export default function PleaseNotePage({ onContinue }) {
  return (
    <div className="text-center max-w-2xl">
      <h2 className="text-3xl font-semibold mb-6">Please note</h2>
      <p className="text-lg leading-relaxed mb-8">
        This assessment will typically take around 10 minutes to complete. You
        should complete it in one sitting as your answers are not saved so you
        will have to restart the whole assessment if you leave and come back.
      </p>
      <SurveyButton onClick={onContinue}>Start Assessment</SurveyButton>
    </div>
  );
}
