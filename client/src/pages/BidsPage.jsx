import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs"; // For time manipulation
import Modal from "react-modal";
import { TbLivePhoto } from "react-icons/tb";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import Avatar, { genConfig } from "react-nice-avatar";
import { PiCursorClick } from "react-icons/pi";
import { ToastContainer, toast } from 'react-toastify';
Modal.setAppElement("#root"); // For accessibility reasons

const BidsPage = () => {
  const navigate = useNavigate();
  const { order_id } = useParams(); // Access route parameter
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDriver, setIsDriver] = useState(true); // Simulate user role
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [amountToConfirm, setAmountToConfirm] = useState("");
  const [driverSelection, setDriverSelection] = useState(false)

  // Dummy bids
  const dummyBids = [
    {
      bidder: {
        DriverId: "64d42812f8d9b915c9dc7ef9",
        Name: "John Doe",
      },
      amount: 1500.0,
      timestamp: dayjs().subtract(5, "minutes").toISOString(), // 5 minutes ago
      config: genConfig({
        sex: "man",
        hairStyle: "mohawk",
      }),
    },
    {
      bidder: {
        DriverId: "64d42812f8d9b915c9dc7ef8",
        Name: "Jane Smith",
      },
      amount: 1750,
      timestamp: dayjs().subtract(2, "hours").toISOString(), // 2 hours ago
      config: genConfig({
        sex: "woman",
        hairStyle: "straight",
      }),
    },
    {
      bidder: {
        DriverId: "64d42812f8d9b915c9dc7ef7",
        Name: "Bob Johnson",
      },
      amount: 1600.0,
      timestamp: dayjs().subtract(30, "minutes").toISOString(), // 30 minutes ago
      config: genConfig({
        sex: "man",
        hairStyle: "buzzcut",
      }),
    },
    {
      bidder: {
        DriverId: "64d42812f8d9b915c9dc7ef7",
        Name: "Bob Johnson",
      },
      amount: 1600.0,
      timestamp: dayjs().subtract(30, "minutes").toISOString(), // 30 minutes ago
      config: genConfig({
        sex: "man",
        hairStyle: "buzzcut",
      }),
    },
  ];

  useEffect(() => {
    const fetchBids = async () => {
      try {
        // const response = await axios.post("/api/Order/getBids", { order_id });
        // const bidData = response.data;
        // Uncomment the lines above when connecting to the actual API
        setBids(
          dummyBids.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
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
    if (parseFloat(bidAmount) <= 0 || isNaN(bidAmount)) {
      alert("Please enter a valid bid amount.");
      return;
    }

    setIsConfirmModalOpen(true);
    setIsModalOpen(false);
  };

  const handleFinalPlaceBid = async () => {
    try {
      await axios.post(`/api/Order/addBid/${order_id}`, {
        DriverId: "64d42812f8d9b915c9dc7ef9",
        Name: "Alice Smith",
        amount: bidAmount,
      });
      setAmountToConfirm(bidAmount);
      alert(`Bid placed with amount: Rs ${amountToConfirm}`);
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place the bid. Please try again.");
    }
    setIsConfirmModalOpen(false);
  };

  const handleConfirm = () => {
    setDriverSelection(false)

    toast.info("Driver Selected");
    setTimeout(() => {
      navigate("/")
    }, 2000)
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-4 space-y-4 w-full">
      <div className="bg-white w-full h-20 rounded-badge min-w-m flex p-3 shadow-md justify-between">
        <div className="w-full flex  items-center rounded-badge justify-center cursor-pointer shadow-lg bg-yellow-300 animate-glow">
          Lowest Bid: <span className="font-semibold ml-2">Rs 1500</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          <span className="flex items-center text-red-600">
            <TbLivePhoto />
            Live Bids
          </span>
        </h2>
      </div>

      <ul className="space-y-4 min-w-screen-2xl">
        {bids.map((bid, index) => (
          <li key={index} className="bg-white p-2 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3 mr-10">
                <Link to="/driver/details">
                  <Avatar
                    style={{ width: "50px", height: "50px" }}
                    {...bid.config}
                  />
                </Link>
                <div>
                  <span className="text-lg font-semibold">
                    {bid.bidder.Name}
                  </span>
                  <div className="text-gray-500 text-sm">
                    {dayjs(bid.timestamp).fromNow()} {/* Display time ago */}
                  </div>
                </div>
              </div>
              <div className="flex self-center">
                <span className="font-semibold text-lg">Rs {bid.amount}</span>
              </div>
              {isDriver && (
                <button onClick={() => setDriverSelection(true)} className="btn bg-yellow-300">
                  <PiCursorClick size={20} />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {isDriver && (
        <div className="fixed w-full left-0 bottom-10 flex justify-end">
          <button
            onClick={handlePlaceBidClick}
            className="w-full font-semibold text-black bg-yellow-300 m-4 py-4 px-4 rounded-2xl"
          >
            Place a Bid
          </button>
        </div>
      )}

      {/* Modal for Driver Selection */}
      <Modal
        isOpen={driverSelection}
        onRequestClose={() => setDriverSelection(false)}
        contentLabel="Do you want to Select this Driver"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2 className="text-lg font-bold mb-4">Do you want to Select this Driver ?</h2>
        
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md "
        >
          Confirm Driver
        </button>
      </Modal>

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
        <p>Are you sure you want to place a bid of Rs {bidAmount}?</p>
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
