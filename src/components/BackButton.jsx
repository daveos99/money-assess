import React from "react";

export default function BackButton({
  onClick,
  children = "Back",
  className = "",
  type = "button",
  style = {},
}) {
  const iosSafeColor = "#4f46e5";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none bg-transparent appearance-none ${className}`}
      style={{
        backgroundColor: "transparent",
        color: iosSafeColor,
        WebkitTextFillColor: iosSafeColor,
        WebkitAppearance: "none",
        ...style,
      }}
    >
      {`< ${children}`}
    </button>
  );
}
