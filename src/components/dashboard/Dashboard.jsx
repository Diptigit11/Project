// Dashboard.jsx
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import QuestionScores from "./QuestionScores";
import AnswerFeedback from "./AnswerFeedback";
import StatsBars from "./StatsBars";
import SpeechToneAnalysis from "./SpeechToneAnalysis";
import Progress from "./Progress";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview"); 
  const [selectedInterview, setSelectedInterview] = useState(null);

  return (
    <div className="flex min-h-screen mt-15 bg-gray-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setSelectedInterview={setSelectedInterview} 
      />

      <div className="flex-1 p-6">
        {(activeTab === "overview" || activeTab === "previous") && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side (2/3) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <QuestionScores interview={selectedInterview} />
              <AnswerFeedback interview={selectedInterview} />
            </div>

            {/* Right Side (1/3) */}
            <div className="flex flex-col gap-6">
              <StatsBars interview={selectedInterview} />
              <SpeechToneAnalysis interview={selectedInterview} />
            </div>
          </div>
        )}

        {activeTab === "progress" && <Progress />}

        {activeTab === "review" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#012A4A]">Review</h2>
            <p className="mt-2 text-gray-600">
              Review page content will go here...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
