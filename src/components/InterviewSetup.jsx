import React, { useState } from "react";
import {
  Upload,
  Briefcase,
  FileText,
  PlayCircle,
  Sparkles,
  Users,
  Brain,
  Settings,
  Building2,
  Code2,
  Clock,
  ClipboardList,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function InterviewSetup() {
  const [resumeFile, setResumeFile] = useState(null);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [type, setType] = useState("technical");
  const [difficulty, setDifficulty] = useState("medium");
  const [includeCoding, setIncludeCoding] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [duration, setDuration] = useState("medium");

  const handleFileChange = (e) => setResumeFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile || !role || !type || !jobDescription) {
      alert("Please fill all required fields");
      return;
    }
    const setupData = {
      resumeName: resumeFile.name,
      role,
      company,
      jobDescription,
      type,
      difficulty,
      includeCoding,
      language: includeCoding ? language : null,
      duration,
    };
    console.log("Interview setup data:", setupData);
    alert("Interview setup complete!");
  };

  const interviewTypes = [
    { value: "technical", label: "Technical", icon: Brain },
    { value: "hr", label: "HR", icon: Users },
    { value: "behavioral", label: "Behavioral", icon: FileText },
  ];

  const difficultyLevels = [
    { value: "easy", label: "Easy", color: "text-green-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "hard", label: "Hard", color: "text-red-600" },
  ];

  const durations = [
    { value: "short", label: "Short (5 Qs)" },
    { value: "medium", label: "Medium (10 Qs)" },
    { value: "long", label: "Long (15 Qs)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 pt-20 pb-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#012A4A] mb-2">Interview Setup</h1>
          <p className="text-gray-600 text-md max-w-xl mx-auto">
            Configure your preferences and get started with your AI mock interview.
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-100"
        >
          {/* Resume Upload */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-1 flex items-center gap-2">
              <Upload size={18} /> Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 mt-2 border border-gray-300 rounded-lg p-3 bg-gray-50"
              required
            />
            {resumeFile && (
              <p className="mt-2 text-sm text-green-600">
                ✅ {resumeFile.name} uploaded successfully
              </p>
            )}
          </div>

          {/* Job Role */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-1 flex items-center gap-2">
              <Briefcase size={18} /> Job Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-sm text-gray-700"
              required
            >
              <option value="">Choose your role...</option>
              <option value="frontend">Frontend Developer</option>
              <option value="backend">Backend Developer</option>
              <option value="fullstack">Full Stack Developer</option>
              <option value="data">Data Scientist</option>
              <option value="devops">DevOps Engineer</option>
            </select>
          </div>

          {/* Target Company */}
          <div>
  <label className="text-sm font-semibold text-[#012A4A] mb-1 flex items-center gap-2">
    <Building2 size={18} /> Target Company
  </label>
  <input
    type="text"
    value={company}
    onChange={(e) => setCompany(e.target.value)}
    placeholder="e.g. Google, Microsoft, StartupX"
    className="w-full border border-gray-300 rounded-lg p-3 bg-white text-sm text-gray-700"
  />
  {!company && (
    <p className="text-xs text-gray-500 mt-1">
      Default: <span className="font-medium">General Interview</span>
    </p>
  )}
</div>


          {/* Job Description */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-1 flex items-center gap-2">
              <ClipboardList size={18} /> Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-sm text-gray-700"
              required
            />
          </div>

          {/* Interview Type */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-2 flex items-center gap-2">
              <Settings size={18} /> Interview Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {interviewTypes.map(({ value, label, icon: Icon }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-sm transition-all ${
                    type === value
                      ? "bg-[#012A4A] text-white border-[#012A4A] shadow"
                      : "bg-white border-gray-300 text-gray-700 hover:border-[#012A4A]"
                  }`}
                >
                  <input
                    type="radio"
                    name="interviewType"
                    value={value}
                    checked={type === value}
                    onChange={(e) => setType(e.target.value)}
                    className="hidden"
                  />
                  <Icon size={20} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-2 flex items-center gap-2">
              <Brain size={18} /> Difficulty Level
            </label>
            <div className="flex gap-4">
              {difficultyLevels.map(({ value, label, color }) => (
                <label
                  key={value}
                  className={`flex-1 text-center py-2 rounded-lg border cursor-pointer font-medium transition-all ${
                    difficulty === value
                      ? `bg-[#012A4A] text-white border-[#012A4A]`
                      : `bg-white text-gray-700 border-gray-300 hover:border-[#012A4A] ${color}`
                  }`}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={value}
                    checked={difficulty === value}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="hidden"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Coding Toggle */}
          {type === "technical" && (
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-[#012A4A] mb-1">
                <Code2 size={18} /> Include Coding Questions?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={includeCoding}
                  onChange={(e) => setIncludeCoding(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-700">Yes, add live coding tasks</span>
              </div>
              {includeCoding && (
                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-600">Preferred Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 bg-white text-sm text-gray-700 mt-1"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="c++">C++</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Duration */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-2 flex items-center gap-2">
              <Clock size={18} /> Interview Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-sm text-gray-700"
            >
              {durations.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <Link
            to="/interviewscreen"
              type="submit"
              className="w-full bg-gradient-to-r from-[#012A4A] to-[#013A5A] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-[#024169] hover:to-[#035274] transition-all"
            >
              <PlayCircle size={20} /> Start Interview
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
