import React from "react";
import { Link } from "react-router-dom";
import { Users, Stethoscope, FileText, FileSearch } from "lucide-react";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome, Doctor!</h1>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <Users className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">Patient List</h2>
            <p className="text-gray-600 text-sm mb-2">Review all registered patients and their diagnosis history.</p>
            <Link to="/patients" className="text-blue-600 text-sm hover:underline">
              View Patients →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <Stethoscope className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">Pending Diagnoses</h2>
            <p className="text-gray-600 text-sm mb-2">Analyze uploaded chest X-rays and give expert input.</p>
            <Link to="/diagnoses" className="text-blue-600 text-sm hover:underline">
              Review Cases →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <FileText className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">Diagnostic Reports</h2>
            <p className="text-gray-600 text-sm mb-2">View completed diagnosis and final reports.</p>
            <Link to="/previous-reports" className="text-blue-600 text-sm hover:underline">
              View Reports →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
