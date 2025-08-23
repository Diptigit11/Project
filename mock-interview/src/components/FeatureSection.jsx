import React from "react";
import {
  Sparkles,
  Brain,
  FileText,
  BarChart2,
  History,
} from "lucide-react";

const features = [
  {
    title: "AI-Generated Questions",
    description: "Dynamic, role-based questions using powerful AI models.",
    icon: Brain,
  },
  {
    title: "Resume Analyzer",
    description: "Upload and analyze your resume instantly with AI feedback.",
    icon: FileText,
  },
  {
    title: "Real-Time Interview",
    description: "Experience interviews with live webcam & voice simulation.",
    icon: Sparkles,
  },
  {
    title: "Smart Feedback",
    description: "Emotional and verbal feedback using facial expression analysis.",
    icon: BarChart2,
  },
  {
    title: "Interview History",
    description: "Track and view your past interviews and performance metrics.",
    icon: History,
  },
  {
    title: "Role-Based Interview Modes",
    description: "Choose from HR, Technical, or Behavioral mock interview modes.",
    icon: Sparkles,
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-white py-8 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-[#012A4A] mb-2">
          Features that Prepare You to Win
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8 text-base sm:text-lg">
          Practice smarter with AI-backed features designed for real success.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-[#012A4A]/20 rounded-xl p-6 sm:p-8 shadow-md hover:shadow-2xl hover:bg-[#f0f9ff] transition-all duration-300 delay-75 text-center h-[240px] sm:h-[300px] flex flex-col items-center justify-center"
              >
                {/* Icon */}
                <div className="mb-3 sm:mb-4 p-4 bg-[#012A4A]/10 rounded-full group-hover:bg-[#012A4A] transition-all duration-300">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#012A4A] group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform" />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-[#012A4A] group-hover:text-[#0369a1] transition-colors mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 group-hover:text-[#012A4A] transition-colors leading-snug">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
