import mongoose from "mongoose";
const BidSchema = new mongoose.Schema(
  {
    bidId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed", "cancelled"],
      default: "open",
    },
    bids: [
      {
        bidder: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Driver",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        timestamp: {
          type: Date,
          default: Date.now,
          required: true,
        },
      },
    ],
    finalLowestBid: {
      bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
      },
      amount: {
        type: Number,
        default : Infinity,
        min: 0,
      },
      timestamp: {
        type: Date,
      },
    },
    minimumDecrement: {
      type: Number,
      default: 1,
    },
    notifications: [
      {
        type: String,
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    numberOfBidders: {
      type: Number,
      default: 0,
    },
    totalBids: {
      type: Number,
      default: 0,
    },
    biddingOver: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Bid = mongoose.model("Bid", BidSchema);
