// OrdersPage.js
import React, { useState, useEffect } from "react";
import OrderCard from "../components/OrderCard";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const dummy = {
    startLocation: "123 Main St, Cityville",
    endLocation: "456 Elm St, Townsville",
    weight: 120,
    vehicleType: "Truck",  // Adjusted attribute
    price: 150.0           // Adjusted attribute
};
  // Mock fetch function to simulate API call
  const fetchOrders = async () => {
    // Replace with actual API call
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex-grow flex flex-row items-center justify-center">
     <OrderCard key={1} order={dummy} />
    {/* //     <h1 className="text-2xl font-bold mb-6">Orders List</h1>
    //     {orders.length === 0 ? (
    //         <p className="text-gray-500">No orders available.</p>
    //     ) : (
    //         <div className="space-y-4">
    //             {orders.map(order => (
    //                 <OrderCard key={order.id} order={order} />
    //             ))}
    //         </div>
    //     )} */}
    </div>
    
  );
};

export default OrdersPage;
