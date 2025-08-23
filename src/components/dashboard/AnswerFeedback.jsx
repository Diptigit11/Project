import React from "react";

const answers = [
  {
    q: "Tell me about yourself.",
    userAns: "I am passionate about coding and AI-based projects...",
    feedback: "Try to be more structured and concise.",
  },
  {
    q: "Why should we hire you?",
    userAns: "Because I work hard and learn quickly...",
    feedback: "Focus on industry-related skills.",
  },
  {
    q: "What are your strengths?",
    userAns: "Problem-solving, teamwork, and adaptability...",
    feedback: "Add a real-world example.",
  },
];

export default function AnswerFeedback() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-y-auto flex-1">
      <h2 className="text-lg font-semibold mb-4 text-[#012A4A]">
        Answer Feedback
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#012A4A] text-white text-left">
            <th className="p-2 border border-gray-200">Question</th>
            <th className="p-2 border border-gray-200">Your Answer</th>
            <th className="p-2 border border-gray-200">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((a, i) => (
            <tr
              key={i}
              className="text-sm hover:bg-yellow-50 transition-colors"
            >
              <td className="p-2 border border-gray-200 font-medium text-[#012A4A]">
                {a.q}
              </td>
              <td className="p-2 border border-gray-200 text-gray-700">
                {a.userAns}
              </td>
<td className="p-2 border border-gray-200 text-yellow-800 font-semibold">
                {a.feedback}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
