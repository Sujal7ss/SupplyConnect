import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import OrderCard from "../components/OrderCard.jsx";

const OrderDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Dummy data for order details
  const dummyOrder = {
    _id: "1",
    pickUpLocation: "Nagpur, Maharashtra",
    deliveryLocation: "Raipur, Chhattisgarh",
    vehicleType: "Truck",
    orderAmount: 250.0,
    orderStatus: "waiting",
  };
  
  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Simulate a successful API response
        setOrder(dummyOrder);
        // const orderResponse = await axios.get(`/api/orders/${id}`);
        // console.log(orderResponse);
        // setOrder(orderResponse.data.data);
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

        <div className="flex flex-col space-y-4 mt-4 align-middle items-center h-screen">
          {/* Map Div */}
          <div className="w-11/12 h-80 bg-gray-200 rounded-lg shadow-md">
            {/* Replace the following placeholder with an actual map component */}
            <div className="flex items-center justify-center h-full text-gray-600">
              <span>
                Map showing route between {order.pickUpLocation} and{" "}
                {order.deliveryLocation}
              </span>
              {/* Ideally, you would integrate a map component here */}
            </div>
          </div>

          {/* Basic Info Div */}
          <OrderCard order={dummyOrder}/>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
