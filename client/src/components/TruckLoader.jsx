import React from 'react';

const TruckLoading = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 60"
    width="120"
    height="60"
    className="relative"
  >
    <style>
      {`
        .truck-path {
          animation: moveTruck 1.5s linear infinite;
        }

        @keyframes moveTruck {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}
    </style>
    <rect x="5" y="20" width="40" height="20" fill="#3498db" className="truck-path" />
    <rect x="10" y="10" width="20" height="10" fill="#2980b9" className="truck-path" />
    <circle cx="15" cy="40" r="5" fill="#2c3e50" />
    <circle cx="35" cy="40" r="5" fill="#2c3e50" />
  </svg>
);

export default TruckLoading;
