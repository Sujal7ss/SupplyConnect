import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderCard from "./OrderCard";
import { motion } from "framer-motion";

const OrdersList = ({ setSelectedOrder }) => {
  const [ordersByStatus, setOrdersByStatus] = useState({
    created: [],
    assigned: [],
    completed: [],
  });

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("created");

  const fetchOrders = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const dummyData = [
        {
          id: page * 10 + 1,
          pickup: `Location ${page * 10 + 1}`,
          destination: `Destination ${page * 10 + 1}`,
          bids: Array.from(
            { length: Math.floor(Math.random() * 5) },
            (_, i) => ({
              id: i + 1,
              price: (Math.random() * 1000).toFixed(2),
            })
          ),
          status: "created",
        },
        {
          id: page * 10 + 2,
          pickup: `Location ${page * 10 + 2}`,
          destination: `Destination ${page * 10 + 2}`,
          bids: Array.from(
            { length: Math.floor(Math.random() * 5) },
            (_, i) => ({
              id: i + 1,
              price: (Math.random() * 1000).toFixed(2),
            })
          ),
          status: "assigned",
        },
        {
          id: page * 10 + 3,
          pickup: `Location ${page * 10 + 3}`,
          destination: `Destination ${page * 10 + 3}`,
          bids: Array.from(
            { length: Math.floor(Math.random() * 5) },
            (_, i) => ({
              id: i + 1,
              price: (Math.random() * 1000).toFixed(2),
            })
          ),
          status: "completed",
        },
      ];

      // Group fetched orders by status
      const updated = { ...ordersByStatus };
      dummyData.forEach((order) => {
        if (!updated[order.status].some((o) => o.id === order.id)) {
          updated[order.status].push(order);
        }
      });

      setOrdersByStatus(updated);

      if (page >= 3) setHasMore(false);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = ordersByStatus[activeTab] || [];

  return (
    <div>
      {/* Tabs */}
      <div className="w-[250px] mb-4 border-b-2 border-gray-300">
        <div className="flex justify-between items-center">
          {["created", "assigned", "completed"].map((status) => (
            <button
              key={status}
              className={`py-2 px-3 text-xs font-semibold ${
                activeTab === status
                  ? "border-b-2 border-text-primary text-text-primary"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(status)}
            >
              {status === "created" && "🆕 Created Orders"}
              {status === "assigned" && "🚚 Driver Assigned"}
              {status === "completed" && "✅ Completed"}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable List */}
      <InfiniteScroll
        dataLength={filteredOrders.length}
        next={fetchOrders}
        hasMore={hasMore}
        loader={<p className="text-center text-gray-500">Loading more...</p>}
        endMessage={
          <p className="text-center text-gray-500">No more orders.</p>
        }
        scrollThreshold={0.95}
      >
        <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2 scrollbar-hide">
          {filteredOrders.length === 0 ? (
            <p className="text-xs text-gray-400 ml-2">No orders available.</p>
          ) : (
            filteredOrders.map((order) => (
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
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default OrdersList;
