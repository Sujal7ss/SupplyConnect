import { useState } from "react";
import DrawerToggleButton from "../components/SupplierDashboard/DrawerToggleButton";
import OrdersDrawer from "../components/SupplierDashboard/OrdersDrawer";
import DashboardOverview from "../components/SupplierDashboard/DashboardOverview";
import OrderDetails from "../components/SupplierDashboard/OrderDetails";
import { motion, AnimatePresence } from "framer-motion";

const SupplierDashboard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Drawer Toggle Button */}
      <DrawerToggleButton drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      {/* Orders Drawer */}
      <OrdersDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        setSelectedOrder={setSelectedOrder}
      />

      {/* Right Side (Dashboard / Order Details) */}
      <motion.div
        className={`transition-all duration-500 ease-in-out overflow-y-auto ${
          drawerOpen ? "w-4/5 ml-auto" : "w-full"
        } p-6`}
      >
        <AnimatePresence mode="wait">
          {!selectedOrder ? (
            <DashboardOverview />
          ) : (
            <OrderDetails selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SupplierDashboard;
