// InterviewHistoryPage.jsx - Fixed API calls
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Award, TrendingUp, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InterviewHistoryPage = () => {
  const navigate = useNavigate();
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // Add API base URL - FIXED
  const API_BASE_URL = 'http://localhost:5000'; // Your backend server URL

  // Fetch feedback history from your backend - FIXED
  const fetchFeedbackHistory = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Decode user ID from JWT token
      let userId;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.id || payload._id || payload.userId;
      } catch (tokenError) {
        throw new Error('Invalid token. Please log in again.');
      }

      if (!userId) {
        throw new Error('User ID not found in token. Please log in again.');
      }
      
      console.log('Fetching feedback history for user:', userId);
      
      // FIXED: Use full backend URL
      const url = `${API_BASE_URL}/api/feedback/user/${userId}?page=${page}&limit=9`;
      console.log('Making request to:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response URL:', response.url);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Session expired. Please log in again.");
        }
        
        if (response.status === 404) {
          throw new Error("No feedback history found.");
        }
        
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch feedback: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Feedback data received:', data);
      
      setFeedbackHistory(data.feedback || []);
      setPagination(data.pagination || {});
      setError(null);
    } catch (err) {
      console.error('Error fetching feedback history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to feedback screen for detailed view
  const viewFeedbackDetails = (sessionId) => {
    // Store the session ID for the feedback screen
    localStorage.setItem('currentSessionId', sessionId);
    // Navigate to the feedback screen
    navigate(`/feedback/${sessionId}`);
  };

  useEffect(() => {
    fetchFeedbackHistory(currentPage);
  }, [currentPage]);

  // Rest of your component code remains the same...
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // ... rest of your component remains exactly the same
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">Loading your interview history...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading History</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => fetchFeedbackHistory(currentPage)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview History</h1>
          <p className="text-gray-600">Track your progress and review past interview performance</p>
        </div>

        {/* Stats Overview */}
        {feedbackHistory.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Total Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{pagination.totalCount || feedbackHistory.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(feedbackHistory.reduce((sum, f) => sum + f.overallScore, 0) / feedbackHistory.length)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Best Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.max(...feedbackHistory.map(f => f.overallScore))}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(feedbackHistory.reduce((sum, f) => sum + f.completionRate, 0) / feedbackHistory.length)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Interview History Grid */}
        {feedbackHistory.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-200">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Interview History</h3>
            <p className="text-gray-600 mb-6">You haven't completed any mock interviews yet.</p>
            <button 
              onClick={() => navigate('/interview')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Your First Interview
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {feedbackHistory.map((feedback) => (
                <div key={feedback.sessionId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 capitalize">
                          {feedback.jobRole || 'Technical Interview'}
                        </h3>
                        <p className="text-sm text-gray-600">{feedback.company || 'Mock Interview'}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(feedback.overallGrade)}`}>
                        {feedback.overallGrade}
                      </span>
                    </div>

                    {/* Score and Stats */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Overall Score</span>
                        <span className={`text-lg font-bold ${getScoreColor(feedback.overallScore)}`}>
                          {feedback.overallScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${feedback.overallScore >= 85 ? 'bg-green-500' : 
                            feedback.overallScore >= 70 ? 'bg-blue-500' : 
                            feedback.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${feedback.overallScore}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(feedback.generatedAt)}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {feedback.questionsAnswered}/{feedback.totalQuestions} questions answered
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {feedback.completionRate}% completion rate
                      </div>
                      {feedback.interviewType && (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          {feedback.interviewType} interview
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => viewFeedbackDetails(feedback.sessionId)}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Feedback
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200">
                <div className="text-sm text-gray-700">
                  Showing page {pagination.currentPage} of {pagination.totalPages} 
                  ({pagination.totalCount} total interviews)
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!pagination.hasPrev}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!pagination.hasNext}
                    className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InterviewHistoryPage;