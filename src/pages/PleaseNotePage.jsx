import React from "react";
import SurveyButton from "../components/Button";
import BackButton from "../components/BackButton";

export default function PleaseNotePage({ onContinue, onBack }) {
  return (
    <div className="text-center max-w-2xl bg-white text-gray-900 rounded-2xl p-8 shadow-lg relative">
      {onBack && (
        <div className="absolute left-6 top-6">
          <BackButton onClick={onBack} />
        </div>
      )}
      <h2 className="text-3xl font-semibold mb-6 text-indigo-600">
        Please note
      </h2>
      <p className="text-lg leading-relaxed mb-8 text-gray-700">
        This assessment will typically take around 10 minutes to complete.<br />
        Your progress is saved on this device so you can leave and return later.<br />
        You can also use the Back button to revisit or change previous answers.
      </p>
      <SurveyButton onClick={onContinue}>Start Assessment</SurveyButton>
    </div>
  );
}
