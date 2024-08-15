import { ApiResponse } from "../lib/utils/ApiResponse.js";
import { asyncHandler } from "../lib/utils/asyncHandler.js";
import { ApiError } from "../lib/utils/error.js";
import { Bid } from "../models/bid.js";
import Order from "../models/order.js";
import { v4 as uuidv4 } from "uuid"; // Updated import for uuid
import mongoose from "mongoose";
// Generate a new bid
export const GenerateBid = async (req, res) => {
  try {
    const { orderId, startTime, endTime, status, minimumDecrement } = req.body;
    let userdetails = req.user;

    if (userdetails.type === "driver") {
      return res
        .status(404)
        .json(new ApiError(404, "Driver Can't Create Bid for the Order"));
    }

    // Check if all required fields are provided
    if (!orderId || !startTime || !endTime || !status || !minimumDecrement) {
      return res
        .status(400)
        .json(new ApiError(400, "Please provide all the fields"));
    }

    // Verify that the orderId exists
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return res
        .status(400)
        .json(new ApiError(400, "Order ID does not exist."));
    }

    // Check if there's already an open bid for the given orderId
    const existingBid = await Bid.findOne({ orderId: orderId, status: "open" });
    if (existingBid) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Already having an open bid for the same order.")
        );
    }

    // Create a new bid instance
    const BidInstance = {
      bidId: uuidv4(),
      orderId: orderId,
      startTime: startTime,
      endTime: endTime,
      status: "open",
      bids: [],
      finalLowestBid: {},
      minimumDecrement: minimumDecrement,
      notifications: [],
      numberOfBidders: 0,
      totalBids: 0,
      biddingOver: false,
    };

    // Save the new bid to the database
    const bid = new Bid(BidInstance);
    await bid.save();

    // Respond with the created bid
    res.status(201).json({ bid });
  } catch (error) {
    console.log("Error in Bid System controller: ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Add a new bid
export const addBid = async (req, res) => {
  try {
    const { DriverId, Name, amount } = req.body;
    const { orderId } = req.params;

    if (amount === 0) {
      return res.status(400).json(new ApiError(400, "Some Amount Required."));
    }

    // let userdetails = req.user;

    // if (userdetails.type === "supplier") {
    //   return res
    //     .status(404)
    //     .json(new ApiError(404, "Supplier can't bid for the order"));
    // }

    if (!DriverId || amount === undefined) {
      return res
        .status(400)
        .json(new ApiError(400, "Driver ID and bid amount are required."));
    }

    // Find the Bid by orderId
    const bidd = await Bid.findOne({ orderId: orderId });
    if (!bidd) {
      return res
        .status(404)
        .json(new ApiError(404, "Bid not found for this order."));
    }

    // Check if the bid is still open
    if (bidd.biddingOver) {
      return res
        .status(400)
        .json(new ApiError(400, "Bidding is closed for this order."));
    }

    // Validate the bid amount against the minimum decrement
    const currentLowestBid = bidd.finalLowestBid.amount || Infinity;

    if (
      amount >= currentLowestBid ||
      amount > currentLowestBid - bidd.minimumDecrement
    ) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `Bid amount must be at most ${
              currentLowestBid - bidd.minimumDecrement
            }.`
          )
        );
    }

    // Add the new bid to the bids array
    const newBid = {
      bidder: { DriverId: DriverId, Name: Name },
      amount: amount,
      timestamp: new Date(),
    };
    bidd.bids.push(newBid);

    // Update the final lowest bid
    bidd.finalLowestBid = {
      bidder: { DriverId: DriverId, Name: Name },
      amount: amount,
      timestamp: new Date(),
    };

    // Update the total number of bids and number of bidders
    bidd.totalBids += 1;
    const uniqueBidders = new Set(bidd.bids.map((b) => b.bidder.toString()));
    bidd.numberOfBidders = uniqueBidders.size;

    // Save the updated Bid document
    await Bid.findOneAndUpdate({ orderId: orderId }, bidd);

    // Respond with the updated bid
    res
      .status(200)
      .json(new ApiResponse(200, bidd, "Bid Added Successfully !!"));
  } catch (error) {
    console.log("Error in addBid controller:", error.message);
    res.status(500).json(new ApiError(500, "Internal server error."));
  }
};

// Assign the lowest bid to the order
export const bidToBeAssigned = asyncHandler(async (req, res) => {
  const { OrderId } = req.params;

  // Validate request
  if (!OrderId) {
    return res.status(400).json(new ApiError(400, "Order ID is required"));
  }

  // Find the bid by orderId
  const bid = await Bid.find({ orderId: OrderId });
  console.log(bid);
  if (!bid) {
    return res
      .status(404)
      .json(new ApiError(404, `Bid with ID ${OrderId} not found`));
  }

  // Retrieve the associated bidId from the bid
  const bidId = bid._id;

  // Find the order by ID
  const order = await Order.findById(OrderId);
  if (bid.biddingOver) {
    return res
      .status(400)
      .json(
        new ApiError(400, `Bid with ID ${bidId} is not open for assignment`)
      );
  }

  // Assign the lowest bid to the order
  const lowestBid = bid.finalLowestBid;
  console.log(lowestBid);
  if (!lowestBid || !lowestBid.bidder) {
    return res
      .status(400)
      .json(new ApiError(400, "No valid lowest bid found to assign"));
  }

  order.driverId = lowestBid.bidder;
  order.AssignedAmount = lowestBid.amount;
  order.orderStatus = "waiting";
  await order.save();

  // Update bid status to "closed"
  bid.status = "closed";
  bid.biddingOver = true;
  await bid.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { order: order, bid: bid },
        "Bid successfully assigned to the order"
      )
    );
});

export const GetBids = async (req, res) => {
  try {
    const { order_id } = req.body;

    if (!order_id) {
      res.status(400).json(new ApiError(400, "No BidId specified"));
    }
    const bidData = await Bid.findOne({ orderId: order_id });
    res.send(bidData);
  } catch (error) {
    console.log("Error in cannot fetch bids ", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};
