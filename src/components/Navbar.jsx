import { Link } from 'react-router-dom';
import { Home, Book, User, Trophy, Menu as MenuIcon } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="text-white fixed top-4 left-4 z-50" // Ensure it's above other content
        onClick={toggle}
      >
        <MenuIcon size={32} />
      </button>

      {/* Sidebar Menu - Conditionally Rendered */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 text-white w-64 p-4 z-40">
          <h1 className="text-2xl font-bold mb-6">Menu</h1>
          <Link
            to="/"
            className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          >
            <Home className="mr-2" size={24} />
            Home
          </Link>
          <Link
            to="/recipes"
            className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          >
            <Book className="mr-2" size={24} />
            Recipes
          </Link>
          <Link
            to="/profile"
            className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          >
            <User className="mr-2" size={24} />
            Profile
          </Link>
          <Link
            to="/leaderboard"
            className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          >
            <Trophy className="mr-2" size={24} />
            Leaderboard
          </Link>
        </div>
      )}

      {/* The rest of your page content can go here */}
    </div>
  );
}

export default Navbar;
