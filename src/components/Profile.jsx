import React, { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [aboutText, setAboutText] = useState(
    "I am a passionate Frontend Developer specializing in creating responsive and interactive web applications using React, Tailwind CSS, and modern frontend tools. I enjoy crafting intuitive user interfaces and continuously improving my skills to deliver exceptional digital experiences.\n\nAlways eager to learn, I focus on writing clean, maintainable code and collaborating effectively in team environments. My goal is to turn complex problems into elegant solutions while keeping the user experience seamless and engaging."
  );

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-15 flex flex-col items-center">
      {/* Profile Card */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#012A4A] to-[#013A5A] rounded-3xl shadow-2xl text-white p-10 flex flex-col md:flex-row items-center md:justify-between gap-6 mt-12">
        {/* Avatar Info */}
        <div className="flex items-center gap-6">
          <div className="h-28 w-28 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-[#012A4A]">
            JD
          </div>
          <div>
            <h2 className="text-3xl font-bold">John Doe</h2>
            <p className="text-gray-200 text-sm mt-1">johndoe@example.com</p>
          </div>
        </div>

      
      </div>

      {/* About / Bio Section */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 mt-10 w-full max-w-4xl relative">
        <h3 className="text-2xl font-bold text-[#012A4A] mb-4">About Me</h3>

        {isEditing ? (
          <>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 text-base leading-relaxed focus:ring-2 focus:ring-[#012A4A] outline-none"
              rows="6"
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#012A4A] hover:bg-[#013A5A] text-yellow-400 px-4 py-2 rounded-lg text-sm font-semibold"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>
            {/* Edit About Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-6 right-6 bg-[#012A4A] text-yellow-400 px-4 py-2 rounded-lg shadow hover:bg-[#013A5A] transition duration-300 text-sm font-semibold"
            >
              Edit About
            </button>
          </>
        )}
      </div>
    </div>
  );
}
