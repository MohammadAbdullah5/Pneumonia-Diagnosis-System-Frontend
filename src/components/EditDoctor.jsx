import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";

const EditDoctor = () => {
  const { id } = useParams(); // doctor user ID from URL
  const token = useSelector((state) => state.auth.token);
  const [doctor, setDoctor] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        username: doctor.username,
        password: doctor.password,
      };

      const response = await axios.patch(
        `https://localhost:7098/api/admin/doctor`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Doctor updated successfully!");
        navigate("/admin-dashboard");
      } else {
        toast.error("Failed to update doctor.");
      }
    } catch (error) {
      toast.error("Error updating doctor");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <ToastContainer />
      <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
        <Link to="/manage-doctors">← Back to Doctors</Link>
      </button>

      <div className="max-w-xl mx-auto bg-white shadow rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Doctor</h2>

        <div className="space-y-4 text-gray-700 text-base">
          <div className="flex justify-between items-center">
            <span className="font-medium">Email:</span>
            <input
              className="ml-4 p-1 border rounded w-1/2 text-sm"
              type="text"
              name="username"
              placeholder="Enter new email"
              value={doctor.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium">Password:</span>
            <input
              className="ml-4 p-1 border rounded w-1/2 text-sm"
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
        </div>

        <div className="mt-8 text-right space-x-4">
          <button
            onClick={() => navigate("/admin-dashboard")}
            className="px-4 py-2 border rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
