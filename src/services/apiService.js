// Updated API Service for Vite
// Replace your existing apiService.js with this version

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  // Generate interview questions
  static async generateQuestions(formData) {
    try {
      console.log('Making request to:', `${API_BASE_URL}/api/generate-questions`);
      
      const response = await fetch(`${API_BASE_URL}/api/generate-questions`, {
        method: 'POST',
        body: formData, // FormData object
        // Don't set Content-Type header for FormData - let browser set it
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error - Generate Questions:', error);
      
      // Check if it's a network/CORS error
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please check if the backend is running on port 5000 and CORS is properly configured.');
      }
      
      throw error;
    }
  }

  // Save interview session
  static async saveSession(sessionData, answers) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/save-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionData,
          answers,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || 'Failed to save session');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error - Save Session:', error);
      throw error;
    }
  }

  // Get interview feedback
  static async getFeedback(answers, questions) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/get-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          questions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || 'Failed to get feedback');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error - Get Feedback:', error);
      throw error;
    }
  }

  // Health check
  static async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      
      if (!response.ok) {
        throw new Error('Health check failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error - Health Check:', error);
      throw error;
    }
  }

  // Check server status
  static async checkServerStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/`);
      
      if (!response.ok) {
        throw new Error('Server not responding');
      }

      return await response.json();
    } catch (error) {
      console.error('API Error - Server Status:', error);
      throw error;
    }
  }
}

export default ApiService;