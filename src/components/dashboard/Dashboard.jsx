import React from "react";
import PerformanceOverview from "./PerformanceOverview";
import SpeechToneAnalysis from "./SpeechToneAnalysis";
import AnswerReview from "./AnswerReview";
import QuestionBreakdown from "./QuestionBreakdown";
import ImprovementSuggestions from "./ImprovementSuggestions";
import ProgressTracker from "./ProgressTracker";


const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <PerformanceOverview />
      <SpeechToneAnalysis />
      <AnswerReview />
      <QuestionBreakdown/>
      <ImprovementSuggestions/>
      <ProgressTracker/>

    </div>
  );
};

export default Dashboard;
