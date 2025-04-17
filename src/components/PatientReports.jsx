import React from "react";
import { Link } from "react-router-dom";

const mockReports = [
  {
    id: 1,
    date: "2025-04-10",
    result: "Pneumonia Detected",
    confidence: "92%",
    status: "Reviewed",
  },
  {
    id: 2,
    date: "2025-03-22",
    result: "No Pneumonia",
    confidence: "97%",
    status: "Reviewed",
  },
  {
    id: 3,
    date: "2025-02-14",
    result: "Pneumonia Detected",
    confidence: "88%",
    status: "Reviewed",
  },
];

const PatientReports = () => {
  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <button
          className="mb-6 text-blue-600 hover:underline text-sm font-medium"
        >
          <Link to="/home">
            ← Back to Dashboard
          </Link>
        </button>
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Your Diagnosis Reports
        </h2>

        {mockReports.length === 0 ? (
          <p className="text-gray-500 text-center">No reports available yet.</p>
        ) : (
          <div className="grid gap-6">
            {mockReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Diagnosis Result:{" "}
                    <span
                      className={`${
                        report.result.includes("No")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.result}
                    </span>
                  </h3>
                  <span className="text-sm text-gray-400">{report.date}</span>
                </div>
                <p className="text-gray-600 mb-2">
                  Confidence Level: <span className="font-medium">{report.confidence}</span>
                </p>
                <p className="text-gray-600 mb-4">
                  Status: <span className="font-medium">{report.status}</span>
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                  View Full Report
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientReports;
