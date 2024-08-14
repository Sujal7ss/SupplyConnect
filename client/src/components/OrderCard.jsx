import React from "react";
import { Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import { PiTruck } from "react-icons/pi";
{/* <PiTruck /> */}
import { LiaTruckMovingSolid } from "react-icons/lia";
{/* <LiaTruckMovingSolid /> */}

const statusColors = {
  waiting: "bg-red-200", // Slightly darker red
  picked: "bg-yellow-200", // Slightly darker yellow
  delivered: "bg-green-200", // Slightly darker green
};

const statusTexts = {
  waiting: "Waiting",
  picked: "Picked",
  delivered: "Delivered",
};

const truck = <CiDeliveryTruck size={40} />
const OrderCard = ({ order }) => {
  const {
    _id,
    pickUpLocation,
    deliveryLocation,
    vehicleType,
    orderAmount,
    orderStatus,
  } = order;
  const statusColor = statusColors[orderStatus] || "bg-gray-500"; // Default to gray if status is unknown
  const statusText = statusTexts[orderStatus] || "Unknown Status";


  
  return (
    <Link
      to={`/order-details/${_id}`}
      className={`relative ${statusColor}  shadow-lg rounded-lg p-4 mb-4 border border-gray-200 w-full`}
    >
      <div className="absolute top-2 right-2">
        <div
          className={`w-5 h-5 rounded-full ${statusColor} flex items-center justify-center border-2 border-white`}
          title={statusText} // Show status on hover
        >
          <span className="text-white text-xs font-semibold">
            {statusText.charAt(0)}
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-evenly mb-4">
          <span className="text-gray-900 font-medium text-lg">
            {pickUpLocation}
          </span>
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
          <span className="text-gray-900 font-medium text-lg">
            {deliveryLocation}
          </span>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div className="flex-1  bg-gray-200 rounded-md border border-gray-300 flex items-center justify-center">
            {truck}
          </div> 
          <div className="flex-1 p-2 bg-gray-200 rounded-md border border-gray-300 flex items-center justify-center">
            <span className="text-gray-800 text-sm font-semibold">
              ${orderAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
