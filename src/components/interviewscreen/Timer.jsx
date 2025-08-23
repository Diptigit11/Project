import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

export default function Timer({ perQuestionSeconds, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(perQuestionSeconds);
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState('normal'); // normal, warning, critical, finished
  const intervalRef = useRef(null);
  const hasCalledTimeUp = useRef(false);

  useEffect(() => {
    setTimeLeft(perQuestionSeconds);
    setIsActive(true);
    setPhase('normal');
    hasCalledTimeUp.current = false;
  }, [perQuestionSeconds]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 1;
          
          // Update phase based on time left
          if (newTime <= 0) {
            setPhase('finished');
            setIsActive(false);
            if (!hasCalledTimeUp.current) {
              hasCalledTimeUp.current = true;
              onTimeUp();
            }
          } else if (newTime <= 30) {
            setPhase('critical');
          } else if (newTime <= 60) {
            setPhase('warning');
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return Math.max(0, (timeLeft / perQuestionSeconds) * 100);
  };

  const getPhaseConfig = () => {
    switch (phase) {
      case 'warning':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          progressColor: 'bg-yellow-500',
          icon: AlertTriangle,
          message: 'Time running low'
        };
      case 'critical':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          progressColor: 'bg-red-500',
          icon: AlertTriangle,
          message: 'Final seconds!',
          pulse: true
        };
      case 'finished':
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          progressColor: 'bg-gray-400',
          icon: CheckCircle,
          message: 'Time\'s up!'
        };
      default:
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          progressColor: 'bg-green-500',
          icon: Clock,
          message: 'You\'re doing great!'
        };
    }
  };

  const config = getPhaseConfig();
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-xl shadow-lg p-6 ${config.pulse ? 'animate-pulse' : ''}`}>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon size={24} className={config.color} />
          <h3 className={`font-bold text-lg ${config.color}`}>
            {formatTime(timeLeft)}
          </h3>
        </div>
        
        {/* Circular Progress */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
              className={config.color}
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-sm font-semibold ${config.color}`}>
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ease-linear ${config.progressColor}`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        {/* Status Message */}
        <p className={`text-sm font-medium ${config.color}`}>
          {config.message}
        </p>

        {/* Time indicators */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-600">
          <div className="text-center">
            <div className="font-semibold text-gray-800">
              {formatTime(perQuestionSeconds - timeLeft)}
            </div>
            <div>Elapsed</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-800">
              {formatTime(perQuestionSeconds)}
            </div>
            <div>Total Time</div>
          </div>
        </div>

        {/* Motivational messages based on time */}
        {phase === 'normal' && timeLeft > 120 && (
          <div className="mt-3 text-xs text-gray-500 bg-white rounded-lg p-2">
            💡 Take your time to think through your answer
          </div>
        )}
        
        {phase === 'warning' && (
          <div className="mt-3 text-xs text-yellow-700 bg-yellow-100 rounded-lg p-2">
            ⚡ Start wrapping up your thoughts
          </div>
        )}
        
        {phase === 'critical' && (
          <div className="mt-3 text-xs text-red-700 bg-red-100 rounded-lg p-2">
            🔥 Finish your current point
          </div>
        )}
        
        {phase === 'finished' && (
          <div className="mt-3 text-xs text-gray-700 bg-gray-100 rounded-lg p-2">
            ✅ Move to the next question when ready
          </div>
        )}
      </div>

      {/* Time management tips for longer questions */}
      {perQuestionSeconds >= 900 && timeLeft === perQuestionSeconds && (
        <div className="mt-4 bg-white rounded-lg p-3 text-xs text-gray-600">
          <div className="font-semibold text-gray-700 mb-1">Time Management Tips:</div>
          <ul className="space-y-1">
            <li>• Plan: 2-3 minutes</li>
            <li>• Code: 10-12 minutes</li>
            <li>• Test & Review: 2-3 minutes</li>
          </ul>
        </div>
      )}
    </div>
  );
}