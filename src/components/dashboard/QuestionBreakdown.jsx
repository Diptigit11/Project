import React from "react";

const QuestionBreakdown = () => {
  const breakdown = [
    { question: "Q1: Tell me about yourself", score: 75 },
    { question: "Q2: Why should we hire you?", score: 60 },
    { question: "Q3: What are your strengths?", score: 82 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Question Breakdown</h2>
      {breakdown.map((b, i) => (
        <div key={i} className="flex justify-between mb-2">
          <p>{b.question}</p>
          <p className="font-semibold">{b.score}%</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionBreakdown;
