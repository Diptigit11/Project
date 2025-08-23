import React from "react";
import { HelpCircle } from "lucide-react";

export default function QuestionPanel({ question, index, total }) {
  return (
    <div className="mb-6">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="text-[#012A4A]" size={22} />
        <h2 className="text-lg font-semibold text-[#012A4A]">
          Question {index + 1} of {total}
        </h2>
      </div>

      {/* Question text */}
      <p className="text-xl font-bold text-gray-800 leading-relaxed border-l-4 border-[#012A4A] pl-4">
        {question.text}
      </p>
    </div>
  );
}
