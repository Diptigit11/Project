import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Profile() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const resUser = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await resUser.json();
        if (resUser.ok) setUser(userData);

        const resAnalytics = await fetch(
          `http://localhost:5000/api/feedback/user/${userData._id}/analytics`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const analyticsData = await resAnalytics.json();
        if (resAnalytics.ok) setAnalytics(analyticsData.analytics);
      } catch (err) {
        console.error("Error fetching profile or analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAnalytics();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  // Score Trend Chart
  const scoreChartData = {
    labels:
      analytics?.scoreTrend?.map((item) =>
        new Date(item.date).toLocaleDateString()
      ) || [],
    datasets: [
      {
        label: "Interview Score",
        data: analytics?.scoreTrend?.map((item) => item.score) || [],
        borderColor: "#072472ff",
        backgroundColor: "rgba(29, 78, 216, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "Rolling Avg (last 3)",
        data: analytics?.rollingAvgTrend?.map((item) => item.rollingAvg) || [],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: false,
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  const scoreChartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true, max: 100 } },
  };

  // Grade Distribution Chart
  const gradeLabels = Object.keys(analytics?.gradeDistribution || {});
  const gradeValues = Object.values(analytics?.gradeDistribution || {});
  const gradeChartData = {
    labels: gradeLabels,
    datasets: [
      {
        label: "Grade Count",
        data: gradeValues,
        backgroundColor: "#04265fff",
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };
  const gradeChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-10 space-y-8 rounded-2xl shadow-lg">
        {/* Avatar */}
        <div className="h-28 w-28 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-300 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
          {user
            ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`
            : "?"}
        </div>

        {/* User Info */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {user ? `${user.firstName} ${user.lastName}` : "No Name"}
        </h2>
        <p className="text-center text-gray-500">{user?.email}</p>

        <div className="border-t border-gray-200"></div>

        {/* Analytics */}
        <h3 className="text-2xl font-semibold text-gray-700 text-center">
          Interview Analytics
        </h3>

        {analytics ? (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Interviews", value: analytics.totalInterviews, bg: "bg-blue-50", text: "text-blue-700" },
                { label: "Avg Score", value: `${analytics.avgScore}%`, bg: "bg-green-50", text: "text-green-700" },
                { label: "Best Score", value: `${analytics.bestScore}%`, bg: "bg-yellow-50", text: "text-yellow-700" },
                { label: "Worst Score", value: `${analytics.worstScore}%`, bg: "bg-red-50", text: "text-red-700" },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`${card.bg} p-6 rounded-xl shadow-md hover:shadow-xl transition`}
                >
                  <p className="text-sm text-gray-500">{card.label}</p>
                  <p className={`text-2xl font-bold mt-2 ${card.text}`}>
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="p-6 rounded-xl bg-blue-50 shadow-md text-center">
              <p className="text-sm text-gray-500">Progress</p>
              <div className="w-full bg-yellow-100 rounded-full h-4 mt-2">
                <div
                  className="bg-blue-900 h-4 rounded-full"
                  style={{ width: `${analytics.progress}%` }}
                ></div>
              </div>
              <p className="text-2xl font-bold text-blue-900 mt-2">
                {analytics.progress}%
              </p>
            </div>

            {/* Grade Distribution Chart */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Grade Distribution
              </h4>
              {gradeLabels.length > 0 ? (
                <div style={{ height: "300px" }}>
                  <Bar data={gradeChartData} options={gradeChartOptions} />
                </div>
              ) : (
                <p className="text-gray-500">No grade data available</p>
              )}
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {analytics.mostCommonStrengths?.length > 0 && (
                <div className="p-6 bg-green-50 rounded-xl shadow-md">
                  <h4 className="text-lg font-semibold text-green-700 mb-2">
                    Common Strengths
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {analytics.mostCommonStrengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analytics.mostCommonImprovements?.length > 0 && (
                <div className="p-6 bg-red-50 rounded-xl shadow-md">
                  <h4 className="text-lg font-semibold text-red-700 mb-2">
                    Common Improvements
                  </h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {analytics.mostCommonImprovements.map((i, idx) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Last Interview */}
            {analytics.lastInterview && (
              <div className="p-6 bg-blue-50 rounded-xl shadow-md">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                  Last Interview
                </h4>
                <p className="text-gray-700">Score: {analytics.lastInterview.score}%</p>
                <p className="text-gray-700">Grade: {analytics.lastInterview.grade}</p>
                {analytics.lastInterview.strengths?.length > 0 && (
                  <p className="text-gray-700">
                    Strengths: {analytics.lastInterview.strengths.join(", ")}
                  </p>
                )}
                {analytics.lastInterview.improvements?.length > 0 && (
                  <p className="text-gray-700">
                    Improvements: {analytics.lastInterview.improvements.join(", ")}
                  </p>
                )}
              </div>
            )}

            {/* Score Trend */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Score Trend
              </h4>
              {analytics?.scoreTrend?.length > 0 ? (
                <Line data={scoreChartData} options={scoreChartOptions} />
              ) : (
                <p className="text-gray-500">No score history available</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No analytics available</p>
        )}
      </div>
    </div>
  );
}
