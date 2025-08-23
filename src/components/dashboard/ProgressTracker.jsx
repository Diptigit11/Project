import React from "react";

const ProgressTracker = () => {
  const progress = 65; // example %

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Progress Tracker</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
       
      
      <div className="w-full bg-gray-200 rounded-full h-4">
  <div
    className="bg-gradient-to-r from-[#012A4A] to-[#013A5A] h-4 rounded-full"
    style={{ width: `${progress}%` }}
  />
</div>
<p className="text-center mt-2 font-medium text-[#012A4A]">{progress}% Completed</p>
</div>
    </div>
  );
};

export default ProgressTracker;
