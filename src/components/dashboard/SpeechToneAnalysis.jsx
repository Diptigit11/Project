import React from "react";

const SpeechToneAnalysis = () => {
  const tones = [
    { tone: "Confident", score: 70 },
    { tone: "Nervous", score: 20 },
    { tone: "Calm", score: 10 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Speech Tone Analysis</h2>
      {tones.map((t, i) => (
        <div key={i} className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>{t.tone}</span>
            <span>{t.score}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
  className="h-3 rounded-full bg-gradient-to-r from-[#012A4A] to-[#013A5A]"
  style={{ width: `${t.score}%` }}
/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpeechToneAnalysis;
