import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard.jsx";
import { useAuth } from "../Context/AuthContext.jsx";

const staticOrders = [
  {
    _id: "1",
    pickUpLocation: "Nagpur, Maharashtra",
    deliveryLocation: "Raipur, Chhattisgarh",
    vehicleType: "Truck",
    orderAmount: 4890.0,
    orderStatus: "waiting",
  },
  {
    _id: "2",
    pickUpLocation: "Mumbai, Maharashtra",
    deliveryLocation: "Delhi, Delhi",
    vehicleType: "Mini Truck",
    orderAmount: 5000.0,
    orderStatus: "picked",
  },
  {
    _id: "3",
    pickUpLocation: "Pune, Maharashtra",
    deliveryLocation: "Bengaluru, Karnataka",
    vehicleType: "Big Truck",
    orderAmount: 6500.0,
    orderStatus: "waiting",
  },
  {
    _id: "4",
    pickUpLocation: "Chennai, Tamil Nadu",
    deliveryLocation: "Hyderabad, Telangana",
    vehicleType: "Truck",
    orderAmount: 3500.0,
    orderStatus: "delivered",
  },
  {
    _id: "5",
    pickUpLocation: "Kolkata, West Bengal",
    deliveryLocation: "Jaipur, Rajasthan",
    vehicleType: "Mini Truck",
    orderAmount: 3800.0,
    orderStatus: "picked",
  },
  {
    _id: "6",
    pickUpLocation: "Nagpur, Maharashtra",
    deliveryLocation: "Raipur, Chhattisgarh",
    vehicleType: "Truck",
    orderAmount: 4890.0,
    orderStatus: "waiting",
  },
  {
    _id: "7",
    pickUpLocation: "Mumbai, Maharashtra",
    deliveryLocation: "Delhi, Delhi",
    vehicleType: "Mini Truck",
    orderAmount: 5000.0,
    orderStatus: "picked",
  },
  {
    _id: "8",
    pickUpLocation: "Pune, Maharashtra",
    deliveryLocation: "Bengaluru, Karnataka",
    vehicleType: "Big Truck",
    orderAmount: 6500.0,
    orderStatus: "waiting",
  },
  {
    _id: "9",
    pickUpLocation: "Chennai, Tamil Nadu",
    deliveryLocation: "Hyderabad, Telangana",
    vehicleType: "Truck",
    orderAmount: 3500.0,
    orderStatus: "delivered",
  },
  {
    _id: "10",
    pickUpLocation: "Kolkata, West Bengal",
    deliveryLocation: "Jaipur, Rajasthan",
    vehicleType: "Mini Truck",
    orderAmount: 3800.0,
    orderStatus: "picked",
  },
];

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("waiting");
  const [active, setActive] = useState("waiting");
  // const { user } = useAuth(); // Get user info from Auth context
  const user = {
    type: "driver",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setOrders(staticOrders);
        setFilteredOrders(staticOrders);
        // Determine API endpoint based on user type
        // const endpoint =
        //   user.type === "driver" ? "/api/driver/getAllOrders" : "/api/myOrder";
        // const response = await axios.get(endpoint);

        // console.log(`response ${response}`);

        // Check if API response indicates success
        // if (response.data.success === false) {
        //   console.error("Failed to fetch orders:", response.data.message);
        //   setError(response.data.message);
        //   return;
        // }

        // setOrders(response.data.data);
        // setFilteredOrders(response.data.data);
      } catch (error) {
        console.error(
          "Error getting orders:",
          error.response ? error.response.data : error.message
        );
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on selected filter
  useEffect(() => {
    setFilteredOrders(orders.filter((order) => order.orderStatus === filter));
  }, [filter, orders]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleActive = (status) => {
    setActive(status);
    setFilter(status); // Update the filter when an option is selected
  };
  return (
    <div className="flex flex-col overflow-y-auto space-y-4 p-4 w-full min-h-screen">
      <div className="bg-white w-full h-20 rounded-badge min-w-m flex p-3 shadow-md">
        <div
          onClick={() => handleActive("waiting")}
          className={`w-full flex items-center rounded-badge justify-center cursor-pointer shadow-md ${
            active === "waiting" ? "bg-yellow-300" : "bg-white"
          }`}
        >
          Waiting
        </div>
        <div
          onClick={() => handleActive("picked")}
          className={`w-full flex items-center rounded-badge justify-center cursor-pointer shadow-md ${
            active === "picked" ? "bg-yellow-300" : "bg-white"
          }`}
        >
          Picked
        </div>
      </div>
      {error && <p className="text-red-500">Error fetching orders: {error}</p>}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders available.</p>
      ) : (
        <div className="space-y-4 flex flex-col align-middle items-center">
          {filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
