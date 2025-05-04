// /* eslint-disable no-unused-vars */
// import React, {useState} from "react";
// import { useAuth } from "../hooks/AuthProvider.jsx";
// import { useMap } from "../hooks/MapProvider.jsx";
// import SupplierNavbar from "../components/SupplierNavbar.jsx";
// import Sidebar from "../components/Sidebar.jsx";
// import SearchComponent from "../components/Search.jsx";
// import MapDisplay from "../components/MapDisplay.jsx";
// import RouteForm from "../components/RouteForm.jsx";
// import CreateOrder from "./CreateOrder.jsx";
// function Dashboard() {
//   const [selectedSection, setSelectedSection] = useState("dashboard");

//   // const renderComponent = () => {
//   //   switch (selectedSection) {
//   //     case "dashboard":
//   //       return <Dashboard />;
//   //     case "pendingOrders":
//   //       return <PendingOrders />;
//   //     case "completedOrders":
//   //       return <CompletedOrders />;
//   //     default:
//   //       return <Dashboard />;
//   //   }
//   // };
//   return (
//     <div>
//       <SupplierNavbar />
//       {/* <Sidebar setSelectedSection={setSelectedSection} /> */}
//       {/* <CreateOrder /> */}
//     </div>
//   );
// }

// export default Dashboard;


import { useState } from "react";
import OrderCard from "../components/OrderCard";
import OrderDetailsCard from "../components/OrderDetailsCard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import OrdersList from "../components/OrdersList.jsx"; 


const SupplierDashboard = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Left Grid (Orders Sidebar - 20%) */}
      <div className="w-1/5 bg-gray-100 p-4 border-r flex flex-col rounded-r-lg shadow-md">
        <h2 className="text-text-secondary font-bold text-lg mb-3 text-center">Your Orders</h2>

        <OrdersList setSelectedOrder={setSelectedOrder} />
      </div>

      {/* Right Grid (Main Dashboard - 80%) */}
      <div className="w-4/5 p-6 relative">
        <h2 className="text-2xl font-bold text-text-primary">Dashboard Overview</h2>
        <p className="text-gray-600 mb-4">Click an order to see details.</p>

        {/* Order Details (Appearing Just Right of Order List - 20%) */}
        <AnimatePresence mode="wait">
          {selectedOrder && (
            <motion.div
              key={selectedOrder.id}
              className="w-1/5 bg-white p-4 border-r shadow-md absolute top-20 rounded-lg"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }} 
              transition={{ duration: 0.4 }}
            >
              <OrderDetailsCard order={selectedOrder} />
              <button
                className="absolute top-2 right-2 text-text-primary hover:text-red-500"
                onClick={() => setSelectedOrder(null)}
              >
                <IoClose size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>

      
  );
};

export default SupplierDashboard;



