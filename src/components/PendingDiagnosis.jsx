import React, { useState } from "react";
import { Link } from "react-router-dom";
import StyledDiagnosisDropdown from "./StyledDiagnosisOptions";

const pendingDiagnoses = [
  {
    id: 1,
    patientName: "Ali Raza",
    age: 32,
    gender: "Male",
    submittedAt: "2025-04-13",
    xrayImage: "/images/xray1.png",
    aiResult: "Possible pneumonia detected in right lung.",
  },
  {
    id: 2,
    patientName: "Fatima Zahra",
    age: 27,
    gender: "Female",
    submittedAt: "2025-04-12",
    xrayImage: "/images/xray2.png",
    aiResult: "No signs of pneumonia detected.",
  },
];

const PendingDiagnoses = () => {
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState(null);
  const [diagnoses, setDiagnoses] = useState({});

  const selectedPatient = pendingDiagnoses.find(
    (p) => p.id === selectedDiagnosisId
  );

  const handleChange = (field, value) => {
    setDiagnoses((prev) => ({
      ...prev,
      [selectedDiagnosisId]: { ...prev[selectedDiagnosisId], [field]: value },
    }));
  };

  const handleSubmitDiagnosis = () => {
    const diagnosis = diagnoses[selectedDiagnosisId];
    console.log("Diagnosis Submitted:", {
      patientId: selectedDiagnosisId,
      diagnosis: diagnosis?.diagnosis,
      remarks: diagnosis?.remarks,
    });
    alert("Diagnosis submitted successfully!");
    setSelectedDiagnosisId(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10 relative">
      <Link to="/dashboard">
        <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
          ← Back to Dashboard
        </button>
      </Link>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Pending Diagnoses
        </h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-100 text-blue-700 font-semibold">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Gender</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {pendingDiagnoses.map((item) => (
                <tr key={item.id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4">{item.patientName}</td>
                  <td className="px-6 py-4">{item.age}</td>
                  <td className="px-6 py-4">{item.gender}</td>
                  <td className="px-6 py-4">{item.submittedAt}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedDiagnosisId(item.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Diagnose
                    </button>
                  </td>
                </tr>
              ))}
              {pendingDiagnoses.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No pending diagnoses at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDiagnosisId && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/40 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl p-6 relative animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4 text-blue-700">
              Diagnose Patient: {selectedPatient.patientName}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedPatient.xrayImage}
                  alt="X-ray"
                  className="w-full rounded-lg border shadow"
                />
                <p className="mt-4 text-blue-600 font-medium">
                  <strong>AI Result:</strong> {selectedPatient.aiResult}
                </p>
              </div>

              <div>
              <StyledDiagnosisDropdown
  value={diagnoses[selectedDiagnosisId]?.diagnosis || ""}
  onChange={(val) => handleChange("diagnosis", val)}
/>

                <label className="block mb-2 font-medium text-sm">
                  Remarks
                </label>
                <textarea
                  rows="4"
                  value={diagnoses[selectedDiagnosisId]?.remarks || ""}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Add any notes or recommendations..."
                />

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => setSelectedDiagnosisId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitDiagnosis}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Submit Diagnosis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingDiagnoses;
