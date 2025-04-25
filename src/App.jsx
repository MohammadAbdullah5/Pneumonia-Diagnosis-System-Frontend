import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import Profile from "./components/Profile";
import ProtectedRoute from './components/ProtectedRoutes';
import NewDiagnosis from "./components/NewDiagnosis";
import PatientReports from "./components/PatientReports";
import DiagnosisReports from "./components/DoctorReports";
import PatientList from "./components/PatientList";
import PendingDiagnoses from "./components/PendingDiagnosis";
import CompleteProfile from "./components/CompleteProfile";
import AdminDashboard from "./components/AdminDashboard";
import LoginRequests from "./components/LoginLogs";
import EditDoctor from "./components/EditDoctor";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-diagnosis"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <NewDiagnosis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diagnoses"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <PendingDiagnoses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <PatientList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/previous-reports"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DiagnosisReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login-logs"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <LoginRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-doctor"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EditDoctor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
