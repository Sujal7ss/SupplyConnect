import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard.jsx";

const dummyOrders = [
  {
    _id: 1,
    pickUpLocation: "123 Main St, Cityville",
    deliveryLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Van",
    orderAmount: 150.0,
    orderStatus: "waiting",
  },
  {
    _id: 2,
    pickUpLocation: "123 Main St, Cityville",
    deliveryLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Van",
    orderAmount: 150.0,
    orderStatus: "picked",
  },
  {
    _id: 3,
    pickUpLocation: "123 Main St, Cityville",
    deliveryLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Van",
    orderAmount: 150.0,
    orderStatus: "delivered",
  },
];


const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/api/orders`
  //       );
  //       setOrders(response.data);
  //       setFilteredOrders(response.data); // Initialize filtered orders
  //     } catch (error) {
  //       console.error(
  //         "Error getting orders:",
  //         error.response ? error.response.data : error.message
  //       );
  //       setError(error.message); // Store error message in state if needed
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  // for testing
  useEffect(() => {
    setOrders(dummyOrders);
  }, []);

  // Filter orders based on selected filter
  useEffect(() => {
    if (filter === "all") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.orderStatus === filter));
    }
  }, [filter, orders]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex flex-col overflow-y-auto space-y-4 p-4 h-screen">
      {/* <h1 className="text-2xl font-bold mb-6">Orders List</h1> */}

      {/* Filter Button */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 text-gray-700">
          Filter by status:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All</option>
          <option value="waiting">Waiting</option>
          <option value="picked">Picked</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {error && <p className="text-red-500">Error fetching orders: {error}</p>}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="space-y-4 flex flex-col">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}

    </div>
  );
};

export default OrderList;
