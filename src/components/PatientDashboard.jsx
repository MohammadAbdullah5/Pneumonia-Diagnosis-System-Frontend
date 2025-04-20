import React from "react";
import { Link } from "react-router-dom";
import { FilePlus, FileText, User, Stethoscope } from "lucide-react";
import { useSelector } from "react-redux";

const PatientDashboard = () => {
  const currentUser = useSelector((state) => state.auth);
  console.log(currentUser)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Welcome back, Patient!</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <User className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">Your Profile</h2>
            <p className="text-gray-600 text-sm mb-2">Manage your information and account.</p>
            <Link to="/profile" className="text-blue-600 text-sm hover:underline">
              View Profile →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <FilePlus className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">New Diagnosis</h2>
            <p className="text-gray-600 text-sm mb-2">Upload your chest X-ray for analysis.</p>
            <Link to="/new-diagnosis" className="text-blue-600 text-sm hover:underline">
              Upload X-ray →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <FileText className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">Diagnosis Reports</h2>
            <p className="text-gray-600 text-sm mb-2">View your previous X-ray diagnosis results.</p>
            <Link to="/reports" className="text-blue-600 text-sm hover:underline">
              See Reports →
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Stethoscope size={22} className="text-blue-600" />
            Recent Diagnosis Activity
          </h3>
          <ul className="text-sm text-gray-700 space-y-3">
            <li>✅ No signs of pneumonia detected - <span className="text-gray-500">Apr 10, 2025</span></li>
            <li>⚠️ Mild pneumonia detected - <span className="text-gray-500">Mar 23, 2025</span></li>
            <li>✅ Clear - <span className="text-gray-500">Feb 12, 2025</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
