const OrderCard = ({ order, onViewBids }) => {
  const statusColors = {
    created: "bg-yellow-200 text-yellow-800",
    assigned: "bg-blue-200 text-blue-800",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <div className="bg-secondary bg-opacity-20 backdrop-blur-md shadow-md rounded-xl p-4 border border-secondary hover:bg-opacity-40 transition duration-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-text-secondary font-semibold text-lg">
          Order #{order.id}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            statusColors[order.status] || "bg-gray-200 text-gray-800"
          }`}
        >
          {order.status.toUpperCase()}
        </span>
      </div>

      <p className="text-text-primary text-sm">
        📍 <span className="font-medium">From:</span> {order.pickup}
      </p>
      <p className="text-text-primary text-sm">
        📦 <span className="font-medium">To:</span> {order.destination}
      </p>
      <p className="text-text-primary text-sm">
        🚚 <span className="font-medium">Bids:</span> {order.bids.length}
      </p>

      {order.bids.length > 0 && (
        <button
          className="mt-4 bg-text-secondary hover:bg-opacity-90 text-white text-sm px-4 py-2 rounded-lg w-full transition"
          onClick={() => onViewBids(order.id)}
        >
          View Bids
        </button>
      )}
    </div>
  );
};

export default OrderCard;
