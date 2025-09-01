// App.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AIInterviewHero from "./components/AIInterviewHero";
import Footer from "./components/Footer";
import FeatureSection from "./components/FeatureSection";
import InterviewSetup from "./components/InterviewSetup";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/Profile";
import InterviewScreen from "./components/interviewscreen/InterviewScreen";
import Dashboard from "./components/dashboard/Dashboard";
import FeedBackScreen from "./components/FeedbackScreen/FeedbackScreen";
import ResumeUpload from "./components/resumeanalyser/ResumeUpload";
import ResultPage from "./components/resumeanalyser/ResultPage";
import AboutUs from "./components/AboutUs";
import InterviewHistoryPage from "./components/interviewscreen/InterviewHistoryPage";
import ScrollToTop from "./components/ScrollToTop";

// 🔒 ProtectedRoute component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

// Home page component combining Hero and Features
function HomePage() {
  return (
    <>
      <AIInterviewHero />
      <FeatureSection />
    </>
  );
}

function Approutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Development/Testing Routes - Remove in production */}
        <Route path="/bar" element={<Navbar />} />
        <Route path="/hel" element={<AIInterviewHero />} />
        <Route path="/about-us" element={<FeatureSection />} />
        
        {/* 🔒 Protected Routes */}
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <InterviewSetup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interviewscreen"
          element={
            <ProtectedRoute>
              <InterviewScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback-history"
          element={
            <ProtectedRoute>
              <InterviewHistoryPage />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/feedback/:sessionId" 
          element={
            <ProtectedRoute>
              <FeedBackScreen />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <FeedBackScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-analyzer"
          element={
            <ProtectedRoute>
              <ResumeUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume-result"
          element={
            <ProtectedRoute>
              <ResultPage />
            </ProtectedRoute>
          }
        />
        
        {/* Catch-all route for 404 pages */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Approutes;