import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const PatientList = () => {
  const token = useSelector((state) => state.auth.token);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("https://localhost:7098/api/doctor/patients",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10">
        <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
            <Link to="/dashboard">← Back to Dashboard</Link>
        </button>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Your Patients
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-700 font-semibold">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Diagnoses</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">{patient.gender}</td>
                  <td className="px-6 py-4">{patient.diagnoses}</td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No patients found.
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

export default PatientList;
