import React from "react";
import { FaSmile, FaBullseye, FaCheckCircle, FaUsers } from "react-icons/fa";

const stats = [
  { label: "Confidence", value: 78, icon: <FaSmile size={28} /> },
  { label: "Accuracy", value: 85, icon: <FaCheckCircle size={28} /> },
  { label: "Clarity", value: 72, icon: <FaBullseye size={28} /> },
  { label: "Engagement", value: 66, icon: <FaUsers size={28} /> },
];

export default function StatsBars() {
  return (
    <div className="flex flex-col gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
        >
          {/* Icon */}
          <div className="text-[#012A4A] text-2xl">{s.icon}</div>

          {/* Label + Progress */}
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium text-gray-700">{s.label}</p>
              <p className="text-sm font-semibold text-[#012A4A]">
                {s.value}%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-[#FACC15] to-[#F59E0B] transition-all duration-700"
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
