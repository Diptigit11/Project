import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Code,
  MessageSquare,
  BookOpen,
  Target,
  Lightbulb,
  BarChart3,
  Loader2
} from "lucide-react";

export default function FeedBackScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    generateFeedback();
  }, []);

  const generateFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      // Get data from localStorage or passed state
      const answers = JSON.parse(localStorage.getItem("interviewAnswers") || "[]");
      const questions = JSON.parse(localStorage.getItem("interviewQuestions") || "[]");
      const sessionData = JSON.parse(localStorage.getItem("interviewMetadata") || "{}");

      if (!answers.length || !questions.length) {
        setError("No interview data found. Please complete an interview first.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/generate-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionData,
          answers,
          questions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate feedback");
      }

      const data = await response.json();
      setFeedback(data.feedback);
      
      // Store feedback for future reference
      localStorage.setItem("lastInterviewFeedback", JSON.stringify(data.feedback));

    } catch (error) {
      console.error("Error generating feedback:", error);
      setError(error.message || "Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return "bg-green-50 border-green-200";
    if (score >= 75) return "bg-blue-50 border-blue-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getPerformanceLevel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <Loader2 size={48} className="animate-spin text-[#012A4A] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Analyzing Your Interview</h2>
          <p className="text-gray-600">
            Our AI is reviewing your responses and generating personalized feedback...
          </p>
        </div>
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">Error</h2>
            <p className="text-red-600 mb-4">
              {error || "No feedback data available."}
            </p>
            <div className="space-y-2">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-[#012A4A] text-white px-4 py-2 rounded-lg hover:bg-[#024169] transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate("/setup")}
                className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Start New Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-[#012A4A] hover:text-[#024169] transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-[#012A4A]">Interview Feedback</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Overall Score Card */}
        <div className={`rounded-xl border-2 p-6 mb-6 ${getScoreBackground(feedback.overallScore)}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Overall Performance: {getPerformanceLevel(feedback.overallScore)}
              </h2>
              <p className="text-gray-600">
                You answered {feedback.answeredQuestions} out of {feedback.totalQuestions} questions
              </p>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(feedback.overallScore)}`}>
                {feedback.overallScore}/100
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                <Trophy size={16} />
                Score
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-sm font-medium text-gray-600">Answered</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{feedback.answeredQuestions}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} className="text-yellow-600" />
              <span className="text-sm font-medium text-gray-600">Skipped</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{feedback.skippedQuestions}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Code size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Coding</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{feedback.codingQuestions}</div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 size={20} className="text-purple-600" />
              <span className="text-sm font-medium text-gray-600">High Scores</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {feedback.scoreDistribution.excellent + feedback.scoreDistribution.good}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "detailed", label: "Question by Question", icon: MessageSquare },
                { id: "suggestions", label: "Improvement Plan", icon: Lightbulb },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === id
                      ? "border-[#012A4A] text-[#012A4A]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle size={20} className="text-green-600" />
                      <h3 className="font-semibold text-green-800">Key Strengths</h3>
                    </div>
                    <ul className="space-y-2">
                      {feedback.strengths.slice(0, 5).map((strength, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={20} className="text-blue-600" />
                      <h3 className="font-semibold text-blue-800">Areas for Improvement</h3>
                    </div>
                    <ul className="space-y-2">
                      {feedback.improvements.slice(0, 5).map((improvement, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Score Distribution */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart3 size={20} />
                    Score Distribution
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {feedback.scoreDistribution.excellent}
                      </div>
                      <div className="text-sm text-gray-600">Excellent (90+)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {feedback.scoreDistribution.good}
                      </div>
                      <div className="text-sm text-gray-600">Good (75-89)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {feedback.scoreDistribution.average}
                      </div>
                      <div className="text-sm text-gray-600">Average (60-74)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {feedback.scoreDistribution.needsImprovement}
                      </div>
                      <div className="text-sm text-gray-600">Needs Work (60)</div>
                    </div>
                  </div>
                </div>

                {/* Strong and Weak Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Target size={20} className="text-green-600" />
                      Strong Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {feedback.strongAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium capitalize"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <AlertCircle size={20} className="text-orange-600" />
                      Focus Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {feedback.weakAreas.map((area, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium capitalize"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "detailed" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Question-by-Question Analysis</h3>
                {feedback.detailedFeedback.map((questionFeedback, index) => (
                  <div key={questionFeedback.questionId} className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#012A4A] text-white text-xs font-semibold px-2 py-1 rounded">
                            Q{index + 1}
                          </span>
                          <span className="text-xs text-gray-500 capitalize">
                            {questionFeedback.questionType} • {questionFeedback.difficulty}
                          </span>
                          {questionFeedback.coding && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              Coding
                            </span>
                          )}
                        </div>
                        <p className="text-gray-800 font-medium mb-2">{questionFeedback.questionText}</p>
                      </div>
                      <div className={`text-right ml-4 ${getScoreBackground(questionFeedback.score)} rounded-lg px-3 py-2`}>
                        <div className={`text-2xl font-bold ${getScoreColor(questionFeedback.score)}`}>
                          {questionFeedback.score}
                        </div>
                        <div className="text-xs text-gray-600">Score</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Assessment</h4>
                      <p className="text-sm text-gray-700">{questionFeedback.assessment}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {questionFeedback.strengths.length > 0 && (
                        <div>
                          <h4 className="font-medium text-green-800 mb-2 flex items-center gap-1">
                            <CheckCircle size={16} />
                            Strengths
                          </h4>
                          <ul className="space-y-1">
                            {questionFeedback.strengths.map((strength, idx) => (
                              <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                                <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {questionFeedback.improvements.length > 0 && (
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-1">
                            <TrendingUp size={16} />
                            Improvements
                          </h4>
                          <ul className="space-y-1">
                            {questionFeedback.improvements.map((improvement, idx) => (
                              <li key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                                <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {questionFeedback.suggestions.length > 0 && (
                      <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                        <h4 className="font-medium text-yellow-800 mb-2 flex items-center gap-1">
                          <Lightbulb size={16} />
                          Suggestions
                        </h4>
                        <ul className="space-y-1">
                          {questionFeedback.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sm text-yellow-700 flex items-start gap-2">
                              <div className="w-1 h-1 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "suggestions" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  Your Personalized Improvement Plan
                </h3>

                <div className="bg-gradient-to-r from-[#012A4A] to-[#013A5A] rounded-lg p-6 text-white mb-6">
                  <h4 className="text-xl font-semibold mb-2">Next Steps</h4>
                  <p className="text-blue-100">
                    Based on your performance, here's what you should focus on to improve your interview skills.
                  </p>
                </div>

                {/* Priority Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertCircle size={20} />
                      High Priority
                    </h4>
                    <ul className="space-y-2">
                      {feedback.weakAreas.slice(0, 3).map((area, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          Study {area} concepts and practice related questions
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <Clock size={20} />
                      Medium Priority
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-sm text-yellow-700 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        Practice time management during interviews
                      </li>
                      <li className="text-sm text-yellow-700 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        Work on providing more specific examples
                      </li>
                      <li className="text-sm text-yellow-700 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        Improve communication clarity
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Study Resources */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen size={20} />
                    Recommended Study Resources
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Technical Skills</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Practice coding problems on LeetCode/HackerRank</li>
                        <li>• Review system design fundamentals</li>
                        <li>• Study data structures and algorithms</li>
                        <li>• Build projects to demonstrate skills</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Interview Skills</h5>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Practice the STAR method for behavioral questions</li>
                        <li>• Record yourself answering questions</li>
                        <li>• Research the company and role thoroughly</li>
                        <li>• Prepare thoughtful questions to ask interviewers</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Items */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <Target size={20} />
                    Action Items for This Week
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 text-sm text-blue-700">
                      <input type="checkbox" className="mt-1" />
                      <span>Complete 5 practice problems in your weakest technical area</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-blue-700">
                      <input type="checkbox" className="mt-1" />
                      <span>Practice explaining technical concepts out loud for 15 minutes daily</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-blue-700">
                      <input type="checkbox" className="mt-1" />
                      <span>Research 3 companies you're interested in and their interview processes</span>
                    </label>
                    <label className="flex items-start gap-3 text-sm text-blue-700">
                      <input type="checkbox" className="mt-1" />
                      <span>Take another mock interview to track improvement</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={() => navigate("/setup")}
            className="flex-1 bg-[#012A4A] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#024169] transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare size={20} />
            Take Another Interview
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <BarChart3 size={20} />
            View Dashboard
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
}