import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const barData = [
  { name: "Q1", score: 75 },
  { name: "Q2", score: 60 },
  { name: "Q3", score: 82 },
  { name: "Q4", score: 70 },
  { name: "Q5", score: 90 },
    { name: "Q1", score: 75 },
  { name: "Q2", score: 60 },
  { name: "Q3", score: 82 },
  { name: "Q4", score: 70 },
  { name: "Q5", score: 90 },
];

export default function QuestionScores() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-[#012A4A]">
        Question Scores
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <defs>
            <linearGradient id="gradient-hover" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FACC15" /> {/* yellow-400 */}
              <stop offset="100%" stopColor="#F59E0B" /> {/* yellow-500 */}
            </linearGradient>
          </defs>

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip/>

       <Bar
  dataKey="score"
  radius={[6, 6, 0, 0]}
  barSize={40}   // 👈 reduces bar width
  onMouseLeave={() => setActiveIndex(null)}
>
  {barData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={activeIndex === index ? "url(#gradient-hover)" : "#0d2862ff"}
      onMouseEnter={() => setActiveIndex(index)}
    />
  ))}
</Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
