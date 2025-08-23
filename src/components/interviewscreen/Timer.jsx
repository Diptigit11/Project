import React, { useEffect, useState } from "react";

export default function Timer({ perQuestionSeconds, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(perQuestionSeconds);

  useEffect(() => {
    setTimeLeft(perQuestionSeconds); // reset timer when new question loads
  }, [perQuestionSeconds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.(); // auto move to next question
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 text-center">
      <h4 className="text-sm font-semibold text-gray-600">Interview Timer</h4>
      <p
        className={`text-2xl font-bold ${
          timeLeft < 30 ? "text-red-600" : "text-[#012A4A]"
        }`}
      >
        {format(timeLeft)}
      </p>
    </div>
  );
}
