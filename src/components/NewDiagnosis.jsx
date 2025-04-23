import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";

const NewDiagnosis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [symptoms, setSymptoms] = useState("");
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);
  const [audioFile, setAudioFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.warn("Please select an X-ray image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("symptoms", symptoms);
    formData.append("userId", currentUser.id);
    formData.append("audio", audioFile);

    try {
      const response = await fetch("https://localhost:7098/submit-diagnosis", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // or however you're storing your JWT
        },
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to upload");
      }

      const data = await response.json();
      toast.success("Diagnosis submitted successfully!");
      setTimeout(() => navigate("/home"), 1500);
      navigate("/home")
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <ToastContainer />
      <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
        <Link to="/home">← Back to Dashboard</Link>
      </button>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Start a New Diagnosis
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Chest X-ray Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          {/* NEW: Audio Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Upload Cough Audio (MP3, 5-10 seconds)
            </label>
            <input
              type="file"
              accept="audio/mp3"
              onChange={handleAudioChange}
              className="w-full border border-gray-300 rounded p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Please record and upload a short 5-10 second MP3 file of your
              cough.
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Symptoms
            </label>
            <textarea
              rows="4"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe any symptoms you're experiencing..."
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
            >
              Submit for Diagnosis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDiagnosis;
