import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs"; // For time manipulation
import Modal from "react-modal";
import BidsCard from "../components/BidsCard";

Modal.setAppElement("#root"); // For accessibility reasons

const BidsPage = () => {
  const { order_id } = useParams(); // Access route parameter
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDriver, setIsDriver] = useState(true); // Simulate user role
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [amountToConfirm, setAmountToConfirm] = useState("");
  const [isSupplier, setIsSupplier] = useState(false);

  // Dummy bids
  const dummyBids = [
    {
      id: 1,
      driverName: "John Doe",
      amount: 150.0,
      comments: "Available for pickup immediately.",
      creationTime: dayjs().subtract(5, "minutes").toISOString(),
    },
    {
      id: 2,
      driverName: "Jane Smith",
      amount: 175.5,
      comments: "Can deliver by tomorrow.",
      creationTime: dayjs().subtract(2, "hours").toISOString(),
    },
    {
      id: 3,
      driverName: "Bob Johnson",
      amount: 160.0,
      comments: "Flexible with pickup time.",
      creationTime: dayjs().subtract(30, "minutes").toISOString(),
    },
    {
      id: 4,
      driverName: "Alice Davis",
      amount: 180.0,
      comments: "Has a large truck available.",
      creationTime: dayjs().subtract(1, "day").toISOString(),
    },
  ];

  useEffect(() => {
    const fetchBids = async () => {
      try {
        // Replace with actual API call if needed
        // const response = await axios.get(`/api/orders/${order_id}/bids`);
        // setBids(response.data);
        setBids(
          dummyBids.sort(
            (a, b) => new Date(b.creationTime) - new Date(a.creationTime)
          )
        );
      } catch (error) {
        setError("Failed to fetch bids.");
        console.error("Error fetching bids:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [order_id]);

  const handlePlaceBidClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmBidClick = () => {
    const amount = parseFloat(bidAmount);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }
    setAmountToConfirm(amount);
    setIsConfirmModalOpen(true);
    setIsModalOpen(false);
  };

  const handleFinalPlaceBid = async () => {
    try {
      await axios.post(`/api/orders/${order_id}/bids`, {
        amount: amountToConfirm,
      });
      alert(`Bid placed with amount: $${amountToConfirm}`);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place the bid. Please try again.");
    }
    setIsConfirmModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 space-y-4 w-full ">
      <h2 className="text-xl font-bold mb-2">Bids</h2>
      <ul className="space-y-4">
        {bids.map((bid) =>
          isSupplier ? (
            <li key={bid.id} className="p-4 border rounded-lg shadow-sm  bg-white text-black hover:bg-gray-100">
              <BidsCard bid={bid} />
            </li>
          ) : (
            <button
              key={bid.id}
              className="p-4 border rounded-lg shadow-sm bg-white text-black hover:bg-gray-100 w-full"
              onClick={() => handleBidClick(bid)} // Optional: Add a click handler if needed
            >
              <BidsCard bid={bid} />
            </button>
          )
        )}
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
              setBidAmount("");
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
