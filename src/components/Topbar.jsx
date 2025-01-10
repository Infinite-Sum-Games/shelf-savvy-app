import React from 'react';
import Navbar from './Navbar';

function Topbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center bg-gray-900 text-white z-50">
      {/* Navbar and Hamburger Menu */}
      <div className="flex items-center">
        <Navbar />
      </div>
      <div className="flex-grow"></div>

      {/* Centered Application Title */}
      <h1 className="text-xl font-bold text-center">My Application</h1>

      {/* Spacer to balance the layout */}
      <div className="flex-grow"></div>
    </div>
  );
}

export default Topbar;
