import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";
import Leaderboard from "./components/Leaderboard";
import Topbar from "./components/Topbar";
import OTP from "./components/OTP";
import Login from "./components/Login";
import Register from "./components/Register";

// Utility function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("authToken");

// Utility function to check if the temp token is available
const hasTempToken = () => !!localStorage.getItem("tempToken");

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// OTP Route Protection
const ProtectedRouteForOTP = ({ children }) => {
  return hasTempToken() ? children : <Navigate to="/register" replace />;
};

function App() {
  return (
    <Router>
      {/* Fullscreen container */}
      <div className="relative h-screen w-screen">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/food-bg4.jpg"
            alt="Background1"
            className="w-full h-full object-cover"
          />
        </div>
        <Topbar />
        <div className="relative mt-[50px]">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* OTP Route */}
            <Route
              path="/otp"
              element={
                <ProtectedRouteForOTP>
                  <OTP />
                </ProtectedRouteForOTP>
              }
            />

            {/* Authenticated Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <Recipe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
