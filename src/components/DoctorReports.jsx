import React from "react";
import { Link } from "react-router-dom";

const diagnosisReports = [
  {
    id: 1,
    patientName: "Ali Raza",
    age: 32,
    gender: "Male",
    diagnosis: "Pneumonia Detected",
    diagnosedOn: "2025-04-12",
  },
  {
    id: 2,
    patientName: "Fatima Zahra",
    age: 27,
    gender: "Female",
    diagnosis: "Clear – No Pneumonia",
    diagnosedOn: "2025-04-11",
  },
];

const DiagnosisReports = () => {
  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
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
              {diagnosisReports.map((report) => (
                <tr key={report.id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4">{report.patientName}</td>
                  <td className="px-6 py-4">{report.age}</td>
                  <td className="px-6 py-4">{report.gender}</td>
                  <td className="px-6 py-4 font-medium">{report.diagnosis}</td>
                  <td className="px-6 py-4">{report.diagnosedOn}</td>
                </tr>
              ))}
              {diagnosisReports.length === 0 && (
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
