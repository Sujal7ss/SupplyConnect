import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import OrdersList from "../OrdersList";

const OrdersDrawer = ({ drawerOpen, setDrawerOpen, setSelectedOrder }) => (
  <AnimatePresence>
    {drawerOpen && (
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 h-full w-[300px] bg-gray-100 p-4 shadow-lg z-40 flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-text-secondary font-bold text-lg">Your Orders</h2>
          <button
            className="text-text-primary hover:text-red-500"
            onClick={() => setDrawerOpen(false)}
          >
            <IoClose size={24} />
          </button>
        </div>
        <OrdersList setSelectedOrder={setSelectedOrder} />
      </motion.div>
    )}
  </AnimatePresence>
);

export default OrdersDrawer;
