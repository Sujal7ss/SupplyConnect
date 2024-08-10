import Bid from "../models/bid";
import Order from "../models/order";
const { v4: uuidv4 } = require("uuid");

const GenerateBid = async (req, res) => {
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
