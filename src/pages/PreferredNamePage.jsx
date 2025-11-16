import React, { useState } from "react";
import SurveyButton from "../components/Button";

export default function PreferredNamePage({ initialName = "", onContinue }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your preferred name before continuing.");
      return;
    }
    setError("");
    onContinue(trimmed);
  };

  return (
    <div className="text-center max-w-2xl bg-white text-gray-900 rounded-2xl p-8 shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-600">
        What should we call you (and your partner)?
      </h2>
      <p className="text-lg leading-relaxed mb-8 text-gray-700">
        We'll include this in your personalised PDF report so it feels like it
        was made just for you.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your (and partners) preferred name"
          className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
        />
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        <SurveyButton type="submit">Continue</SurveyButton>
      </form>
    </div>
  );
}
