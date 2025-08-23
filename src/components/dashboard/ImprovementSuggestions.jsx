import React from "react";

const ImprovementSuggestions = () => {
  const suggestions = [
    "Work on reducing filler words like 'um' and 'uh'.",
    "Maintain consistent eye contact.",
    "Use structured answers (STAR method).",
    "Be more confident in tone and pace.",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
<h2 className="text-xl font-semibold mb-4 text-[#012A4A]">Improvement Suggestions</h2>
      <ul className="list-disc list-inside space-y-2">
        {suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImprovementSuggestions;
