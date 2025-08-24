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
  {
    q: "What are your weaknesses?",
    userAns: "Sometimes I overthink tasks...",
    feedback: "Show how you are improving it.",
  },
  {
    q: "Where do you see yourself in 5 years?",
    userAns: "In a leadership role in frontend development...",
    feedback: "Connect it with company goals.",
  },
];

export default function AnswerFeedback() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex-1">
      <h2 className="text-lg font-semibold mb-4 text-[#012A4A]">
        Answer Feedback
      </h2>
      <div className="overflow-y-auto max-h-[180px]">
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
    </div>
  );
}
