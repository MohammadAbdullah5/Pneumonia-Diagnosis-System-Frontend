import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";

const PatientReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.user); 
  const token = useSelector((state => state.auth.token));
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get("https://localhost:7098/my-reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data);
      } catch (error) {
        toast.error("Failed to fetch reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <ToastContainer />
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

        {loading ? (
          <p className="text-center text-gray-600">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-gray-500 text-center">No reports available yet.</p>
        ) : (
          <div className="grid gap-6">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Diagnosis Result:{" "}
                    <span
                      className={`${
                        report.diagnosis.includes("No")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {report.diagnosis}
                    </span>
                  </h3>
                  <span className="text-sm text-gray-400">{new Date(report.diagnosedAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-600 mb-2">
                  Doctor's Remarks:{" "}
                  <span className="font-medium">{report.remarks}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientReports;
