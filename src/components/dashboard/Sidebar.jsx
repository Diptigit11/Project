// Sidebar.jsx
import React, { useState } from "react";
import { Home, BookOpen, ChevronDown, ChevronRight, BarChart3, CheckCircle } from "lucide-react";

export default function Sidebar({ activeTab, setActiveTab, setSelectedInterview }) {
  const [openHistory, setOpenHistory] = useState(false);

  const interviews = [
    { date: "22 Aug 2025", role: "Frontend Developer" },
    { date: "15 Aug 2025", role: "Backend Developer" },
    { date: "05 Aug 2025", role: "Data Analyst" },
  ];

  return (
    <div className="w-64 bg-[#012A4A] text-white flex flex-col py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Dashboard</h1>

      {/* Home */}
      <div
        onClick={() => { setActiveTab("overview"); setSelectedInterview(null); }}
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gradient-to-r hover:from-[#FACC15]/70 hover:to-[#F59E0B]/70 hover:text-[#012A4A] ${
          activeTab === "overview" ? "bg-yellow-400 text-[#012A4A]" : ""
        }`}
      >
        <Home size={20} />
        <span className="font-medium">Home</span>
      </div>

      {/* Previous Interviews */}
      <div className="mt-2">
        <div
          onClick={() => setOpenHistory(!openHistory)}
          className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-[#FACC15]/70 hover:to-[#F59E0B]/70 hover:text-[#012A4A]"
        >
          <div className="flex items-center space-x-3">
            <BookOpen size={20} />
            <span className="font-medium">Previous Interviews</span>
          </div>
          {openHistory ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>

        {openHistory && (
          <div className="ml-8 mt-2 space-y-2 text-sm text-gray-200">
            {interviews.map((item, i) => (
              <div
                key={i}
                onClick={() => { setSelectedInterview(item); setActiveTab("previous"); }}
                className="bg-[#013A5A]/50 p-2 rounded-md cursor-pointer hover:bg-[#FACC15]/20 transition-colors"
              >
                <p className="font-medium">{item.role}</p>
                <p className="text-xs opacity-75">{item.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress */}
      <div
        onClick={() => setActiveTab("progress")}
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gradient-to-r hover:from-[#FACC15]/70 hover:to-[#F59E0B]/70 hover:text-[#012A4A] ${
          activeTab === "progress" ? "bg-yellow-400 text-[#012A4A]" : ""
        }`}
      >
        <BarChart3 size={20} />
        <span className="font-medium">Progress</span>
      </div>

      {/* Review */}
      <div
        onClick={() => setActiveTab("review")}
        className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-gradient-to-r hover:from-[#FACC15]/70 hover:to-[#F59E0B]/70 hover:text-[#012A4A] ${
          activeTab === "review" ? "bg-yellow-400 text-[#012A4A]" : ""
        }`}
      >
        <CheckCircle size={20} />
        <span className="font-medium">Review</span>
      </div>
    </div>
  );
}
