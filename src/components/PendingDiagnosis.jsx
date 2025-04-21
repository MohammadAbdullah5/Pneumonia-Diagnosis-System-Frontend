import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StyledDiagnosisDropdown from "./StyledDiagnosisOptions";
import axios from "axios";

const PendingDiagnoses = () => {
  const [pendingDiagnoses, setPendingDiagnoses] = useState([]);
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState(null);
  const [diagnoses, setDiagnoses] = useState({});
  const [loadingAI, setLoadingAI] = useState(false);

  const selectedPatient = pendingDiagnoses.find(
    (p) => p.id === selectedDiagnosisId
  );

  useEffect(() => {
    const fetchPending = async () => {
      const res = await axios.get("https://localhost:7098/pending");
      console.log(res.data);
      setPendingDiagnoses(res.data);
    };
    fetchPending();
  }, []);

  const handleChange = (field, value) => {
    setDiagnoses((prev) => ({
      ...prev,
      [selectedDiagnosisId]: {
        ...prev[selectedDiagnosisId],
        [field]: value,
      },
    }));
  };

  const handleAskAISuggestion = async () => {
    try {
      setLoadingAI(true);
      const res = await axios.get(
        `https://localhost:7098/ai-suggestion/${selectedDiagnosisId}`
      );
      console.log("AI suggestion response", res.data);
      handleChange("aiResult", res.data.diagnosis);
    } catch (error) {
      console.error("AI suggestion error", error);
      alert("Error getting AI suggestion.");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmitDiagnosis = async () => {
    const diagnosis = diagnoses[selectedDiagnosisId];
    try {
      await axios.post(`https://localhost:7098/submit`, {
        diagnosisId: selectedDiagnosisId,
        diagnosis: diagnosis.diagnosis,
        remarks: diagnosis.remarks,
      });
      alert("Diagnosis submitted!");
      setSelectedDiagnosisId(null);
      setPendingDiagnoses((prev) =>
        prev.filter((d) => d.id !== selectedDiagnosisId)
      );
    } catch (err) {
      alert("Error submitting diagnosis.");
    }
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
                <tr key={item._id} className="border-t hover:bg-blue-50">
                  <td className="px-6 py-4">{item.userName}</td>
                  <td className="px-6 py-4">{item.userAge}</td>
                  <td className="px-6 py-4">{item.userGender}</td>
                  <td className="px-6 py-4">
                    {new Date(item.submittedAt).toLocaleString()}
                  </td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/40 overflow-auto transition-all duration-300">
          <div className="min-h-full flex items-center justify-center px-4 py-8">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 relative animate-fadeIn space-y-6 overflow-y-auto max-h-screen">
              <h3 className="text-2xl font-bold text-blue-700">
                Diagnose Patient: {selectedPatient.userName}
              </h3>

              <div className="grid md:grid-cols-2 gap-6 items-start relative">
                {/* Left: image + audio */}
                <div className="h-full flex flex-col">
                  <img
                    src={selectedPatient.imageUrl}
                    alt="X-ray"
                    className="w-full rounded-xl border shadow"
                  />
                  <audio
                    controls
                    src={selectedPatient.audioUrl}
                    className="w-full mt-4"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>

                {/* Right: diagnosis form */}
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      {diagnoses[selectedDiagnosisId]?.aiResult && (
                        <div className="mt-4 text-blue-700 space-y-2 bg-white border border-blue-100 rounded-md p-4 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-semibold">
                              🤖 AI Prediction:
                            </span>
                            <span className="text-md font-medium">
                              {
                                diagnoses[selectedDiagnosisId].aiResult
                                  .prediction
                              }
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">Confidence:</span>
                            <span>
                              {diagnoses[selectedDiagnosisId].aiResult.score}%
                            </span>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={handleAskAISuggestion}
                        disabled={loadingAI}
                        className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                      >
                        {loadingAI ? "Analyzing..." : "Get AI Analysis"}
                      </button>
                    </div>

                    <StyledDiagnosisDropdown
                      value={diagnoses[selectedDiagnosisId]?.diagnosis || ""}
                      onChange={(val) => handleChange("diagnosis", val)}
                    />

                    <label className="block mb-2 font-medium text-sm mt-4">
                      Remarks
                    </label>
                    <textarea
                      rows="4"
                      value={diagnoses[selectedDiagnosisId]?.remarks || ""}
                      onChange={(e) => handleChange("remarks", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Add any notes or recommendations..."
                    />
                  </div>
                </div>

                {/* Button group */}
                <div className="mt-6 md:mt-0 md:absolute md:bottom-6 md:left-6 flex justify-start space-x-3">
                  <button
                    onClick={() => setSelectedDiagnosisId(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitDiagnosis}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
