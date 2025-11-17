import React, { useState } from "react";
import SurveyButton from "../components/Button";

export default function PreferredNamePage({
  initialPrimaryName = "",
  initialPartnerName = "",
  onContinue,
}) {
  const [primaryName, setPrimaryName] = useState(initialPrimaryName);
  const [partnerName, setPartnerName] = useState(initialPartnerName);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedPrimary = primaryName.trim();
    const trimmedPartner = partnerName.trim();
    if (!trimmedPrimary) {
      setError("Please enter your name before continuing.");
      return;
    }
    setError("");
    onContinue({ primary: trimmedPrimary, partner: trimmedPartner });
  };

  return (
    <div className="text-center max-w-2xl bg-white text-gray-900 rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-600">
        Who is taking the assessment?
      </h2>
      <p className="text-lg leading-relaxed mb-8 text-gray-700">
        Tell us your preferred name, and your partners preferred name if you are completing the assessment as a couple.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
        <div className="w-full max-w-md text-left">
          <label
            htmlFor="primaryName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Your name
          </label>
          <input
            id="primaryName"
            type="text"
            value={primaryName}
            onChange={(e) => setPrimaryName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>
        <div className="w-full max-w-md text-left">
          <label
            htmlFor="partnerName"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Partner name (optional)
          </label>
          <input
            id="partnerName"
            type="text"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Enter your partner's name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          />
        </div>
        {error && <p className="text-sm text-red-600 -mt-2">{error}</p>}
        <SurveyButton type="submit">Continue</SurveyButton>
      </form>
    </div>
  );
}
