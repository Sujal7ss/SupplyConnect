import React from "react";
import { useNavigate } from "react-router-dom";

export default function Bids({ order, bids }) {
  const navigate = useNavigate(); // Hook for navigation

  function setIsOpen() {
    navigate(-1); // Navigate back to the previous page
  }

  function handleMouseDown(event) {
    const startY = event.clientY;
    const handleMouseMove = (moveEvent) => {
      const distance = moveEvent.clientY - startY;
      if (distance > 100) { // Drag down distance threshold
        setIsOpen();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <div className="absolute w-full h-screen flex flex-col bg-white shadow-lg rounded-lg">

      <div className="flex flex-col h-full">
        {/* Order Info Section */}
        <div className="flex-none w-full h-1/5 bg-gray-100 p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold mb-2">Order Details</h2>
          <p><strong>Pick-Up Location:</strong> {order.pickUpLocation}</p>
          <p><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
          <p><strong>Weight:</strong> {order.weight} kg</p>
          <p><strong>Vehicle Type:</strong> {order.vehicleType}</p>
          <p><strong>Order Amount:</strong> ${order.orderAmount.toFixed(2)}</p>
        </div>

        {/* Bids Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-2">Bids</h2>
          <ul className="space-y-4">
            {bids
              .sort((a, b) => b.amount - a.amount)
              .map((bid) => (
                <li key={bid.id} className="p-4 border rounded-lg shadow-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Driver: {bid.driverName}</span>
                    <span className="font-semibold">Amount: ${bid.amount.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 mt-2">Comments: {bid.comments}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
