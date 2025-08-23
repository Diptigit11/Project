import React from "react";
import { Home, BookOpen, CheckCircle, BarChart3 } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#012A4A] text-white flex flex-col py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Dashboard</h1>
      <div className="space-y-2">
        {[
          { icon: <Home size={20} />, label: "Overview" },
          { icon: <BookOpen size={20} />, label: "Questions" },
          { icon: <BarChart3 size={20} />, label: "Progress" },
          { icon: <CheckCircle size={20} />, label: "Review" },
        ].map((item, i) => (
          <div
  key={i}
  className="flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer 
             hover:bg-gradient-to-r hover:from-[#FACC15]/70 hover:to-[#F59E0B]/70 
             hover:text-[#012A4A] transition-colors"
>
  {item.icon}
  <span className="font-medium">{item.label}</span>
</div>
        ))}
      </div>
    </div>
  );
}
