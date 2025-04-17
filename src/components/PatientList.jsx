import React from "react";
import { Link } from "react-router-dom";

const patients = [
  {
    id: 1,
    name: "Ali Raza",
    age: 32,
    gender: "Male",
    diagnoses: 4,
  },
  {
    id: 2,
    name: "Fatima Zahra",
    age: 27,
    gender: "Female",
    diagnoses: 2,
  },
  {
    id: 3,
    name: "Ahmed Khan",
    age: 45,
    gender: "Male",
    diagnoses: 6,
  },
  {
    id: 4,
    name: "Ayesha Noor",
    age: 39,
    gender: "Female",
    diagnoses: 3,
  },
];

const PatientList = () => {
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
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {patients.map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4">{patient.name}</td>
                  <td className="px-6 py-4">{patient.age}</td>
                  <td className="px-6 py-4">{patient.gender}</td>
                  <td className="px-6 py-4">{patient.diagnoses}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      View Records
                    </button>
                  </td>
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
