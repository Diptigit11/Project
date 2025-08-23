import React from "react";
import Sidebar from "./Sidebar";
import QuestionScores from "./QuestionScores";
import AnswerFeedback from "./AnswerFeedback";
import StatsBars from "./StatsBars";
import SpeechToneAnalysis from "./SpeechToneAnalysis";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen mt-15 bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side (2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <QuestionScores />
          <AnswerFeedback />
        </div>

        {/* Right Side (1/3) */}
        <div className="flex flex-col gap-6">
          <StatsBars />
          <SpeechToneAnalysis />
        </div>
      </div>
    </div>
  );
}
