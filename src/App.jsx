import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";
import Leaderboard from "./components/Leaderboard";
import Topbar from "./components/Topbar";
import OTP from "./components/OTP";
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

        {/* Topbar */}
        <Topbar />

        {/* Content Section */}
        <div className="relative  mt-[50px]"> {/* Add padding to avoid overlap with Topbar */}
          <Routes>
            <Route path="/otp" element={<OTP />}/>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipe />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
