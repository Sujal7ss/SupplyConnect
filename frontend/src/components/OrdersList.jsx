import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderCard from "./OrderCard";
import { motion } from "framer-motion";

const OrdersList = ({ setSelectedOrder }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/myOrder?page=${page}`, {
        user: localStorage.getItem("token"),
      });
      console.log('res', res)
      if (res.status === 200) {
        setOrders((prev) => [...prev, ...res.data.data]);
        setPage((prev) => prev + 1);
        if (res.data.data.length === 0) setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <InfiniteScroll
      dataLength={orders.length}
      next={fetchOrders}
      hasMore={hasMore}
      loader={<p className="text-center text-gray-500">Loading more...</p>}
      endMessage={<p className="text-center text-gray-500">No more orders.</p>}
    >
      <div className="max-h-[80vh] pr-2 space-y-3 overflow-y-auto scrollbar-hide">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            className="cursor-pointer rounded-lg border border-secondary bg-opacity-30 backdrop-blur-md"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setSelectedOrder(null);
              setTimeout(() => setSelectedOrder(order), 150);
            }}
          >
            <OrderCard order={order} />
          </motion.div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default OrdersList;
