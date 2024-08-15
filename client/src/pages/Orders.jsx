import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard.jsx";
import { useAuth } from "../Context/AuthContext.jsx";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  // const { user } = useAuth(); // Get user info from Auth context
  const user = {
    type : 'driver'
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Determine API endpoint based on user type
        const endpoint = user.type === "driver" ? '/api/driver/getAllOrders' : '/api/myOrder';
        const response = await axios.get(endpoint);

        console.log(`response ${response}`)
        
        // Check if API response indicates success
        if (response.data.success === false) {
          console.error("Failed to fetch orders:", response.data.message);
          setError(response.data.message);
          return;
        }
  
        setOrders(response.data.data);
        setFilteredOrders(response.data.data);
      } catch (error) {
        console.error("Error getting orders:", error.response ? error.response.data : error.message);
        setError(error.response ? error.response.data.message : error.message);
      }
    };
  
    fetchOrders();
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
    <div className="flex flex-col overflow-y-auto space-y-4 p-4 w-full min-h-screen">
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
