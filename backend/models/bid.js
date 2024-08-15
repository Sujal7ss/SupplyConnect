import mongoose from "mongoose";
const BidSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      ref: "Order",
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
          DriverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: true,
          },
          Name: String,
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
        default: Infinity,
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
    totalBids: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Bid = mongoose.model("Bid", BidSchema);
