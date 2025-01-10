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
        className="text-white flex items-center justify-center p-2 py-3 bg-transparent"
        onClick={toggle}
      >
        <MenuIcon size={32} />
      </button>
      <div
        className={`absolute top-19 left-0 bg-gray-900 text-white w-48 p-4 z-10 h-screen shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">Menu</h1>
        <Link
          to="/"
          className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          onClick={toggle} // Close the menu on click
        >
          <Home className="mr-2" size={24} />
          Home
        </Link>
        <Link
          to="/recipes"
          className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          onClick={toggle} // Close the menu on click
        >
          <Book className="mr-2" size={24} />
          Recipes
        </Link>
        <Link
          to="/profile"
          className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          onClick={toggle} // Close the menu on click
        >
          <User className="mr-2" size={24} />
          Profile
        </Link>
        <Link
          to="/leaderboard"
          className="mb-4 hover:bg-gray-700 p-2 w-full text-left rounded flex items-center"
          onClick={toggle} // Close the menu on click
        >
          <Trophy className="mr-2" size={24} />
          Leaderboard
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
