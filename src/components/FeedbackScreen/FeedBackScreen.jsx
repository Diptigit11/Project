import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,TrendingDown,CheckCircle,XCircle,Clock,Brain,MessageCircle,Code,BarChart3,Download,Home,RotateCcw,Loader2,Star,Target,Award,AlertCircle, FileText  
} from "lucide-react";

export default function FeedbackScreen() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  useEffect(() => {
    generateFeedback();
  }, []);

  const generateFeedback = async () => {
    setLoading(true);
    setError("");

    try {
      // Get stored interview data
      const answersData = localStorage.getItem("interviewAnswers");
      const questionsData = localStorage.getItem("interviewQuestions");
      const metadataData = localStorage.getItem("interviewMetadata");

      if (!answersData || !questionsData) {
        setError("No interview data found. Please complete an interview first.");
        return;
      }

      const answers = JSON.parse(answersData);
      const questions = JSON.parse(questionsData);
      const metadata = JSON.parse(metadataData || "{}");

      // Call feedback generation API
      const response = await fetch("http://localhost:5000/api/generate/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers,
          questions,
          metadata,
          completionRate: (answers.filter(a => !a.skipped).length / questions.length) * 100
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate feedback");
      }

      const result = await response.json();
      
      // Process and ensure all required fields exist
      const processedFeedback = {
        ...result.feedback,
        overallGrade: result.feedback.overallGrade || calculateGrade(result.feedback.overallScore),
        completionRate: result.feedback.completionRate || Math.round((answers.filter(a => !a.skipped).length / questions.length) * 100),
        metrics: {
          questionsAnswered: answers.filter(a => !a.skipped).length,
          totalQuestions: questions.length,
          averageCommunicationScore: result.feedback.metrics?.averageCommunicationScore || 0,
          averageTechnicalScore: result.feedback.metrics?.averageTechnicalScore || null,
          totalWordsSpoken: result.feedback.metrics?.totalWordsSpoken || 0,
          averageWordsPerResponse: result.feedback.metrics?.averageWordsPerResponse || 0,
          questionsWithTranscripts: result.feedback.metrics?.questionsWithTranscripts || 0,
          ...result.feedback.metrics
        },
        overallStrengths: result.feedback.overallStrengths || [],
        overallImprovements: result.feedback.overallImprovements || [],
        recommendations: result.feedback.recommendations || [],
        nextSteps: result.feedback.nextSteps || [],
        questionFeedbacks: result.feedback.questionFeedbacks || [],
        categoryPerformance: result.feedback.categoryPerformance || {},
        communicationAnalysis: result.feedback.communicationAnalysis || null,
        interviewMetadata: result.feedback.interviewMetadata || metadata || {}
      };

      setFeedback(processedFeedback);

      // Save feedback for future reference
      await saveFeedback(processedFeedback);

    } catch (error) {
      console.error("Error generating feedback:", error);
      setError("Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to calculate grade from score
  const calculateGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C+';
    if (score >= 55) return 'C';
    if (score >= 50) return 'C-';
    return 'D';
  };

  const saveFeedback = async (feedbackData) => {
    try {
      await fetch("http://localhost:5000/api/feedback/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: feedbackData,
          sessionId: `session_${Date.now()}`
        }),
      });
    } catch (error) {
      console.error("Error saving feedback:", error);
    }
  };

  const toggleQuestionExpansion = (questionId) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600 bg-green-50";
    if (score >= 70) return "text-blue-600 bg-blue-50";
    if (score >= 60) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getGradeColor = (grade) => {
    // Add null check
    if (!grade || typeof grade !== 'string') return "text-gray-600 bg-gray-100";
    
    if (grade.startsWith('A')) return "text-green-600 bg-green-100";
    if (grade.startsWith('B')) return "text-blue-600 bg-blue-100";
    if (grade.startsWith('C')) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#012A4A] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Analyzing Your Interview</h2>
          <p className="text-gray-500">Generating detailed feedback using AI...</p>
          <div className="mt-6 bg-white rounded-lg p-4 shadow-sm max-w-md">
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Processing your responses
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Analyzing technical skills
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                Generating recommendations
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="space-y-3">
              <button
                onClick={generateFeedback}
                className="w-full bg-[#012A4A] text-white px-4 py-2 rounded-lg hover:bg-[#024169] transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Try Again
              </button>
              <button
                onClick={() => navigate("/setup")}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Take Another Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!feedback) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <Award className="text-[#012A4A]" size={20} />
            <span className="text-sm font-medium text-[#012A4A]">Interview Complete</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Performance Feedback</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI-powered analysis of your interview performance with personalized recommendations.
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold ${getScoreColor(feedback.overallScore || 0)}`}>
                {feedback.overallScore || 0}%
              </div>
              <p className="text-sm text-gray-600 mt-2">Overall Score</p>
            </div>
            
            <div className="text-center">
              <div className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-lg font-bold ${getGradeColor(feedback.overallGrade)}`}>
                {feedback.overallGrade || 'N/A'}
              </div>
              <p className="text-sm text-gray-600 mt-2">Grade</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-[#012A4A]">
                {feedback.completionRate || 0}%
              </div>
              <p className="text-sm text-gray-600 mt-2">Completion Rate</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-[#012A4A]">
                {feedback.metrics.questionsAnswered}/{feedback.metrics.totalQuestions}
              </div>
              <p className="text-sm text-gray-600 mt-2">Questions Answered</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'detailed', label: 'Question Analysis', icon: MessageCircle },
              { id: 'recommendations', label: 'Recommendations', icon: Target }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedTab(id)}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium transition-colors ${
                  selectedTab === id
                    ? 'text-[#012A4A] border-b-2 border-[#012A4A] bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageCircle className="text-blue-600" size={20} />
                      <span className="font-medium">Communication</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">
                      {feedback.metrics.averageCommunicationScore}%
                    </div>
                  </div>

                  {feedback.metrics.averageTechnicalScore && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Code className="text-green-600" size={20} />
                        <span className="font-medium">Technical Skills</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">
                        {feedback.metrics.averageTechnicalScore}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Communication Analysis */}
                {feedback.communicationAnalysis && feedback.communicationAnalysis.totalWordsSpoken > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Communication Analysis</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-700">
                            {feedback.communicationAnalysis.totalWordsSpoken}
                          </div>
                          <div className="text-sm text-blue-600">Total Words</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-700">
                            {feedback.communicationAnalysis.averageWordsPerResponse}
                          </div>
                          <div className="text-sm text-blue-600">Avg per Response</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-700 capitalize">
                            {feedback.communicationAnalysis.communicationPatterns?.brevity || 'N/A'}
                          </div>
                          <div className="text-sm text-blue-600">Response Style</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-700 capitalize">
                            {feedback.communicationAnalysis.communicationPatterns?.technicalLanguageUse || 'N/A'}
                          </div>
                          <div className="text-sm text-blue-600">Tech Language Use</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Category Performance */}
                {Object.keys(feedback.categoryPerformance).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance by Category</h3>
                    <div className="space-y-4">
                      {Object.entries(feedback.categoryPerformance).map(([category, performance]) => (
                        <div key={category} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium capitalize">{category.replace('-', ' ')}</span>
                            <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(performance.averageScore)}`}>
                              {performance.averageScore}%
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>
                              {performance.questionsAnswered}/{performance.totalQuestions} questions completed 
                              ({performance.completionRate}% completion rate)
                            </div>
                            {performance.transcriptAvailable > 0 && (
                              <div className="text-blue-600">
                                {performance.transcriptAvailable} responses transcribed
                                {performance.averageWordsSpoken > 0 && ` • Avg ${performance.averageWordsSpoken} words spoken`}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Strengths and Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <TrendingUp className="text-green-600" size={20} />
                      Key Strengths
                    </h3>
                    <div className="space-y-2">
                      {feedback.overallStrengths.length > 0 ? feedback.overallStrengths.map((strength, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-green-800">{strength}</span>
                        </div>
                      )) : (
                        <div className="text-sm text-gray-500 italic">No specific strengths identified</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <TrendingDown className="text-orange-600" size={20} />
                      Areas for Improvement
                    </h3>
                    <div className="space-y-2">
                      {feedback.overallImprovements.length > 0 ? feedback.overallImprovements.map((improvement, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                          <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-orange-800">{improvement}</span>
                        </div>
                      )) : (
                        <div className="text-sm text-gray-500 italic">No specific improvements identified</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'detailed' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Question-by-Question Analysis</h3>
                {feedback.questionFeedbacks.length > 0 ? feedback.questionFeedbacks.map((questionFeedback, index) => (
                  <div key={questionFeedback.questionId || index} className="border rounded-lg overflow-hidden">
                    <div 
                      className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleQuestionExpansion(questionFeedback.questionId || index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-600">Q{index + 1}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(questionFeedback.score || 0)}`}>
                            {questionFeedback.score || 0}%
                          </span>
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded capitalize">
                            {questionFeedback.questionType || 'general'}
                          </span>
                          {questionFeedback.hasTranscript && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded flex items-center gap-1">
                              <MessageCircle size={12} />
                              Transcript Available
                            </span>
                          )}
                          {!questionFeedback.wasAnswered && (
                            <XCircle className="text-red-500" size={16} />
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {expandedQuestions.has(questionFeedback.questionId || index) ? '−' : '+'}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {questionFeedback.questionText || 'Question text not available'}
                      </p>
                    </div>
                    
                    {expandedQuestions.has(questionFeedback.questionId || index) && (
                      <div className="p-4 border-t bg-white">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-800 mb-2">Question</h4>
                            <p className="text-sm text-gray-600">{questionFeedback.questionText}</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Score:</span> {questionFeedback.score || 0}%
                            </div>
                            <div>
                              <span className="font-medium">Difficulty:</span> {questionFeedback.difficulty || 'N/A'}
                            </div>
                            <div>
                              <span className="font-medium">Status:</span> {questionFeedback.wasAnswered ? 'Answered' : 'Skipped'}
                            </div>
                            {questionFeedback.transcriptWordCount > 0 && (
                              <div>
                                <span className="font-medium">Words Spoken:</span> {questionFeedback.transcriptWordCount}
                              </div>
                            )}
                          </div>

                          {/* Show transcript if available */}
                          {questionFeedback.hasTranscript && questionFeedback.transcription && (
                            <div>
                              <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                                <MessageCircle size={16} />
                                Your Response (Transcribed)
                              </h4>
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-800 italic">
                                  "{questionFeedback.transcription.text || 'Transcription not available'}"
                                </p>
                                <div className="mt-2 text-xs text-blue-600">
                                  Words: {questionFeedback.transcription.text ? questionFeedback.transcription.text.split(/\s+/).length : 0} • 
                                  Confidence: {Math.round((questionFeedback.transcription.confidence || 0) * 100)}%
                                </div>
                              </div>
                            </div>
                          )}

                          {questionFeedback.detailedFeedback && (
                            <div>
                              <h4 className="font-medium text-gray-800 mb-2">Detailed Feedback</h4>
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                {questionFeedback.detailedFeedback}
                              </p>
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {questionFeedback.strengths && questionFeedback.strengths.length > 0 && (
                              <div>
                                <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                                <ul className="space-y-1">
                                  {questionFeedback.strengths.map((strength, i) => (
                                    <li key={i} className="text-sm text-green-600 flex items-start gap-2">
                                      <CheckCircle size={12} className="flex-shrink-0 mt-1" />
                                      {strength}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {questionFeedback.improvements && questionFeedback.improvements.length > 0 && (
                              <div>
                                <h4 className="font-medium text-orange-700 mb-2">Areas to Improve</h4>
                                <ul className="space-y-1">
                                  {questionFeedback.improvements.map((improvement, i) => (
                                    <li key={i} className="text-sm text-orange-600 flex items-start gap-2">
                                      <AlertCircle size={12} className="flex-shrink-0 mt-1" />
                                      {improvement}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Communication Scores */}
                          {questionFeedback.communicationScore && (
                            <div className="bg-slate-50 rounded-lg p-3">
                              <h4 className="font-medium text-slate-700 mb-2">Performance Scores</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div>
                                  <div className="text-slate-600">Communication</div>
                                  <div className={`font-bold ${getScoreColor(questionFeedback.communicationScore)}`}>
                                    {questionFeedback.communicationScore}%
                                  </div>
                                </div>
                                {questionFeedback.technicalScore && (
                                  <div>
                                    <div className="text-slate-600">Technical</div>
                                    <div className={`font-bold ${getScoreColor(questionFeedback.technicalScore)}`}>
                                      {questionFeedback.technicalScore}%
                                    </div>
                                  </div>
                                )}
                                <div>
                                  <div className="text-slate-600">Completeness</div>
                                  <div className={`font-bold ${getScoreColor(questionFeedback.completeness || 0)}`}>
                                    {questionFeedback.completeness || 0}%
                                  </div>
                                </div>
                                {questionFeedback.clarity && (
                                  <div>
                                    <div className="text-slate-600">Clarity</div>
                                    <div className={`font-bold ${getScoreColor(questionFeedback.clarity)}`}>
                                      {questionFeedback.clarity}%
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="mx-auto mb-2" size={48} />
                    <p>No detailed question feedback available</p>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'recommendations' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Target className="text-[#012A4A]" size={20} />
                    Actionable Recommendations
                  </h3>
                  <div className="space-y-3">
                    {feedback.recommendations.length > 0 ? feedback.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <div className="bg-[#012A4A] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm text-blue-800">{recommendation}</span>
                      </div>
                    )) : (
                      <div className="text-sm text-gray-500 italic">No specific recommendations available</div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="text-yellow-500" size={20} />
                    Next Steps
                  </h3>
                  <div className="space-y-3">
                    {feedback.nextSteps.length > 0 ? feedback.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                        <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm text-yellow-800">{step}</span>
                      </div>
                    )) : (
                      <div className="text-sm text-gray-500 italic">No specific next steps available</div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Interview Details</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Role:</span>
                      <div className="font-medium">{feedback.interviewMetadata.role || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Company:</span>
                      <div className="font-medium">{feedback.interviewMetadata.company || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <div className="font-medium capitalize">{feedback.interviewMetadata.interviewType || 'N/A'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Difficulty:</span>
                      <div className="font-medium capitalize">{feedback.interviewMetadata.difficulty || 'N/A'}</div>
                    </div>
                    {feedback.interviewMetadata.includedCoding && (
                      <div>
                        <span className="text-gray-600">Language:</span>
                        <div className="font-medium">{feedback.interviewMetadata.language || 'N/A'}</div>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-600">Generated:</span>
                      <div className="font-medium">
                        {feedback.generatedAt ? new Date(feedback.generatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/interview")}
            className="flex items-center justify-center gap-2 bg-[#012A4A] text-white px-6 py-3 rounded-lg hover:bg-[#024169] transition-colors font-medium"
          >
            <RotateCcw size={18} />
            Take Another Interview
          </button>
        </div>
      </div>
    </div>
  );
}