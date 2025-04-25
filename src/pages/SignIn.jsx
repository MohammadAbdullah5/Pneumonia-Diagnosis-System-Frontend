import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, verifyMfaCode } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/customToast.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState(null);
  const [mfaCode, setMfaCode] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResendCode = async () => {
    if (resendTimer > 0 || isResending) return;

    setIsResending(true);

    try {
      const response = await axios.post(
        "https://localhost:7098/api/auth/resend-2fa",
        {
          userId,
          email,
        }
      );

      if (response.status === 200) {
        toast.success("Verification code resent to your email.");
        setResendTimer(60); // start cooldown
      } else {
        toast.error(response.data?.message || "Failed to resend code");
      }
    } catch (err) {
      toast.error(err);
      alert(err.response?.data?.message || "Error resending code");
    } finally {
      setIsResending(false);
    }
  };

  React.useEffect(() => {
    if (resendTimer === 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        const { requiresMfa, userId } = resultAction.payload;
        if (requiresMfa) {
          setUserId(userId);
          setStep(2);
        } else {
          const role = resultAction.payload.user.role;
          toast.success("✅ Login successful!");
          if (role === "admin") {
            navigate("/admin-dashboard");
          } else if (role === "doctor") {
            navigate("/dashboard");
          } else if (role === "patient") {
            navigate("/home");
          }
        }
      } else {
        toast.error("Login failed");
      }
    } else {
      try {
        const resultAction = await dispatch(
          verifyMfaCode({ userId, code: mfaCode })
        );

        if (verifyMfaCode.fulfilled.match(resultAction)) {
          toast.success("✅ MFA verified successful!");
          const role = resultAction.payload.user.role;
          role === "patient" ? navigate("/home") : navigate("/dashboard");
        } else {
          toast.error("Invalid or expired code");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "MFA verification failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          toastClassName="rounded-xl shadow-md text-sm"
        />
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
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
                  placeholder="you@example.com"
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
            </>
          ) : (
            <>
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
                  onChange={(e) => setMfaCode(e.target.value)}
                  required
                  placeholder="Enter code sent to email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            {step === 1 ? "Sign In" : "Verify Code"}
          </button>
          {step === 2 && (<p className="text-sm text-gray-600 mt-2 text-center">
            Didn’t get the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              className={`text-blue-600 hover:underline disabled:opacity-50`}
              disabled={resendTimer > 0 || isResending}
            >
              Resend Code {resendTimer > 0 && `(${resendTimer}s)`}
            </button>
          </p>)}
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
