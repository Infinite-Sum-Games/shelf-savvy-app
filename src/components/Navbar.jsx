import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-500 p-4 text-white flex justify-around">
      <Link to="/">Home</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </nav>
  );
}

export default Navbar;
