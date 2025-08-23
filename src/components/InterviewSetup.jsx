import React, { useState } from "react";
import {
  Upload,
  Briefcase,
  FileText,
  PlayCircle,
  Users,
  Brain,
  Settings,
  Building2,
  Code2,
  Clock,
  ClipboardList,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function InterviewSetup() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [type, setType] = useState("technical");
  const [difficulty, setDifficulty] = useState("medium");
  const [includeCoding, setIncludeCoding] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [duration, setDuration] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => setResumeFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!role || !jobDescription) {
      setError("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }
      formData.append("role", role);
      formData.append("company", company || "General Company");
      formData.append("jobDescription", jobDescription);
      formData.append("type", type);
      formData.append("difficulty", difficulty);
      formData.append("includeCoding", includeCoding.toString());
      formData.append("language", language);
      formData.append("duration", duration);

      const response = await fetch("http://localhost:5000/api/generate-questions", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate questions");
      }

      const data = await response.json();
      
      // Store the questions and metadata in localStorage or context for the interview screen
      localStorage.setItem("interviewQuestions", JSON.stringify(data.questions));
      localStorage.setItem("interviewMetadata", JSON.stringify(data.metadata));
      
      // Navigate to interview screen
      navigate("/interviewscreen");
      
    } catch (error) {
      console.error("Error generating questions:", error);
      setError(error.message || "Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

  const roleOptions = [
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "Full Stack Developer", label: "Full Stack Developer" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "DevOps Engineer", label: "DevOps Engineer" },
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Product Manager", label: "Product Manager" },
    { value: "UI/UX Designer", label: "UI/UX Designer" },
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "Mobile Developer", label: "Mobile Developer" },
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
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Resume Upload */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-1 flex items-center gap-2">
              <Upload size={18} /> Upload Resume (PDF, DOC, DOCX, TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 mt-2 border border-gray-300 rounded-lg p-3 bg-gray-50"
            />
            {resumeFile && (
              <p className="mt-2 text-sm text-green-600">
                ✅ {resumeFile.name} uploaded successfully
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Optional: Upload your resume for personalized questions (Max 5MB)
            </p>
          </div>

          {/* Job Role */}
          <div>
            <label className="text-sm font-semibold text-[#012A4A] mb-1 flex items-center gap-2">
              <Briefcase size={18} /> Job Role *
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-sm text-gray-700"
              required
            >
              <option value="">Choose your role...</option>
              {roleOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
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
              <ClipboardList size={18} /> Job Description *
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
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
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
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
                isLoading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#012A4A] to-[#013A5A] text-white hover:from-[#024169] hover:to-[#035274]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <PlayCircle size={20} />
                  Start Interview
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}