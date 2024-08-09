const BidSchema = new mongoose.Schema(
  {
    bidId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order", // Assuming there's an order model
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
          ref: "Driver", // Assuming there's a Driver model
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
    finalHighestBid: {
      bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: {
        type: Number,
        min: 0,
      },
      timestamp: {
        type: Date,
      },
    },
    minimumIncrement: {
      type: Number,
      default: 1, // Default increment, can be modified
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

const Bid = mongoose.model("Bid", BidSchema);

module.exports = Bid;
