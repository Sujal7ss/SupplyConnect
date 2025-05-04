const OrderDetailsCard = ({ order }) => {
    return (
      <div className="z-10 bg-white shadow-md rounded-lg p-4 border border-gray-300 mt-2">
        <h3 className="text-lg font-bold">Order Details</h3>
        <p className="text-gray-600">📍 From: <span className="font-medium">{order.pickup}</span></p>
        <p className="text-gray-600">📦 To: <span className="font-medium">{order.destination}</span></p>
        <p className="text-gray-600">🚚 Vehicle Type: <span className="font-medium">{order.vehicleType}</span></p>
        <p className="text-gray-600">📊 Status: <span className="font-medium">{order.status}</span></p>
      </div>
    );
  };
  
  export default OrderDetailsCard;
  