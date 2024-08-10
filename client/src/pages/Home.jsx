import React from "react";
import TruckLoading from "../components/TruckLoader";

const Home = () => {
  return (
    <>
      <button class="bg-blue-600 text-white py-4 px-8 rounded-full shadow-lg flex items-center space-x-3">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11.049 2.927a1 1 0 00-1.098 0l-9 7a1 1 0 00-.13 1.426l6 8a1 1 0 001.514.083L12 12.414l4.665 5.021a1 1 0 001.486-.073l6-8a1 1 0 00-.113-1.426l-9-7z"
          />
        </svg>
        <span class="text-lg">Select Pickup Point</span>
      </button>
    </>
  );
};

export default Home;
