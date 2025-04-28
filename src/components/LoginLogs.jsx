import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";

const LoginRequests = () => {
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    // Fetch login attempt logs from backend
    const fetchLoginAttempts = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7098/api/admin/login-attempts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoginAttempts(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("There was an error fetching the login attempts!", error);
      }
    };

    fetchLoginAttempts();
  }, []);

  // Handle unflagging an IP
  const unflagIp = async (ipAddress) => {
    try {
      await axios.post("https://localhost:7098/api/admin/unflag-ip", {
        ipAddress,
      });
      setLoginAttempts((prevAttempts) =>
        prevAttempts.map((attempt) =>
          attempt.ipAddress === ipAddress
            ? { ...attempt, IsFlagged: false }
            : attempt
        )
      );
    } catch (error) {
      console.error("There was an error unflagging the IP!", error);
    }
  };

  if (loading) {
    return <div className="text-center text-blue-600">Loading logs...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-8">
      <ToastContainer />
      <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
        <Link to="/admin-dashboard">← Back to Dashboard</Link>
      </button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Login Attempt Logs
        </h1>

        <div className="bg-blue-600 text-white text-sm font-mono rounded-md p-2 h-80 overflow-y-auto shadow-inner">
          <div className="min-w-[600px] w-full overflow-x-auto space-y-1">
            {loginAttempts.map((attempt) => (
              <div
                key={attempt.Id}
                className="flex items-center justify-between border-b border-white/10 pb-1 last:border-none whitespace-nowrap"
              >
                <span
                  className={`pr-2 ${
                    attempt.isSuccessful ? "text-green-400" : "text-red-400"
                  }`}
                >
                  [{attempt.isSuccessful ? "SUCCESS" : "FAILED"}]
                </span>
                <span className="flex-1 text-white/80 px-2 truncate">
                  {new Date(attempt.attemptTime).toLocaleString()} |{" "}
                  {attempt.email} | {attempt.ipAddress}
                </span>
                {attempt.IsFlagged && (
                  <button
                    onClick={() => unflagIp(attempt.ipAddress)}
                    className="ml-2 text-blue-400 hover:underline shrink-0"
                  >
                    Unflag
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequests;
