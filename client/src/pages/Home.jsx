import React from "react";
import TruckLoading from "../components/TruckLoader";
const Home = () => {
  return (
    <>
      <div class="flex flex-col h-screen w-full max-w-md">
        <header class="bg-white shadow-md px-4 py-2 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Logo"
              class="w-10 h-10 rounded-full"
            />
            <span class="text-xl font-semibold text-gray-800">SupplyConnect</span>
          </div>
          <button class="bg-gray-200 rounded-full p-2 flex items-center justify-center">
            <svg
              class="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.403-1.403A8.004 8.004 0 0016 7a8.004 8.004 0 00-6.597 8.597L8 17h5m-5 0H4m11-6V6m0 0V4a2 2 0 00-2-2m0 2v4a2 2 0 002 2m0 0v2"
              />
            </svg>
          </button>
        </header>

        <main class="flex-grow flex items-center justify-center">
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
        </main>

        <footer class="bg-white shadow-md py-2 flex justify-around items-center">
          <button class="flex flex-col items-center text-gray-600">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span class="text-sm">Menu</span>
          </button>
          <button class="flex flex-col items-center text-gray-600">
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
                d="M12 6v6l4 2M6 18h12"
              />
            </svg>
            <span class="text-sm">Rides</span>
          </button>
          <button class="flex flex-col items-center text-gray-600">
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
                d="M9 12h6M9 16h6M9 8h6"
              />
            </svg>
            <span class="text-sm">Profile</span>
          </button>
        </footer>
      </div>
    </>
  );
};

export default Home;
