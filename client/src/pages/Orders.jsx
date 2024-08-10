import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard.jsx";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const dummy = {
    _id:1,
    pickUpLocation: "123 Main St, Cityville",
    deliveryLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Van",
    orderAmount: 150.0,
    orderStatus: 'waiting'
  };
  const dummy1 = {
    _id:2,
    pickUpLocation: "123 Main St, Cityville",
    deliveryLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Van",
    orderAmount: 150.0,
    orderStatus: 'picked'
  };
  const dummy2 = {
    _id:3,
    pickUpLocation: "123 Main St, Cityville",
    deliveryLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Van",
    orderAmount: 150.0,
    orderStatus: 'delivered'
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/orders`
        );
        setOrders(response.data);
      } catch (error) {
        console.error(
          "Error getting orders:",
          error.response ? error.response.data : error.message
        );
        setError(error.message); // Store error message in state if needed
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto space-y-4 p-4 h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders List</h1>
      {error && <p className="text-red-500">Error fetching orders: {error}</p>}
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="space-y-4 flex flex-col">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
      <OrderCard key={1} order={dummy} />
      <OrderCard key={1} order={dummy1} />
      <OrderCard key={1} order={dummy2} />
    </div>
  );
};

export default OrderList;
