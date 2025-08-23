import React from "react";

const PerformanceOverview = () => {
  const stats = [
    { label: "Confidence", value: 78 },
    { label: "Clarity", value: 85 },
    { label: "Accuracy", value: 72 },
    { label: "Engagement", value: 66 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
           <div className="w-20 h-20 mx-auto rounded-full border-4 border-[#FACC15] flex items-center justify-center text-lg font-bold text-[#012A4A]">
  {stat.value}%
</div>

            <p className="mt-2 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOverview;
