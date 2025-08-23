import React, { useState, useEffect } from 'react';
import { MessageSquare, Code2, Brain, Users, FileText, Lightbulb, Target, Clock, Volume2 } from 'lucide-react';

export default function QuestionPanel({ question, index, total }) {
  const [isReading, setIsReading] = useState(false);
  const [readingComplete, setReadingComplete] = useState(false);

  // Auto-read question using speech synthesis
  useEffect(() => {
    if (question && 'speechSynthesis' in window) {
      // Add a small delay before reading
      const timer = setTimeout(() => {
        readQuestionAloud();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [question]);

  const readQuestionAloud = () => {
    if (!question?.text) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    setIsReading(true);
    const utterance = new SpeechSynthesisUtterance();
    
    // Create a more natural introduction
    const introText = `Question ${index + 1} of ${total}. ${question.text}`;
    
    utterance.text = introText;
    utterance.rate = 0.8; // Slightly slower for clarity
    utterance.pitch = 1;
    utterance.volume = 0.7;
    
    // Try to use a professional voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = voices.filter(voice => 
      voice.name.includes('Google') || 
      voice.name.includes('Microsoft') ||
      voice.lang.includes('en-US')
    );
    
    if (preferredVoices.length > 0) {
      utterance.voice = preferredVoices[0];
    }

    utterance.onend = () => {
      setIsReading(false);
      setReadingComplete(true);
    };

    utterance.onerror = () => {
      setIsReading(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const getQuestionTypeConfig = () => {
    if (question?.coding) {
      return {
        icon: Code2,
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-800',
        badgeColor: 'bg-purple-100 text-purple-700',
        label: 'Coding Challenge'
      };
    }
    
    switch (question?.type) {
      case 'technical':
        return {
          icon: Brain,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          badgeColor: 'bg-blue-100 text-blue-700',
          label: 'Technical Question'
        };
      case 'behavioral':
        return {
          icon: MessageSquare,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800',
          badgeColor: 'bg-orange-100 text-orange-700',
          label: 'Behavioral Question'
        };
      case 'hr':
        return {
          icon: Users,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800',
          badgeColor: 'bg-green-100 text-green-700',
          label: 'HR Question'
        };
      default:
        return {
          icon: FileText,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800',
          badgeColor: 'bg-gray-100 text-gray-700',
          label: 'General Question'
        };
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getEstimatedTime = () => {
    if (question?.expectedDuration) {
      const minutes = Math.round(question.expectedDuration / 60);
      return `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
    return question?.coding ? '15-20 mins' : '3-5 mins';
  };


  if (!question) {
    return (
      <div className="bg-gray-50 rounded-xl p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  const config = getQuestionTypeConfig();
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl p-6 mb-6`}>
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.badgeColor}`}>
            <Icon size={20} />
          </div>
          <div>
            <h2 className={`font-bold text-lg ${config.textColor}`}>
              Question {index + 1} of {total}
            </h2>
            <p className={`text-sm font-medium ${config.badgeColor} px-3 py-1 rounded-full inline-block mt-1`}>
              {config.label}
            </p>
          </div>
        </div>

        {/* Audio Controls */}
        <button
          onClick={readQuestionAloud}
          disabled={isReading}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
            isReading 
              ? 'bg-blue-100 text-blue-700 cursor-not-allowed' 
              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200'
          }`}
          title="Read question aloud"
        >
          <Volume2 size={16} className={isReading ? 'animate-pulse' : ''} />
          {isReading ? 'Reading...' : 'Listen'}
        </button>
      </div>

      {/* Question Metadata */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty?.charAt(0).toUpperCase() + question.difficulty?.slice(1) || 'Medium'}
        </span>
        <span className="flex items-center gap-1 text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
          <Clock size={14} />
          {getEstimatedTime()}
        </span>
        {question.coding && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium border border-purple-200">
            Live Coding
          </span>
        )}
      </div>

      {/* Question Text */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 leading-relaxed mb-2">
          "{question.text}"
        </h3>
        
        {/* Reading indicator */}
        {isReading && (
          <div className="flex items-center gap-2 mt-3 text-blue-600">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm">AI is reading the question aloud...</span>
          </div>
        )}
      </div>

      {/* Coding-specific instructions */}
      {question.coding && (
        <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <Code2 size={16} />
            Coding Instructions:
          </h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Write your solution in the code editor below</li>
            <li>• Explain your approach as you code</li>
            <li>• Consider time and space complexity</li>
            <li>• Test with example inputs</li>
            <li>• Ask questions if you need clarification</li>
          </ul>
        </div>
      )}

      {/* Progress indicator */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Ready to answer? Take your time to think it through.
        </div>
      </div>
    </div>
  );
}