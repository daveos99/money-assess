// src/components/Button.jsx
import React from "react";

export default function SurveyButton({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      
      className={`mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}
