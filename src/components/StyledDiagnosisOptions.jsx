import React, { useState } from "react";

const diagnosisOptions = [
  { label: "✅ Confirmed Pneumonia", value: "Confirmed Pneumonia" },
  { label: "❌ No Pneumonia", value: "No Pneumonia" },
  { label: "🧪 Needs Further Tests", value: "Needs Further Tests" },
];

const StyledDiagnosisDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <label className="block mb-2 font-medium text-sm text-gray-700">Doctor's Diagnosis</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border border-blue-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {value || "Select Diagnosis"}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-blue-200 rounded-lg shadow-lg">
          {diagnosisOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm text-gray-800 transition"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StyledDiagnosisDropdown;
