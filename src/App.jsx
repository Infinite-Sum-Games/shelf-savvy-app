import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <>
      <Router>
        <div className="relative h-screen w-screen flex flex-row">
 
          <div className="absolute inset-0 ">
            <img
              src="/food-bg4.jpg"
              alt="Background1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Sidebar Navbar */}
          <div className="relative">
            <Navbar />
          </div>

          {/* Content Overlay */}
          <div className="relative flex-grow flex flex-col p-4 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipe />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
