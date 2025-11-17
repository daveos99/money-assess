import React from "react";

export default function BackButton({
  onClick,
  children = "Back",
  className = "",
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none ${className}`}
    >
      {`< ${children}`}
    </button>
  );
}
