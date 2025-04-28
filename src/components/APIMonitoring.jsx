import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";
import { useSelector } from "react-redux";

const ApiMonitoring = () => {
  const [metrics, setMetrics] = useState([]);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7098/monitoring/metrics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMetrics(response.data);
      } catch (error) {
        toast.error("Error fetching metrics", error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 10000); // refresh every 10s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-8">
        <ToastContainer />
      <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
        <Link to="/admin-dashboard">← Back to Dashboard</Link>
      </button>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          API Monitoring Logs
        </h1>

        <div className="bg-blue-600 text-white text-sm font-mono rounded-md p-2 h-[32rem] overflow-y-auto shadow-inner">
          <div className="min-w-[800px] w-full overflow-x-auto space-y-1">
            {metrics.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-white/10 pb-1 last:border-none whitespace-nowrap"
              >
                <span
                  className={`pr-2 ${
                    log.responseStatus >= 500
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  [{log.responseStatus}]
                </span>
                <span className="flex-1 text-white/80 px-2 truncate">
                  {new Date(log.timestamp).toLocaleString()} | {log.method}{" "}
                  {log.endpoint} | IP: {log.ipAddress} | {log.responseTimeMs}ms
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiMonitoring;
