import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainPage from "./pages/MainPage/MainPage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard";
import JobDetails from "./pages/JobSeeker/JobDetails";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import UserProfile from "./pages/JobSeeker/UserProfile";
import MyApplications from "./pages/JobSeeker/MyApplications";

import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import ManageJobs from "./pages/Employer/ManageJobs";
import ApplicationViewer from "./pages/Employer/ApplicationViewer";
import EditProfileDetails from "./pages/Employer/EditProfileDetails";
import EmployerProfile from "./pages/Employer/EmployerProfile";

import ChatPage from "./pages/Chat/ChatPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {

  return (

    <AuthProvider>

      <Router>

        <Routes>

          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/my-applications" element={<MyApplications />} />

          <Route path="/chat/:applicationId" element={<ChatPage />} />

          <Route element={<ProtectedRoute requiredRole="employer" />}>

            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<JobPostingForm />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applicants" element={<ApplicationViewer />} />
            <Route path="/company-profile" element={<EditProfileDetails />} />
            <Route path="/employer-profile" element={<EmployerProfile />} />

          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <Toaster />

      </Router>

    </AuthProvider>

  );

};

export default App;