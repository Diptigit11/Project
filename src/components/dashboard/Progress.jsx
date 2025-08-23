// src/components/Dashboard/Progress.jsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaAward, FaRocket, FaFire, FaCheckCircle } from "react-icons/fa";

// Reusable components
const StatCard = ({ label, value }) => (
  <div className="rounded-xl p-4 text-white bg-gradient-to-br from-[#012A4A] to-[#013A5A] shadow-md">
    <p className="text-sm">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const BadgeCard = ({ icon, text }) => (
  <div className="bg-gradient-to-br from-[#012A4A] to-[#013A5A] text-yellow-400
                  rounded-xl p-4 flex flex-col items-center shadow-md">
    {icon}
    <p className="mt-2 text-sm text-white font-medium">{text}</p>
  </div>
);

const LineChartCard = ({ title, data, dataKey, stroke }) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <h3 className="text-lg font-semibold text-[#012A4A] mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="week" stroke="#012A4A" />
        <YAxis stroke="#012A4A" />
        <Tooltip />
        <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const SkillCard = ({ skill, score }) => (
  <div className="flex flex-col items-center p-3 bg-white rounded-xl shadow-md">
    <p className="font-medium mb-2 text-[#012A4A]">{skill}</p>
    <div className="w-28 h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
        style={{ width: `${score}%` }}
      ></div>
    </div>
    <p className="text-sm mt-1 text-[#012A4A]">{score}%</p>
  </div>
);


export default function Progress({
  accuracyTrend = [
    { week: "Week1", accuracy: 70 },
    { week: "Week2", accuracy: 75 },
    { week: "Week3", accuracy: 80 },
    { week: "Week4", accuracy: 85 },
  ],
  topSkills = [
    { skill: "Frontend Development", score: 90 },
    { skill: "Backend Development", score: 85 },
    { skill: "Database Management", score: 78 },
    { skill: "Data Structures & Algorithms", score: 82 },
    { skill: "DevOps / Deployment", score: 70 },
  ],
  stats = [
    { label: "Avg Confidence", value: "78%" },
    { label: "Avg Accuracy", value: "82%" },
    { label: "Avg Engagement", value: "70%" },
    { label: "Avg Score", value: "80%" },
  ],
  badges = [
    { icon: <FaAward size={30} />, text: "First Interview" },
    { icon: <FaCheckCircle size={30} />, text: "5 Interviews Completed" },
    { icon: <FaRocket size={30} />, text: "Accuracy > 80%" },
    { icon: <FaFire size={30} />, text: "3 Streak Interviews" },
  ],
}) {
  return (
    <div className="p-6 space-y-6 ">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Trend Charts + Top Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChartCard
          title="Accuracy Trend"
          data={accuracyTrend}
          dataKey="accuracy"
          stroke="#012A4A"
        />
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-[#012A4A] mb-4">
            Top Technical Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topSkills.map((s, i) => (
              <SkillCard key={i} {...s} />
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Badges */}
      <div>
        <h3 className="text-lg font-semibold text-[#012A4A] mb-3">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b, i) => (
            <BadgeCard key={i} {...b} />
          ))}
        </div>
      </div>
    </div>
  );
}
