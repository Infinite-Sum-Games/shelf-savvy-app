import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";
import Leaderboard from "./components/Leaderboard";
function App() {
  return (
    <>
      <div className="flex flex-col">
        <Router>
          <div className="fixed top-0 left-0 w-full z-50">
            <Navbar />
          </div>
          <div className="pt-16">
            {" "}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipe />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
