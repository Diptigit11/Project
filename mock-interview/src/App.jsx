import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIInterviewHero from './components/AIInterviewHero';
import Footer from './components/Footer';
function Approutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/bar" element={<Navbar />} />
        <Route path="/hel" element={<AIInterviewHero />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Approutes;