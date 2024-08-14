import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "supplier") {
      navigate("/signup/supplier");
    } else if (role === "driver") {
      navigate("/signup/driver");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-xl mx-auto min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Sign Up</h1>
      <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">Welcome to our SupplyConnect! Please select your role.</h2>
      <div className="space-y-4 w-full">
        <button
          onClick={() => handleRoleSelect("supplier")}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Sign Up as Supplier
        </button>
        <button
          onClick={() => handleRoleSelect("driver")}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150"
        >
          Sign Up as Driver
        </button>
      </div>
    </div>
  );
}
