import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Navbar from './components/Navbar';
import HowItWorks from './pages/HowItWorks';
import AboutUs from './pages/AboutUs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import Profile from './components/Profile';
import NewDiagnosis from './components/NewDiagnosis';
import PatientReports from './components/PatientReports';
import DiagnosisReports from './components/DoctorReports';
import PatientList from './components/PatientList';
import PendingDiagnoses from './components/PendingDiagnosis';
import CompleteProfile from './components/CompleteProfile';

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
        <Route path="/home" element={<PatientDashboard />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-diagnosis" element={<NewDiagnosis />} />
        <Route path="/reports" element={<PatientReports />} />
        <Route path="/diagnoses" element={<PendingDiagnoses />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/previous-reports" element={<DiagnosisReports />} /> 
        <Route path="/complete-profile" element={<CompleteProfile />} />       
      </Routes>
    </Router>
  )
}

export default App
