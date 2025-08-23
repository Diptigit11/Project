import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIInterviewHero from './components/AIInterviewHero';
import Footer from './components/Footer';
import FeatureSection from './components/FeatureSection';
function Approutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Main Routes */}
        <Route path="/bar" element={<Navbar />} />
        <Route path="/hel" element={<AIInterviewHero />} />
         <Route path="/about-us" element={<FeatureSection />} />

          </Routes>
    </Router>
  );
}

export default Approutes;