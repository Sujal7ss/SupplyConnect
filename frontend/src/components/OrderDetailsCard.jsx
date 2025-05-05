import { FaMapMarkerAlt, FaTruck, FaUserCheck } from "react-icons/fa";
import { MdAccessTime, MdRoute } from "react-icons/md";

const OrderDetailsCard = ({ order }) => {
  return (
    <div className="h-full w-full p-6 flex flex-col gap-6 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-secondary">📋 Order Details</h2>
        <p className="text-sm text-gray-500">Track and manage your order in real-time</p>
      </div>

      {/* Map Section */}
      <div className="w-full h-64 rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
        {/* Replace this with your actual map component */}
        <span>📍 Map Placeholder (Start ➡️ Current ➡️ End)</span>
      </div>

      {/* Driver Info */}
      <div className="grid grid-cols-2 gap-6 text-gray-700 text-lg">
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-blue-600" />
          <span><strong>Pickup:</strong> {order.pickup}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-green-600" />
          <span><strong>Destination:</strong> {order.destination}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaTruck className="text-orange-500" />
          <span><strong>Vehicle:</strong> {order.vehicleType}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaUserCheck className={order.isDriverActive ? "text-green-500" : "text-red-500"} />
          <span>
            <strong>Status:</strong>{" "}
            {order.isDriverActive ? "Driver Active" : "Driver Inactive"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <MdRoute className="text-purple-500" />
          <span><strong>Distance Left:</strong> {order.remainingDistance} km</span>
        </div>
        <div className="flex items-center gap-3">
          <MdAccessTime className="text-indigo-500" />
          <span><strong>ETA:</strong> {order.estimatedTime} mins</span>
        </div>
      </div>

      {/* Driver Avatar */}
      <div className="flex justify-center mt-4">
        <img
          src="/driver-avatar.png" // Use your actual image path or URL
          alt="Driver"
          className="w-24 h-24 rounded-full shadow-lg border-2 border-text-secondary"
        />
      </div>
    </div>
  );
};

export default OrderDetailsCard;
