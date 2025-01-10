import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="h-screen w-64 bg-transparent text-white flex flex-col items-start p-4">
      <h1 className="text-2xl font-bold mb-6">Menu</h1>
      <Link
        to="/"
        className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded"
      >
        Home
      </Link>
      <Link
        to="/recipes"
        className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded"
      >
        Recipes
      </Link>
      <Link
        to="/profile"
        className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded"
      >
        Profile
      </Link>
      <Link
        to="/leaderboard"
        className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded"
      >
        Leaderboard
      </Link>
    </div>
  );
}

export default Navbar;
