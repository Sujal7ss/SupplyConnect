import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [order, setOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableOrder, setEditableOrder] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Dummy data
  useEffect(() => {
    setOrder({
      pickUpLocation: "New York",
      deliveryLocation: "Los Angeles",
      vehicleType: "Truck",
      orderAmount: 1000,
      orderStatus: "Pending",
    });

    setEditableOrder({
      pickUpLocation: "New York",
      deliveryLocation: "Los Angeles",
      vehicleType: "Truck",
      orderAmount: 1000,
      orderStatus: "Pending",
    });
  }, []);
  // Uncomment to fetch from backend
  // Fetch order details and bids
  useEffect(() => {
    const fetchOrderAndBids = async () => {
      try {
        const orderResponse = await axios.get(`/api/orders/${id}`);
        console.log(orderResponse)

        setOrder(orderResponse.data.data);
        setEditableOrder(orderResponse.data); // Initialize editableOrder with fetched data
      } catch (error) {
        console.error("Error fetching order details or bids:", error);
      }
    };

    fetchOrderAndBids();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`,
        editableOrder
      );
      console.log("Order updated successfully:", response.data);
      setOrder(editableOrder);
      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      console.error("Error updating order:", error);
      setIsEditing(false);
    }
  };

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
            onClick={() => navigate(`/bids/${id}`)} // Open modal
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            Bids
          </button>
          {/* Update Button */}
          <button
            onClick={() => setIsEditing(!isEditing)} // Toggle edit mode
            className="bg-yellow-500 text-white hover:bg-yellow-600 font-semibold py-2 px-4 rounded-md"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex flex-col space-y-4 mt-4">
          {/* Map Div */}
          <div className="w-full h-80 bg-gray-200 rounded-lg shadow-md">
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
          <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
            <div className="flex flex-row justify-between align-middle items-center p-3">
              <div className="flex-1">
                <label className="block text-gray-700">Pick-Up Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="pickUpLocation"
                    value={editableOrder.pickUpLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <div className="text-gray-800 p-2 bg-gray-200 rounded-md">
                    {order.pickUpLocation}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Delivery Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={editableOrder.deliveryLocation}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <div className="text-gray-800 p-2 bg-gray-200 rounded-md">
                    {order.deliveryLocation}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-between gap-3">
              <div className="flex-1">
                <label className="block text-gray-700">Vehicle Type</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="vehicleType"
                    value={editableOrder.vehicleType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <div className="p-2 bg-gray-200 rounded-md border border-gray-300 text-center">
                    <span className="text-gray-800 text-sm font-semibold">
                      {order.vehicleType}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-700">Order Amount</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="orderAmount"
                    value={editableOrder.orderAmount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <div className="p-2 bg-gray-200 rounded-md border border-gray-300 text-center">
                    <span className="text-gray-800 text-sm font-semibold">
                      ${order.orderAmount}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleUpdateOrder}
                  className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
