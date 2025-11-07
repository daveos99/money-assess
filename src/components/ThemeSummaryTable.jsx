import React from "react";

export default function ThemeSummaryTable({ themes, overall }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border mt-4 text-left">
        <thead className="bg-indigo-50">
          <tr>
            <th className="px-4 py-2">Theme</th>
            <th className="px-4 py-2">Score</th>
            <th className="px-4 py-2">Max</th>
            <th className="px-4 py-2">% Achieved</th>
          </tr>
        </thead>
        <tbody>
          {themes.map((t) => (
            <tr key={t.themeId} className="border-t">
              <td className="px-4 py-2">{t.themeName}</td>
              <td className="px-4 py-2">{t.total}</td>
              <td className="px-4 py-2">{t.max}</td>
              <td className="px-4 py-2">{t.percent}%</td>
            </tr>
          ))}
          <tr className="border-t font-bold bg-indigo-100">
            <td className="px-4 py-2">Overall</td>
            <td colSpan="3" className="px-4 py-2 text-right">
              {overall}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
