import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { JSEncrypt } from "jsencrypt";
import CryptoJS from "crypto-js";
import { KJUR, hextob64 } from "jsrsasign";
import StyledDiagnosisDropdown from "./StyledDiagnosisOptions";

import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";

const PendingDiagnoses = () => {
  const handleChange = (field, value) => {
    setDiagnoses((prev) => ({
      ...prev,
      [selectedDiagnosisId]: {
        ...prev[selectedDiagnosisId],
        [field]: value,
      },
    }));
  };
  const [pendingDiagnoses, setPendingDiagnoses] = useState([]);
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState(null);
  const [diagnoses, setDiagnoses] = useState({});
  const [loadingAI, setLoadingAI] = useState(false);
  const [decryptedFiles, setDecryptedFiles] = useState({}); // Store decrypted files here
  const token = useSelector((state) => state.auth.token);
  const privateKey = import.meta.env.VITE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const selectedPatient = pendingDiagnoses.find(
    (p) => p.id === selectedDiagnosisId
  );

  const decryptAESKey = (encryptedKey) => {
    if (!privateKey) {
      console.error("Private key is missing!");
      return null;
    }
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(privateKey);
    const decryptedBase64 = decryptor.decrypt(encryptedKey);
    if (!decryptedBase64) {
      console.error("AES Key decryption failed!");
      return null;
    }
    return CryptoJS.enc.Base64.parse(decryptedBase64);
  };

  const fetchEncryptedFile = async (url) => {
    const response = await fetch(url);
    return response.text();
  };

  const decryptData = (encryptedData, aesKey, aesIV) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, aesKey, {
      iv: aesIV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  };

  // This useEffect will only fetch once on token change
  useEffect(() => {
    if (!token) return;

    const fetchPending = async () => {
      try {
        const res = await axios.get("https://localhost:7098/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const pendingData = await Promise.all(
          res.data.map(async (item) => {
            // Check if the file for this diagnosis has already been decrypted
            if (decryptedFiles[item.id]) {
              return { ...item, ...decryptedFiles[item.id] };
            }

            const aesKey = decryptAESKey(item.encryptedAESKey);
            if (!aesKey) {
              console.error("Skipping item due to AES key failure");
              return null;
            }

            // Fetch and decrypt only if not already done
            const encryptedImageData = await fetchEncryptedFile(item.imageUrl);
            const encryptedAudioData = await fetchEncryptedFile(item.audioUrl);
            const imageIV = CryptoJS.enc.Hex.parse(item.iv);
            const audioIV = CryptoJS.enc.Hex.parse(item.iv);

            const decryptedImageBase64 = decryptData(
              encryptedImageData,
              aesKey,
              imageIV
            );
            const decryptedAudioBase64 = decryptData(
              encryptedAudioData,
              aesKey,
              audioIV
            );

            // Store the decrypted data in state to avoid re-decrypting
            setDecryptedFiles((prev) => ({
              ...prev,
              [item.id]: {
                decryptedImage: `data:image/jpeg;base64,${decryptedImageBase64}`,
                decryptedAudio: `data:audio/mp3;base64,${decryptedAudioBase64}`,
              },
            }));

            return {
              ...item,
              decryptedImage: `data:image/jpeg;base64,${decryptedImageBase64}`,
              decryptedAudio: `data:audio/mp3;base64,${decryptedAudioBase64}`,
            };
          })
        );

        setPendingDiagnoses(pendingData.filter((item) => item !== null));
      } catch (error) {
        console.error("Error fetching pending diagnoses:", error);
      }
    };

    fetchPending();
  }, [token, decryptedFiles]);

  // Function for handling AI suggestion request
  const handleAskAISuggestion = async () => {
    if (!selectedPatient) {
      return;
    }
    try {
      setLoadingAI(true);
      const formData = new FormData();
      // Convert Base64 image to Blob
      const base64String = selectedPatient.decryptedImage.split(",")[1]; // Get the part after "data:image/jpeg;base64,"
      const byteCharacters = atob(base64String); // Decode the base64 string into binary data
      const byteArrays = [];

      // Convert the binary data to byte arrays
      for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byte = byteCharacters.charCodeAt(offset);
        byteArrays.push(byte);
      }

      // Create a Blob from the byte arrays
      const byteArray = new Uint8Array(byteArrays);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      formData.append("file", blob, "image.jpg");
      const hash = await generateImageHash(blob);
      const signedHash = await signHashWithPrivateKey(hash);

      formData.append("signature", signedHash);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const res = await axios.post("https://localhost:7098/ai-suggestion", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });

      handleChange("aiResult", res.data.diagnosis);
    } catch (error) {
      toast.error("AI suggestion error");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmitDiagnosis = async () => {
    const diagnosis = diagnoses[selectedDiagnosisId];
    try {
      await axios.post(
        `https://localhost:7098/submit`,
        {
          diagnosisId: selectedDiagnosisId,
          diagnosis: diagnosis.diagnosis,
          remarks: diagnosis.remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Diagnosis submitted!");
      setSelectedDiagnosisId(null);
      setPendingDiagnoses((prev) =>
        prev.filter((d) => d.id !== selectedDiagnosisId)
      );
    } catch (err) {
      toast.error("Error submitting diagnosis.");
    }
  };

  const generateImageHash = async (file) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const signHashWithPrivateKey = (hashHex) => {
    const privateKeyPEM = import.meta.env.VITE_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    );
    const sig = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
    sig.init(privateKeyPEM);
    sig.updateHex(hashHex);
    const signatureHex = sig.sign();
    return hextob64(signatureHex);
  };

  return (
    <div className="min-h-screen bg-blue-50 px-6 py-10 relative">
      <ToastContainer />
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
                    src={selectedPatient.decryptedImage}
                    alt="X-ray"
                    className="w-full rounded-xl border shadow"
                  />
                  <audio
                    controls
                    src={selectedPatient.decryptedAudio}
                    className="w-full mt-4"
                  >
                    Your browser does not support the audio element.
                  </audio>
                  {selectedPatient.symptoms && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-2">
                        Reported Symptoms
                      </h4>
                      <p className="text-gray-600 whitespace-pre-wrap">
                        {selectedPatient.symptoms}
                      </p>
                    </div>
                  )}
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
                <div className="mt-6 flex justify-between space-x-3">
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
