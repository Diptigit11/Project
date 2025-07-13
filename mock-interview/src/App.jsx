// App.jsx
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter import
import Navbar from './components/Navbar';
import AIInterviewHero from './components/AIInterviewHero';
import Footer from './components/Footer';
import FeatureSection from './components/FeatureSection';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';

function Approutes() {
  return (
    <>
      <Navbar />
      <main className="mt-[70px] sm:mt-[80px]">
      <Routes>
        <Route path="/" element={<><AIInterviewHero /><FeatureSection/> </>} />
        <Route path="/bar" element={<Navbar />} />
        <Route path="/hel" element={<AIInterviewHero />} />
        <Route path="/about-us" element={<FeatureSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile/>} />


      </Routes>
      </main>
      <Footer />
    </>
  );
}

export default Approutes;