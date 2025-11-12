import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TopNavbar from "./components/TopNavbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import HRDashboard from "./pages/HRDashboard.jsx";
import Skills from "./pages/Skills.jsx";
import Jobs from "./pages/Jobs.jsx";
import HRJobPosting from "./pages/HRJobPosting.jsx";
import Learning from "./pages/Learning.jsx";
import Interview from "./pages/Interview.jsx";
import Profile from "./pages/Profile.jsx";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user.role === 'hr' ? '/hr-dashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default function App() {
  // Get user role to determine dashboard
  const getUserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return null;
    return user.role === 'hr' ? '/hr-dashboard' : '/dashboard';
  };

  return (
    <Router>
      <Routes>
        {/* Public Landing Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Dashboard - Only for employees */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['employee', 'user']}>
              <TopNavbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* HR Dashboard - Only for HR */}
        <Route
          path="/hr-dashboard"
          element={
            <ProtectedRoute allowedRoles={['hr']}>
              <TopNavbar />
              <HRDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared Pages with Role-Based Top Navigation */}
        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <TopNavbar />
              <Skills />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={['employee', 'user']}>
              <TopNavbar />
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr_jobs"
          element={
            <ProtectedRoute allowedRoles={['hr']}>
              <TopNavbar />
              <HRJobPosting />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning"
          element={
            <ProtectedRoute allowedRoles={['employee', 'user']}>
              <TopNavbar />
              <Learning />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute allowedRoles={['employee', 'user']}>
              <TopNavbar />
              <Interview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <TopNavbar />
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
