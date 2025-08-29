import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const feedback = location.state?.feedback || {};

  // Simple PDF download
  const handleDownloadReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Resume Analysis Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Score: ${feedback.score || 0}/100`, 14, 40);
    doc.text(`ATS Friendly: ${feedback.ats_friendly || "N/A"}`, 14, 50);
    doc.text(`Role Fit: ${feedback.fit_for_role || "N/A"}`, 14, 60);

    if (feedback.missing_keywords?.length > 0) {
      doc.text("Missing Keywords:", 14, 80);
      feedback.missing_keywords.forEach((kw, i) => {
        doc.text(`- ${kw}`, 20, 90 + i * 8);
      });
    }

    if (feedback.improvements?.length > 0) {
      const startY = 100 + (feedback.missing_keywords?.length || 0) * 8;
      doc.text("Improvements:", 14, startY);
      feedback.improvements.forEach((imp, i) => {
        doc.text(`- ${imp}`, 20, startY + 10 + i * 8);
      });
    }

    doc.save("resume_report.pdf");
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/resume-analyzer")}
          style={{
            marginBottom: "20px",
            background: "linear-gradient(to right, #facc15, #f59e0b)", // yellow gradient
            border: "none",
            color: "#000",
            fontWeight: "600",
            padding: "8px 18px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        {/* Title */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "25px",
            textAlign: "center",
            background: "linear-gradient(to right, #facc15, #f59e0b)", // yellow gradient
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Resume Analysis Report
        </h1>

        {/* Score Section */}
        <div
          style={{
            border: "1px solid #eee",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
            background: "#f9fafb",
          }}
        >
          <strong>Overall Score:</strong>{" "}
          <span style={{ color: "#012A4A", fontWeight: "600" }}>
            {feedback.score || 0}/100
          </span>
        </div>

        {/* ATS Friendly */}
        <div
          style={{
            border: "1px solid #eee",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
            background: "#f9fafb",
          }}
        >
          <strong>ATS Friendly:</strong>{" "}
          <span style={{ color: "#05055fff", fontWeight: "600" }}>
            {feedback.ats_friendly || "N/A"}
          </span>
        </div>

        {/* Role Fit */}
        <div
          style={{
            border: "1px solid #eee",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "15px",
            background: "#f9fafb",
          }}
        >
          <strong>Role Fit:</strong>{" "}
          <span style={{ color: "#0077b6", fontWeight: "600" }}>
            {feedback.fit_for_role || "N/A"}
          </span>
        </div>

        {/* Missing Keywords */}
        {feedback.missing_keywords?.length > 0 && (
          <div
            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
              background: "#fffbea",
            }}
          >
            <strong>Missing Keywords:</strong>
            <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
              {feedback.missing_keywords.map((kw, idx) => (
                <li key={idx}>{kw}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvements */}
        {feedback.improvements?.length > 0 && (
          <div
            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "15px",
              background: "#e8f4fd",
            }}
          >
            <strong>Improvements:</strong>
            <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
              {feedback.improvements.map((imp, idx) => (
                <li key={idx}>{imp}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          {/* Blue Button */}
          <button
            onClick={handleDownloadReport}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(to right, #012A4A, #013A5A)", // dark blue gradient
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              marginRight: "10px",
              fontSize: "16px",
              fontWeight: "600",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "linear-gradient(to right, #01497c, #012A4A)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "linear-gradient(to right, #012A4A, #013A5A)")
            }
          >
            Download Report
          </button>

          {/* Yellow Button */}
          <button
            onClick={() => navigate("/resume-analyzer")}
            style={{
              padding: "12px 24px",
              background: "linear-gradient(to right, #facc15, #f59e0b)", // yellow gradient
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600",
              color: "#000",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "linear-gradient(to right, #fde047, #facc15)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "linear-gradient(to right, #facc15, #f59e0b)")
            }
          >
            Upload New Resume
          </button>
        </div>
      </div>
    </div>
  );
}
