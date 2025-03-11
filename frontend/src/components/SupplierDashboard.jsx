/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useMap } from "../hooks/MapProvider";
import SupplierNavbar from "./SupplierNavbar.jsx";
import Sidebar from "./Sidebar.jsx";
import SearchComponent from "./Search";
import MapDisplay from "./MapDisplay";
import RouteForm from "./RouteForm";
import CreateOrder from "../pages/CreateOrder.jsx";
function Dashboard() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  // const renderComponent = () => {
  //   switch (selectedSection) {
  //     case "dashboard":
  //       return <Dashboard />;
  //     case "pendingOrders":
  //       return <PendingOrders />;
  //     case "completedOrders":
  //       return <CompletedOrders />;
  //     default:
  //       return <Dashboard />;
  //   }
  // };
  return (
    <div>
      {/* <SupplierNavbar /> */}
      {/* <Sidebar setSelectedSection={setSelectedSection} /> */}
      <CreateOrder />
    </div>
  );
}

export default Dashboard;
