import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AIInterviewHero() {
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ['Confident', 'Prepared', 'Successful', 'Ready'];

  useEffect(() => {
    const typeWord = () => {
      const currentWord = words[currentWordIndex];
      if (typedText.length < currentWord.length) {
        setTypedText(currentWord.slice(0, typedText.length + 1));
      } else {
        setTimeout(() => {
          setTypedText('');
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 2000);
      }
    };

    const timer = setTimeout(typeWord, 150);
    return () => clearTimeout(timer);
  }, [typedText, currentWordIndex]);

  return (
    <div className="bg-white pb-12 pt-20">

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#012A4A] leading-tight mb-6">
            Get Interview{' '}
            <span className="text-[#0369a1]">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>{' '}
            <br />
            <span className="text-[#012A4A]">with AI</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Experience realistic mock interviews powered by AI. Practice in real-time, get personalized feedback, and land your dream job with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/interview" className="group bg-[#012A4A] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#023457] transition-all duration-300 shadow-md flex items-center">
              <Play className="w-6 h-6 mr-2" />
              Start Free Interview
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button className="group border border-[#012A4A] text-[#012A4A] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#012A4A] hover:text-white transition-all duration-300 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Watch Demo
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
