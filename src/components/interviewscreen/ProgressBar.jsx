import React from "react";

export default function ProgressBar({ current, total }) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1 text-sm text-gray-600 font-medium">
        <span>Progress</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-[#012A4A] h-3 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
