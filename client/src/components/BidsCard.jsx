import React from "react";
import dayjs from "dayjs"; // For time manipulation

const BidsCard = ({ bid }) => {
  // Function to calculate the time difference in seconds/minutes
  const timeAgo = (createdAt) => {
    const now = dayjs();
    const createdAtTime = dayjs(createdAt);
    const diffInSeconds = now.diff(createdAtTime, "second");

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  return (
    
      <div className="flex justify-between items-start">
        {/* Left side */}
        <div className="flex items-start space-x-3 mr-10">
          <img
            src="https://via.placeholder.com/40"
            alt={bid.driverName}
            width="40"
            height="40"
            className="rounded-full"
          />
          <div>
            <span className="font-semibold">{bid.driverName}</span>
            <div className="text-gray-500 text-sm">
              {timeAgo(bid.creationTime)}
            </div>
          </div>
        </div>

        {/* Right side */}
        <span className="font-semibold text-lg">${bid.amount.toFixed(2)}</span>
      </div>
    
  );
};

export default BidsCard;
