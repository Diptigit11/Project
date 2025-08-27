// App.jsx
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter import
import Navbar from './components/Navbar';
import AIInterviewHero from './components/AIInterviewHero';
import Footer from './components/Footer';
import FeatureSection from './components/FeatureSection';
import InterviewSetup from './components/InterviewSetup';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/Profile';
import InterviewScreen from './components/interviewscreen/InterviewScreen';
import Dashboard from './components/dashboard/Dashboard';
import FeedBackScreen from './components/FeedbackScreen/FeedbackScreen';

function Approutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<><AIInterviewHero /><FeatureSection/> </>} />
        <Route path="/bar" element={<Navbar />} />
        <Route path="/hel" element={<AIInterviewHero />} />
        <Route path="/about-us" element={<FeatureSection />} />
        <Route path="/interview" element={<InterviewSetup />} />
        <Route path="/feedback" element={<FeedBackScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/interviewscreen" element={<InterviewScreen/>} />
                <Route path="/dashboard" element={<Dashboard/>} />


      </Routes>
      <Footer />
    </>
  );
}

export default Approutes;