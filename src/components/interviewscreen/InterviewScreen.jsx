import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionPanel from "./QuestionPanel";
import VoiceRecorder from "./VoiceRecorder";
import CodingEditor from "./CodingEditor";
import CameraPreview from "./CameraPreview";
import Timer from "./Timer";
import ProgressBar from "./ProgressBar";
import { Loader2 } from "lucide-react";

export default function InterviewScreen() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [metadata, setMetadata] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questionTime, setQuestionTime] = useState(180); // default 3 minutes
  const [timeUp, setTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [interviewStartTime, setInterviewStartTime] = useState(null);
  const [finishing, setFinishing] = useState(false); // New state for finishing process

  // Load questions from localStorage and check authentication on component mount
  useEffect(() => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      const storedQuestions = localStorage.getItem("interviewQuestions");
      const storedMetadata = localStorage.getItem("interviewMetadata");
      
      if (!storedQuestions) {
        setError("No interview questions found. Please go back and set up the interview.");
        setLoading(false);
        return;
      }

      const parsedQuestions = JSON.parse(storedQuestions);
      const parsedMetadata = JSON.parse(storedMetadata || "{}");
      
      setQuestions(parsedQuestions);
      setMetadata(parsedMetadata);
      
      // Generate session ID and set start time
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const startTime = new Date().toISOString();
      
      setSessionId(newSessionId);
      setInterviewStartTime(startTime);
      
      // Store session data for feedback screen
      const sessionData = {
        id: newSessionId,
        startTime: startTime,
        metadata: parsedMetadata
      };
      localStorage.setItem("sessionData", JSON.stringify(sessionData));
      
      setLoading(false);
    } catch (error) {
      console.error("Error loading interview data:", error);
      setError("Failed to load interview questions. Please try again.");
      setLoading(false);
    }
  }, []);

  const currentQuestion = questions[currentIndex];

  // Set timer per question based on question type and expected duration
  useEffect(() => {
    if (currentQuestion) {
      // Use the expectedDuration from the question if available, otherwise use defaults
      const duration = currentQuestion.expectedDuration || (currentQuestion.coding ? 1800 : 180);
      setQuestionTime(duration);
      setTimeUp(false);
    }
  }, [currentIndex, currentQuestion]);

  const saveAudioForCurrent = (transcriptData) => {
    setAnswers((prev) => {
      const idx = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { 
          ...copy[idx], 
          transcription: transcriptData,  // Save transcript instead of audioURL
          recordedAt: new Date().toISOString() 
        };
        return copy;
      }
      return [...prev, { 
        questionId: currentQuestion.id, 
        questionText: currentQuestion.text,
        questionType: currentQuestion.type,
        transcription: transcriptData,  // Save transcript instead of audioURL
        recordedAt: new Date().toISOString() 
      }];
    });
  };

  const saveCodeForCurrent = (code) => {
    setAnswers((prev) => {
      const idx = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], code, submittedAt: new Date().toISOString() };
        return copy;
      }
      return [...prev, { 
        questionId: currentQuestion.id, 
        questionText: currentQuestion.text,
        questionType: currentQuestion.type,
        code, 
        submittedAt: new Date().toISOString() 
      }];
    });
  };

  const hasAnswer = () => {
    const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
    if (currentQuestion.coding) {
      return existingAnswer && existingAnswer.code;
    } else {
      return existingAnswer && existingAnswer.transcription;  // Check for transcription instead of audioURL
    }
  };

  const handleNext = () => {
    if (!hasAnswer() && !timeUp) {
      const confirmSkip = window.confirm(
        `You haven't ${currentQuestion.coding ? 'submitted code' : 'recorded an answer'}. Skip this question?`
      );
      if (!confirmSkip) return;

      // Save empty answer for skipped question
      setAnswers(prev => {
        const exists = prev.find(a => a.questionId === currentQuestion.id);
        if (exists) return prev;
        return [...prev, { 
          questionId: currentQuestion.id, 
          questionText: currentQuestion.text,
          questionType: currentQuestion.type,
          skipped: true,
          skippedAt: new Date().toISOString() 
        }];
      });
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const handleFinishInterview = async () => {
    setFinishing(true);
    
    try {
      console.log("Starting finish interview process...");
      
      // Get authentication token
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication required. Please log in.");
        setFinishing(false);
        return;
      }
      
      // Calculate interview duration
      const endTime = new Date().toISOString();
      const startTime = new Date(interviewStartTime);
      const duration = Math.round((new Date(endTime) - startTime) / 1000); // Duration in seconds
      
      // Prepare session data with enhanced metadata
      const sessionData = {
        id: sessionId,
        metadata: {
          ...metadata,
          totalInterviewTime: duration,
          averageTimePerQuestion: Math.round(duration / questions.length)
        },
        questions,
        answers,
        startedAt: interviewStartTime,
        completedAt: endTime,
        completionRate: Math.round((answers.filter(a => !a.skipped).length / questions.length) * 100)
      };

      console.log("Step 1: Saving session...");
      
      // Step 1: Save the interview session
      const saveResponse = await fetch("http://localhost:5000/api/save-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionData,
          answers,
        }),
      });

      if (!saveResponse.ok) {
        if (saveResponse.status === 401) {
          localStorage.removeItem("token");
          setError("Session expired. Please log in again.");
          navigate("/login");
          return;
        }
        
        const errorData = await saveResponse.json();
        throw new Error(errorData.error || "Failed to save session");
      }

      const saveResult = await saveResponse.json();
      console.log("Session saved successfully:", saveResult);

      console.log("Step 2: Generating feedback...");
      
      // Step 2: Generate and save feedback to database
      const feedbackResponse = await fetch("http://localhost:5000/api/generate/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionData,
          answers,
          questions,
          metadata: {
            ...metadata,
            totalInterviewTime: duration,
            averageTimePerQuestion: Math.round(duration / questions.length)
          },
          completionRate: Math.round((answers.filter(a => !a.skipped).length / questions.length) * 100)
        }),
      });

      if (!feedbackResponse.ok) {
        if (feedbackResponse.status === 401) {
          localStorage.removeItem("token");
          setError("Session expired. Please log in again.");
          navigate("/login");
          return;
        }
        
        const errorData = await feedbackResponse.json();
        throw new Error(errorData.error || "Failed to generate feedback");
      }

      const feedbackResult = await feedbackResponse.json();
      console.log("Feedback generated and saved:", feedbackResult);

      // Step 3: Store session ID for feedback screen to fetch from database
      localStorage.setItem("currentSessionId", sessionId);
      localStorage.removeItem("interviewAnswers"); // Remove local answers since we'll fetch from DB
      localStorage.removeItem("interviewQuestions"); // Remove local questions since we'll fetch from DB
      
      console.log("Step 3: Navigating to feedback with session ID:", sessionId);
      
      // Navigate to feedback screen - it will fetch from database using session ID
      navigate("/feedback");
      
    } catch (error) {
      console.error("Error finishing interview:", error);
      setFinishing(false);
      
      // Handle different error types
      if (error.message.includes("Authentication") || error.message.includes("log in")) {
        setError("Session expired. Please log in again.");
      } else {
        setError(error.message || "Failed to complete interview. Please try again.");
      }
    }
  };

  const handleAuthError = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#012A4A] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600 mb-4">
              {error || "No interview questions available."}
            </p>
            <div className="space-y-2">
              {error.includes("Authentication") || error.includes("log in") ? (
                <button
                  onClick={handleAuthError}
                  className="w-full bg-[#012A4A] text-white px-4 py-2 rounded-lg hover:bg-[#024169] transition-colors"
                >
                  Go to Login
                </button>
              ) : (
                <button
                  onClick={() => navigate("/setup")}
                  className="w-full bg-[#012A4A] text-white px-4 py-2 rounded-lg hover:bg-[#024169] transition-colors"
                >
                  Go Back to Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Finishing interview loading state
  if (finishing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#012A4A] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Finishing Interview</h2>
          <p className="text-gray-500">Saving your responses and generating feedback...</p>
          <div className="mt-6 bg-white rounded-lg p-4 shadow-sm max-w-md">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Saving interview session
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Analyzing your responses
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                Generating detailed feedback
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const existingForThis = answers.find(a => a.questionId === currentQuestion.id);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col mt-15 lg:flex-row gap-6">
      
      {/* Left Panel */}
      <div className="flex-1 bg-white shadow-lg rounded-xl p-6 flex flex-col">
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <QuestionPanel
          question={currentQuestion}
          index={currentIndex}
          total={questions.length}
        />

        {/* Voice Recorder for non-coding questions */}
        {!currentQuestion.coding && (
          <VoiceRecorder
            key={currentQuestion.id}
            questionId={currentQuestion.id}
            initialAudioURL={existingForThis?.audioURL || null}
            onSave={saveAudioForCurrent}
          />
        )}

        {/* Coding Editor for coding questions */}
        {currentQuestion.coding && (
          <div className="mt-4 flex-1">
            <CodingEditor
              key={currentQuestion.id}
              language={metadata.language || "javascript"}
              initialCode={existingForThis?.code || ""}
              onCodeChange={saveCodeForCurrent}
              question={currentQuestion}
            />
          </div>
        )}

        {/* Navigation Button */}
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleFinishInterview}
            disabled={finishing}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition-all flex justify-center items-center gap-2 ${
              finishing 
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {finishing ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Finishing...
              </>
            ) : (
              "Finish Interview"
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!timeUp && !hasAnswer()}
            className={`mt-6 w-full py-3 rounded-lg font-semibold transition-all 
              ${(!timeUp && !hasAnswer())
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#012A4A] text-white hover:bg-[#024169]"}`}
          >
            Next Question →
          </button>
        )}

        {/* Progress Info */}
        <div className="mt-4 text-sm text-gray-600 text-center">
          Question {currentIndex + 1} of {questions.length} • 
          {currentQuestion.type.charAt(0).toUpperCase() + currentQuestion.type.slice(1)} • 
          {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          {currentQuestion.coding && ` • ${metadata.language || 'JavaScript'}`}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        <CameraPreview />
        <Timer
          key={`${currentQuestion.id}-${questionTime}`} // Reset timer for each question
          perQuestionSeconds={questionTime}
          onTimeUp={() => {
            setTimeUp(true);
            alert("⏰ Time is up! You can review your answer and move to the next question.");
          }}
        />
        
        {/* Interview Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-[#012A4A] mb-2">Interview Details</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Role:</span>
              <span className="font-medium">{metadata.role || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>Company:</span>
              <span className="font-medium">{metadata.company || "General"}</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span className="font-medium capitalize">{metadata.type || "N/A"}</span>
            </div>
            <div className="flex justify-between">
              <span>Difficulty:</span>
              <span className="font-medium capitalize">{metadata.difficulty || "N/A"}</span>
            </div>
            {metadata.includeCoding && (
              <div className="flex justify-between">
                <span>Language:</span>
                <span className="font-medium">{metadata.language || "JavaScript"}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Session ID:</span>
              <span className="font-medium text-xs">{sessionId?.substring(8, 16) || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}