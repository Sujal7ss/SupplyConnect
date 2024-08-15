import React from "react";
import { Link } from "react-router-dom";
import { useMapp } from "../Context/MapContext";

const Home = () => {
  const { mapContainer } = useMapp();

  return (
    <>
      <div className="relative w-full h-screen" ref={mapContainer}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            to="/book-order"
            className="bg-blue-600 text-white py-4 px-8 rounded-full shadow-lg flex items-center space-x-3 z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927a1 1 0 00-1.098 0l-9 7a1 1 0 00-.13 1.426l6 8a1 1 0 001.514.083L12 12.414l4.665 5.021a1 1 0 001.486-.073l6-8a1 1 0 00-.113-1.426l-9-7z"
              />
            </svg>
            <span className="text-lg">Select Pickup Point</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
