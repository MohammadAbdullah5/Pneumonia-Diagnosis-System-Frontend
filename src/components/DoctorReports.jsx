import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";

const DiagnosisReports = () => {
  const [reports, setReports] = useState([]);
  const token = useSelector((state) => state.auth.token);
  
  useEffect(() => {
    axios.get("https://localhost:7098/reports", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setReports(res.data);
        toast.success("Diagnosis reports loaded successfully.")
      })
      .catch((err) => {
        toast.error("Failed to load diagnosis reports.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
      <ToastContainer />
      <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
        <Link to="/dashboard">← Back to Dashboard</Link>
      </button>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Diagnosis Reports
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-700 font-semibold">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Diagnosis</th>
                <th className="px-6 py-4">Diagnosed On</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {reports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4">{report.patientName}</td>
                  <td className="px-6 py-4">{report.age}</td>
                  <td className="px-6 py-4">{report.gender}</td>
                  <td className="px-6 py-4 font-medium">{report.diagnosis}</td>
                  <td className="px-6 py-4">{report.diagnosedOn}</td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No diagnosis reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisReports;
