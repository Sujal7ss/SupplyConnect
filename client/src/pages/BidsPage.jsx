import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs"; // For time manipulation
import Modal from "react-modal";

Modal.setAppElement('#root'); // For accessibility reasons

const BidsPage = () => {
  const { order_id } = useParams(); // Access route parameter
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDriver, setIsDriver] = useState(true); // Simulate user role
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [amountToConfirm, setAmountToConfirm] = useState('');

  // Dummy bids
  const dummyBids = [
    {
      id: 1,
      driverName: "John Doe",
      amount: 150.0,
      comments: "Available for pickup immediately.",
      creationTime: dayjs().subtract(5, 'minutes').toISOString()
    },
    {
      id: 2,
      driverName: "Jane Smith",
      amount: 175.5,
      comments: "Can deliver by tomorrow.",
      creationTime: dayjs().subtract(2, 'hours').toISOString()
    },
    {
      id: 3,
      driverName: "Bob Johnson",
      amount: 160.0,
      comments: "Flexible with pickup time.",
      creationTime: dayjs().subtract(30, 'minutes').toISOString()
    },
    {
      id: 4,
      driverName: "Alice Davis",
      amount: 180.0,
      comments: "Has a large truck available.",
      creationTime: dayjs().subtract(1, 'day').toISOString()
    },
  ];

  useEffect(() => {
    const fetchBids = async () => {
      try {
        // const bids = await axios.get({})
        // Replace with actual API call if needed
        setBids(dummyBids.sort((a, b) => new Date(b.creationTime) - new Date(a.creationTime)));
      } catch (error) {
        setError("Failed to fetch bids.");
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  // Function to calculate the time difference in seconds/minutes
  const timeAgo = (createdAt) => {
    const now = dayjs();
    const createdAtTime = dayjs(createdAt);
    const diffInSeconds = now.diff(createdAtTime, "second");

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  const handlePlaceBidClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmBidClick = () => {
    if (parseFloat(bidAmount) <= 0 || isNaN(bidAmount)) {
      alert('Please enter a valid bid amount.');
      return;
    }
    setAmountToConfirm(bidAmount);
    setIsConfirmModalOpen(true);
    setIsModalOpen(false);
  };

  const handleFinalPlaceBid = async () => {
    try {
      // Example API call to place the bid
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${order_id}/bids`, {
        amount: amountToConfirm,
      });
      alert(`Bid placed with amount: $${amountToConfirm}`);
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place the bid. Please try again.');
    }
    setIsConfirmModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 space-y-4 w-full">
      <h2 className="text-xl font-bold mb-2">Bids</h2>
      <ul className="space-y-4">
        {bids.map((bid) => (
          <li key={bid.id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              {/* Left side */}
              <div className="flex items-start space-x-3 mr-10">
                <img
                  src="https://via.placeholder.com/40"
                  alt={bid.driverName}
                  width="40"
                  height="40"
                  className="rounded-full"
                />
                <div>
                  <span className="font-semibold">{bid.driverName}</span>
                  <div className="text-gray-500 text-sm">
                    {timeAgo(bid.creationTime)}
                  </div>
                </div>
              </div>

              {/* Right side */}
              <span className="font-semibold text-lg">${bid.amount.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>

      {isDriver && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handlePlaceBidClick}
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            Place a Bid
          </button>
        </div>
      )}

      {/* Modal for bid amount input */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Place a Bid"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-lg font-bold mb-4">Enter Bid Amount</h2>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
          onBlur={() => {
            if (parseFloat(bidAmount) <= 0 || isNaN(bidAmount)) {
              setBidAmount('');
            }
          }}
        />
        <button
          onClick={handleConfirmBidClick}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Confirm Bid
        </button>
      </Modal>

      {/* Modal for confirmation */}
      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        contentLabel="Confirm Bid"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Bid</h2>
        <p>Are you sure you want to place a bid of ${amountToConfirm}?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={handleFinalPlaceBid}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsConfirmModalOpen(false)}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BidsPage;
