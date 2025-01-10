import React from 'react';
import Navbar from './Navbar';

function Topbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center bg-gray-900 text-white z-50">
      <div className="flex items-center">
        <Navbar />
      </div>
      <h1 className="text-xl font-bold text-center">Shelf Savvy</h1>
    </div>
  );
}

export default Topbar;
