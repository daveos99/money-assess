import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="mb-6">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-amber-500 h-3 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-2 text-right">
        Question {current} of {total}
      </p>
    </div>
  );
}
