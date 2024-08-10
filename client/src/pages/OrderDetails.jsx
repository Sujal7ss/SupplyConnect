import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import a map library component if you're using one, e.g., Google Maps, Leaflet, etc.
// For demonstration, I'll use a placeholder for the map.

const OrderDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [order, setOrder] = useState(null);

  // useEffect(() => {
  //     const fetchOrder = async () => {
  //         try {
  //             const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`);
  //             setOrder(response.data);
  //         } catch (error) {
  //             console.error('Error fetching order details:', error);
  //         }
  //     };

  //     fetchOrder();
  // }, [id]);

  //dummy
  useEffect(() => {
    setOrder({
      pickUpLocation: "New York",
      deliveryLocation: "Los Angeles",
      weight: 100,
      vehicleType: "Truck",
      orderAmount: 1000,
      orderStatus: "Pending",
    });
  });

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col space-y-4">
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
            <div className="text-gray-800 mb-2 p-2  bg-gray-200 rounded-md items-center">
              {order.pickUpLocation}
            </div>
            <div className="text-gray-800 mb-2 p-2 bg-gray-200 rounded-md">
              {order.deliveryLocation}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-3">
            <div className="flex-1 p-2 bg-gray-200 rounded-md border border-gray-300 text-center">
              <span className="text-gray-800 text-sm font-semibold">
                {order.weight} kg
              </span>
            </div>
            <div className="flex-1 p-2 bg-gray-200 rounded-md border border-gray-300 text-center">
              <span className="text-gray-800 text-sm font-semibold">
                {order.vehicleType}
              </span>
            </div>
            <div className="flex-1 p-2 bg-gray-200 rounded-md border border-gray-300 text-center">
              <span className="text-gray-800 text-sm font-semibold">
                ${order.orderAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
                    <h1 className="text-xl font-bold mb-4">Order Details</h1>
                    <p className="text-gray-800 mb-2">Pick-Up Location: {order.pickUpLocation}</p>
                    <p className="text-gray-800 mb-2">Delivery Location: {order.deliveryLocation}</p>
                    <p className="text-gray-800 mb-2">Weight: {order.weight} kg</p>
                    <p className="text-gray-800 mb-2">Vehicle Type: {order.vehicleType}</p>
                    <p className="text-gray-800 mb-2">Order Amount: ${order.orderAmount.toFixed(2)}</p>
                    <p className="text-gray-800">Status: {order.orderStatus}</p>
                </div> */}
      </div>
    </div>
  );
};

export default OrderDetails;
