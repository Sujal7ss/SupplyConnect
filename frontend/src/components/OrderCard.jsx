const OrderCard = ({ order, onViewBids }) => {
    return (
      <div className=" bg-secondary bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-4 border border-secondary  hover:bg-opacity-40">
        <h3 className="text-text-secondary font-semibold text-lg">Order #{order.id}</h3>
        <p className="text-text-primary">📍 From: <span className="font-medium">{order.pickup}</span></p>
        <p className="text-text-primary">📦 To: <span className="font-medium">{order.destination}</span></p>
        <p className="text-text-primary">🚚 Bids: <span className="font-medium">{order.bids.length}</span></p>
  
        <button 
          className="mt-3 bg-text-secondary text-white px-4 py-2 rounded-lg w-full "
          onClick={() => onViewBids(order.id)}
        >
          View Bids
        </button>
      </div>
    );
  };
  
  export default OrderCard;
  