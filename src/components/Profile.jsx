import React from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  // Dummy user data (replace with real data from backend/API)
  const user = {
    name: "Fatima Noor",
    email: "fatima.noor@example.com",
    age: 29,
    gender: "Female",
    phone: "+92 300 1234567",
    address: "Lahore, Punjab, Pakistan",
    medicalHistory: "No chronic illness. Previous pneumonia in 2022.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
        <button
          className="mb-6 text-blue-600 hover:underline text-sm font-medium"
        >
          <Link to="/home">
            ← Back to Dashboard
          </Link>
        </button>
      <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Your Profile</h2>
        <div className="space-y-4 text-gray-700 text-base">
          <div className="flex justify-between">
            <span className="font-medium">Full Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Age:</span>
            <span>{user.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span>{user.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{user.address}</span>
          </div>
          <div className="pt-4">
            <span className="font-medium block mb-1">Medical History:</span>
            <p className="text-sm bg-blue-50 p-3 rounded">{user.medicalHistory}</p>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
