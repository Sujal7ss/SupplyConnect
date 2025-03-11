import React from 'react';

const Sidebar = ({ setSelectedSection }) => {
  return (
    <div className="h-screen w-64 bg-text-secondary text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-center bg-gray-900">
        <h1 className="text-xl text-text-primary uppercase font-bold">Supply-Connect</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4">
        <button
          onClick={() => setSelectedSection('dashboard')}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Dashboard
        </button>
        <button
          onClick={() => setSelectedSection('pendingOrders')}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Pending Orders
        </button>
        <button
          onClick={() => setSelectedSection('completedOrders')}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
        >
          Completed Orders
        </button>
        <button
          onClick={() => setSelectedSection('createOrder')}
          className="block w-full py-2 px-4 mt-4 bg-green-600 rounded hover:bg-green-700 transition duration-200"
        >
          Create Order
        </button>
      </nav>

      {/* Profile and Settings */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-medium">User Name</span>
        </div>
        <button
          onClick={() => alert('Settings')}
          className="block py-2 px-4 rounded hover:bg-gray-700 transition duration-200 mt-3"
        >
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
