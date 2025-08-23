import React, { useEffect, useState } from "react";
import QuestionPanel from "./QuestionPanel";
import VoiceRecorder from "./VoiceRecorder";
import CodingEditor from "./CodingEditor";
import CameraPreview from "./CameraPreview";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom"; // ✅ Import Link

// Dummy Questions
const dummyQuestions = [
  { id: 1, text: "Tell me about yourself.", type: "hr", coding: false },
  { id: 2, text: "How do you handle conflicts in a team?", type: "behavioral", coding: false },
  { id: 3, text: "Write a function to reverse a string.", type: "technical", coding: true },
];

const codingQuestionTime = { easy: 900, medium: 1800, hard: 2700 }; // 15/30/45 min
const defaultNonCodingTime = 30; 

export default function InterviewScreen({ includeCoding = true, difficulty = "medium" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionTime, setQuestionTime] = useState(defaultNonCodingTime);
  const [timeUp, setTimeUp] = useState(false);

  const currentQuestion = dummyQuestions[currentIndex];

  // Set timer per question
  useEffect(() => {
    if (currentQuestion.coding) {
      setQuestionTime(codingQuestionTime[difficulty] || 900);
    } else {
      setQuestionTime(defaultNonCodingTime);
    }
    setTimeUp(false);
  }, [currentIndex, currentQuestion, difficulty]);

  const saveAudioForCurrent = (audioURL) => {
    setAnswers((prev) => {
      const idx = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], audioURL, recordedAt: new Date().toISOString() };
        return copy;
      }
      return [...prev, { questionId: currentQuestion.id, audioURL, recordedAt: new Date().toISOString() }];
    });
  };

  const hasAnswer = !!answers.find(a => a.questionId === currentQuestion.id && a.audioURL);

  const handleNext = () => {
    if (!hasAnswer && !currentQuestion.coding) {
      const confirmSkip = window.confirm("You haven’t recorded an answer. Skip this question?");
      if (!confirmSkip) return;

      setAnswers(prev => {
        const exists = prev.find(a => a.questionId === currentQuestion.id);
        if (exists) return prev;
        return [...prev, { questionId: currentQuestion.id, audioURL: null, recordedAt: new Date().toISOString() }];
      });
    }

    if (currentIndex < dummyQuestions.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const existingForThis = answers.find(a => a.questionId === currentQuestion.id);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col mt-15 lg:flex-row gap-6">
      
      {/* Left */}
      <div className="flex-1 bg-white shadow-lg rounded-xl p-6 flex flex-col">
        <ProgressBar current={currentIndex + 1} total={dummyQuestions.length} />

        <QuestionPanel
          question={currentQuestion}
          index={currentIndex}
          total={dummyQuestions.length}
        />

        {/* ✅ Voice Recorder only if NOT coding */}
        {!currentQuestion.coding && (
          <VoiceRecorder
            key={currentQuestion.id}
            questionId={currentQuestion.id}
            initialAudioURL={existingForThis?.audioURL || null}
            onSave={saveAudioForCurrent}
          />
        )}

        {/* ✅ Coding Editor only if coding */}
        {includeCoding && currentQuestion.coding && (
          <div className="mt-4">
            <CodingEditor />
          </div>
        )}

        {/* ✅ Button or Link */}
        {currentIndex === dummyQuestions.length - 1 ? (
          <Link
            to="/dashboard"
            className="mt-6 w-full py-3 rounded-lg font-semibold transition-all bg-[#012A4A] text-white hover:bg-[#024169] flex justify-center"
          >
            Finish Interview
          </Link>
        ) : (
          <button
            onClick={handleNext}
            disabled={!timeUp && !hasAnswer && !currentQuestion.coding}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition-all 
              ${(!timeUp && !hasAnswer && !currentQuestion.coding)
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#012A4A] text-white hover:bg-[#024169]"}`}
          >
            Next Question →
          </button>
        )}
      </div>

      {/* Right */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <CameraPreview />
        <Timer
          perQuestionSeconds={questionTime}
          onTimeUp={() => {
            setTimeUp(true);
            alert("⏰ Time is up! You can review/confirm and then move forward.");
          }}
        />
      </div>
    </div>
  );
}
