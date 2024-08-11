import { ApiResponse } from "../lib/utils/ApiResponse";
import { asyncHandler } from "../lib/utils/asyncHandler";
import { ApiError } from "../lib/utils/error";
import Bid from "../models/bid";
import Order from "../models/order";
const { v4: uuidv4 } = require("uuid");

export const GenerateBid = async (req, res) => {
  try {
    const { orderId, startTime, endTime, status, minimumIncrement } = req.body;
    if (!orderId || !startTime || !endTime || !status || !minimumIncrement) {
      res.status(400).json(new ApiError(400, "Please Provide all the fields"));
    }

    const existingOrderId = await Order.findOne({ orderId });
    if (!existingOrderId) {
      return res
        .status(400)
        .json(new ApiError(400, "Order Id does not exist."));
    }

    const BidInstance = {
      bidId: uuidv4(),
      orderId: orderId,
      startTime: startTime,
      endTime: endTime,
      status: "open",
      bids: [],
      finalHighestBid: {},
      minimumIncrement: minimumIncrement,
      notifications: [],
      numberOfBidders: 0,
      totalBids: 0,
      biddingOver: false,
    };
    if (BidInstance) {
      const bid = new Bid(BidInstance);

      await bid.save();
      res.status(201).json({ bid });
    }
  } catch (error) {
    console.log("Error in Bid System contoller : ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const bidToBeAssigned = asyncHandler(async (req, res) => {
  const { bidId } = req.params;
  // Validate request
  if (!bidId) {
      return res.status(400).json(new ApiError(400, "Bid ID is required"));
  }

  // Find the bid by ID
  const bid = await Bid.findOne({ bidId });
  if (!bid) {
      return res.status(404).json(new ApiError(404, `Bid with ID ${bidId} not found`));
  }

  // Retrieve the associated orderId from the bid
  const orderId = bid.orderId;

  // Find the order by ID
  const order = await Order.findById(orderId);
  if (!order) {
      return res.status(404).json(new ApiError(404, `Order with ID ${orderId} not found`));
  }

  // Check if the bid is still open
  if (bid.status !== "open") {
      return res.status(400).json(new ApiError(400, `Bid with ID ${bidId} is not open for assignment`));
  }

  // Assign the highest bid to the order
  const highestBid = bid.finalHighestBid;
  if (!highestBid || !highestBid.bidder) {
      return res.status(400).json(new ApiError(400, "No valid highest bid found to assign"));
  }

  order.driverId = highestBid.bidder;
  order.AssignedAmount = highestBid.amount;
  order.orderStatus = "waiting";
  await order.save();

  // Update bid status to "closed"
  bid.status = "closed";
  bid.biddingOver = true;
  await bid.save();
  
  return res.status(200).json(new ApiResponse(200, {order : order,bid : bid} , "Bid successfully assigned to the order"));
});