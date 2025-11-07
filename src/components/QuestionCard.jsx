import React from "react";

export default function QuestionCard({ theme, question, onAnswer }) {
  return (
    <div>
      <h2 className="text-indigo-600 text-lg font-semibold mb-2">
        {theme.themeName}
      </h2>
      <p className="text-sm text-gray-500 mb-4">{theme.description}</p>
      <h3 className="text-2xl font-bold mb-6">{question.text}</h3>
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(opt.value, opt.next)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl shadow-md transition"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
