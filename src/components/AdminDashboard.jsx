import React from "react";
import { Link } from "react-router-dom";
import { Users, Shield, ActivitySquare } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Welcome, Admin!
        </h1>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <Users className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">Doctor Management</h2>
            <p className="text-gray-600 text-sm mb-2">
              Edit doctor profile credentials
            </p>
            <Link
              to="/edit-doctor"
              className="text-blue-600 text-sm hover:underline"
            >
              Edit Doctor Profile →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <Shield className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">Login Attempt Logs</h2>
            <p className="text-gray-600 text-sm mb-2">
              Review login attempts and flag suspicious activity.
            </p>
            <Link
              to="/login-logs"
              className="text-blue-600 text-sm hover:underline"
            >
              View Logs →
            </Link>
          </div>
          {/* API Monitoring Card */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
            <ActivitySquare className="text-blue-600 mb-3" size={32} />
            <h2 className="text-lg font-semibold">API Monitoring</h2>
            <p className="text-gray-600 text-sm mb-2">
              View real-time API endpoint usage and performance.
            </p>
            <Link
              to="/api-monitoring"
              className="text-blue-600 text-sm hover:underline"
            >
              Monitor API →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
