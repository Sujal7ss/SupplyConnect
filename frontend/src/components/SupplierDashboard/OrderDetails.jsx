import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import OrderDetailsCard from "../OrderDetailsCard.jsx";

const OrderDetails = ({ selectedOrder, setSelectedOrder }) => (
  <motion.div
    key="order-details"
    className="bg-gray-700 p-6 shadow-lg rounded-lg relative h-full"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.4 }}
  >
    <OrderDetailsCard order={selectedOrder} />
    <button
      className="absolute top-4 right-4 text-text-primary hover:text-red-500"
      onClick={() => setSelectedOrder(null)}
    >
      <IoClose size={24} />
    </button>
  </motion.div>
);

export default OrderDetails;
