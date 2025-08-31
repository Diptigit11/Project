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

// 🔒 ProtectedRoute component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function Approutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<><AIInterviewHero /><FeatureSection /></>} />
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
          path="/interviewscreen"
          element={
            <ProtectedRoute>
              <InterviewScreen />
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

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Approutes;
