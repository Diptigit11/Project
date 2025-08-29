import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, ClipboardList, ShieldCheck } from "lucide-react";

export default function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      alert("Please upload resume and provide job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    const res = await fetch("http://localhost:5000/api/analyze-resume", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    navigate("/resume-result", { state: { feedback: data.feedback } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50  to-white flex flex-col items-center p-10">
      {/* Top Heading */}
      <div className="text-center mt-10 mb-10">
        <h1 className="text-4xl font-extrabold text-[#012A4A]">
          Resume Analyzer
        </h1>
        <p className="text-gray-600 mt-2 text-sm">
          Upload your resume and job description to get instant AI-powered feedback
        </p>
      </div>

      {/* Two Columns Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-3xl p-8 w-full space-y-6 border border-gray-100"
        >
          {/* Resume Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <FileText className="inline mr-2 text-[#012A4A]" /> Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#012A4A] focus:border-[#012A4A]"
            />
          </div>

          {/* JD Textarea */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <ClipboardList className="inline mr-2 text-[#012A4A]" /> Job Description
            </label>
            <textarea
              rows="5"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#012A4A] focus:border-[#012A4A]"
              placeholder="Paste the job description here..."
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#012A4A] text-white py-3 rounded-xl font-semibold hover:bg-yellow-400 hover:text-[#012A4A] transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Upload size={18} /> Analyze Resume
          </button>

          {/* Footer trust note */}
          <p className="flex items-center justify-center text-xs text-gray-500 pt-4">
            <ShieldCheck size={14} className="mr-1 text-green-600" /> We respect
            your privacy. Resumes are not stored.
          </p>
        </form>

        {/* Right: Illustration */}
        <div className="flex flex-col items-center text-center space-y-4">
          
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjFiM2Y0dDkxMGh1YTFndzY1ajN6aGg1aGx2aHh3b2ZtYzkzaHN1NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IqRYjzq9wYpY9rAKPk/giphy.gif"
            alt="Resume GIF"
            className="rounded-2xl w-full max-w-md "
          />
        </div>
      </div>
    </div>
  );
}
