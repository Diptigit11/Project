import React from "react";

const AnswerReview = () => {
  const answers = [
    {
      q: "Tell me about yourself.",
      userAns: "I am passionate about coding and AI-based projects...",
      correctAns: "Start with your background, strengths, and key skills...",
      feedback: "Try to be more structured and concise.",
    },
    {
      q: "Why should we hire you?",
      userAns: "Because I work hard and learn quickly...",
      correctAns: "Highlight unique strengths that align with job requirements.",
      feedback: "Focus on industry-related skills.",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Answer Review</h2>
      {answers.map((a, i) => (
        <div key={i} className="mb-4 p-4 border rounded-lg">
          <p className="font-medium">Q: {a.q}</p>
         <p className="text-[#013A5A] mt-2">Your Answer: {a.userAns}</p>
<p className="text-[#2563EB] mt-2">Correct Answer: {a.correctAns}</p>
<p className="text-[#DC2626] mt-2">Feedback: {a.feedback}</p>

        </div>
      ))}
    </div>
  );
};

export default AnswerReview;
