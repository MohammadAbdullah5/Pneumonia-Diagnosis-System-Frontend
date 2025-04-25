import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, verifyMfaCode } from "../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customToast.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    requiresMfa,
    userId,
    email: storedEmail,
    status,
    error,
  } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setCode] = useState("");
  const [resendStatus, setResendStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser({ email, password }));

    if (registerUser.fulfilled.match(result)) {
      if (!result.payload.requiresMfa) {
        navigate("/complete-profile");
      } // else wait for user to enter code
    } else {
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("User ID is missing. Please try again.");
      return;
    }
    const result = await dispatch(verifyMfaCode({ userId, code: mfaCode }));
    if (verifyMfaCode.fulfilled.match(result)) {
      navigate("/complete-profile");
    } else {
      toast.error("Verification failed. Please check your code.");
    }
  };

  const handleResend = async () => {
    setResendStatus("loading");
    try {
      await axios.post("https://localhost:7098/api/auth/resend-2fa", {
        userId,
        email: storedEmail,
      });
      setResendStatus("success");
      toast.success("Verification code resent successfully.");
    } catch (err) {
      console.error(err);
      setResendStatus("error");
      toast.error("Failed to resend code.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <ToastContainer />
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {requiresMfa ? "Verify Your Account" : "Create Your Account"}
        </h2>

        {!requiresMfa ? (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleVerify}>
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                value={mfaCode}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter the code sent to your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Verifying..." : "Verify Code"}
            </button>

            <button
              type="button"
              onClick={handleResend}
              className="w-full py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 font-medium transition"
              disabled={resendStatus === "loading"}
            >
              {resendStatus === "loading" ? "Resending..." : "Resend Code"}
            </button>
          </form>
        )}

        {!requiresMfa && (
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        )}

      </div>
    </div>
  );
};

export default SignUp;
