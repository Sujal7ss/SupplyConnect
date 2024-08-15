import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMapp } from "../Context/MapContext";

const OrderDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate(); // Hook for navigation
  const {
    mapContainer,
  } = useMapp();
  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderResponse = await axios.get(`/api/orders/${id}`);
        console.log(orderResponse);
        setOrder(orderResponse.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <>
      <div className="p-4 space-y-4 w-full">
        {/* Buttons Container */}
        <div className="flex justify-between items-center mb-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          {/* Bids Button */}
          <button
            onClick={() => navigate(`/bids/${id}`)} // Navigate to Bids page
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            Bids
          </button>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          <div className="w-full h-80 rounded-lg" ref={mapContainer} >
          </div>

          {/* Basic Info Div */}
          <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
            <div className="flex flex-col space-y-4">
              {/* Pick-Up and Delivery Location */}
              <div className="flex flex-row space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">
                    Pick-Up Location
                  </label>
                  <div className="text-gray-800 p-2 bg-gray-200 rounded-md">
                    {order.pickUpLocation}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">
                    Delivery Location
                  </label>
                  <div className="text-gray-800 p-2 bg-gray-200 rounded-md">
                    {order.deliveryLocation}
                  </div>
                </div>
              </div>

              {/* Vehicle Type and Order Amount */}
              <div className="flex flex-row space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700">Vehicle Type</label>
                  <div className="p-2 bg-gray-200 rounded-md border border-gray-300 text-center">
                    <span className="text-gray-800 text-sm font-semibold">
                      {order.vehicleType}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700">Order Amount</label>
                  <div className="p-2 bg-gray-200 rounded-md border border-gray-300 text-center">
                    <span className="text-gray-800 text-sm font-semibold">
                      ${order.orderAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
