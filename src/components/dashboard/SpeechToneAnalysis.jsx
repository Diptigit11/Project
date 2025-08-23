import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Confident", value: 70, color: " #012A4A" }, // yellow
  { name: "Nervous", value: 20, color: "#F59E0B" },   // amber
  { name: "Calm", value: 10, color: "#FACC15 " },      // navy
];

export default function SpeechToneAnalysis() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-[#012A4A]">
        Speech Tone Analysis
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
            }}
            itemStyle={{ color: "#012A4A", fontWeight: 500 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
