import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customtoast.css";

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://localhost:7098/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Normalize backend field phoneNumber to phone for UI
        setUser({
          ...response.data,
          phone: response.data.phoneNumber,
        });
      } catch (error) {
        toast.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleEditProfile = async () => {
    try {
      const payload = {
        ...user,
        phoneNumber: user.phone, // Map UI 'phone' to API 'phoneNumber'
      };
      delete payload.phone; // Remove 'phone' field to avoid confusion

      const response = await axios.patch("https://localhost:7098/api/user/edit-profile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setEditMode(false);
        setUser({
          ...response.data,
          phone: response.data.phoneNumber, // Normalize again for display
        });
        navigate("/home");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  const displayFields = [
    { key: "name", label: "Full Name" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "phone", label: "Phone" },
    { key: "address", label: "Address" },
    { key: "medicalHistory", label: "Medical History" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-6 py-10">
      <ToastContainer />
      <button className="mb-6 text-blue-600 hover:underline text-sm font-medium">
        <Link to="/home">← Back to Dashboard</Link>
      </button>
      <div className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Your Profile</h2>

        <div className="space-y-4 text-gray-700 text-base">
        {displayFields.map(({ key, label }) => (
  <div key={key} className="flex justify-between items-center">
    <span className="font-medium">{label}:</span>
    {editMode ? (
      key === "gender" ? (
        <select
          className="ml-4 p-1 border rounded w-1/2 text-sm"
          name={key}
          value={user[key]?.toLowerCase() || ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      ) : (
        <input
          className="ml-4 p-1 border rounded w-1/2 text-sm"
          type="text"
          name={key}
          value={user[key] || ""}
          onChange={handleChange}
        />
      )
    ) : (
      <span className="ml-4 capitalize">{user[key]}</span>
    )}
  </div>
))}

        </div>

        <div className="mt-8 text-right space-x-4">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
