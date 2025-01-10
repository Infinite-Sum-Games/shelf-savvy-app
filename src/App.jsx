import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Recipe from "./components/Recipe";
import Leaderboard from "./components/Leaderboard";
function App() {
  return (
    <>
      <div className="flex flex-row">
        <Router>
          
            <Navbar />
        
          <div className="flex flex-col">
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
