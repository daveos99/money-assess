import React from "react";
import SurveyButton from "../components/Button"; // adjust the import path as needed

export default function WelcomePage({ onStart }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Financial Wellbeing Survey</h1>
      <p className="mb-6 text-lg">
        Answer a few quick questions to assess your financial wellbeing.
      </p>

      <SurveyButton onClick={onStart} className="mt-8">
        Start Survey
      </SurveyButton>
   
    </div>
  );
}
