import { ApiResponse } from "../lib/utils/ApiResponse.js";
import { asyncHandler } from "../lib/utils/asyncHandler.js";
import { ApiError } from "../lib/utils/error.js";
import { Bid } from "../models/bid.js";
import Order from "../models/order.js";

// Create Order
export const CreateOrder = asyncHandler(async (req, res) => {
  let userdetails = req.user;

  if (userdetails.type === "driver") {
    return res
      .status(400)
      .json(new ApiError(400, "Driver can not place the order (No Access)"));
  }

  const {
    pickUpLocation,
    deliveryLocation,
    pickUpTime,
    deliveryTime,
    orderAmount,
  } = req.body;

  if (
    !pickUpLocation ||
    !deliveryLocation ||
    !pickUpTime ||
    !deliveryTime ||
    !orderAmount
  ) {
    return res.status(400).json(new ApiError(400, "Please provide all the fields"));
  }

  let supplierId = userdetails._id;
  let driverId = null;

  let order = new Order({
    supplierId,
    driverId,
    pickUpLocation,
    deliveryLocation,
    orderStatus: "waiting",
    pickUpTime,
    deliveryTime,
    orderAmount,
    AssignedAmount: 0,
  });

  let createdorder = await order.save();
  if (!createdorder) {
    console.log("Please check the database");
    return res.status(400).json(new ApiError(400, "Error adding order data to the database"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, createdorder, "New Order Created Successfully!"));
});

// Get Order Details
export const orderDetails = asyncHandler(async (req, res) => {
  let { orderId } = req.params;
  const orderdetails = await Order.findById(orderId);
  if (!orderdetails) {
    return res
      .status(404)
      .json(new ApiError(404, `Order with ID ${orderId} not found. Please contact us.`));
  }
  if (req.user.type === "supplier") {
    if (req.user._id.toString() !== orderdetails.supplierId.toString()) {
      return res.status(403).json(new ApiError(403, "You cannot access other users' data"));
    }
  }
  res.status(200).json(new ApiResponse(200, orderdetails, "Your Order Details"));
});

// Update Order Details
export const updateorderdetails = asyncHandler(async (req, res) => {
  let { orderId } = req.params;
  if (req.user.type === "driver") {
    return res.status(403).json(new ApiError(403, "You cannot edit the order data"));
  }

  const orderdetails = await Order.findById(orderId);
  if (!orderdetails) {
    return res
      .status(404)
      .json(new ApiError(404, `Order with ID ${orderId} not found. Please contact us.`));
  }

  let od = await Order.findByIdAndUpdate(orderId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!od) {
    return res
      .status(400)
      .json(new ApiError(400, `Order with ID ${orderId} was not updated. Please try again.`));
  }

  res.status(200).json(new ApiResponse(200, od, "Order Updated Successfully"));
});

// Get All Orders
export const allorders = asyncHandler(async (req, res) => {
  try {
    let userdetails = req.user;
    // console.log("HII", userdetails);

    if (userdetails.type === "supplier") {
      return res.status(403).json(new ApiError(403, "Supplier cannot access the All Orders section."));
    }

    let allo = await Order.find({ orderStatus: "waiting" });

    if (!allo || allo.length === 0) {
      return res.status(404).json(new ApiError(404, "No orders found."));
    }

    return res.status(200).json(new ApiResponse(200, allo, "All Orders Fetched Successfully!"));
  } catch (error) {
    console.log('Error occurred:', error);
    return res.status(500).json(new ApiError(500, error.message));
  }
});

// Get Orders for Logged-in User
export const MyOrders = asyncHandler(async (req, res) => {
  try {
    let curruser = req.user;
    if (curruser.type === "driver") {
      return res.status(403).json(new ApiError(403, "Driver Can't Access to Supplier Access"));
    }

    let data = await Order.find({ supplierId: curruser._id });

    if (!data || data.length === 0) {
      return res.status(404).json(new ApiError(404, "No orders found."));
    }

    res.status(200).json(new ApiResponse(200, data, "Your Order Details Fetched Successfully!"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
});

// Get Bids for a Specific Order
export const getBidsForOrder = asyncHandler(async (req, res) => {
  try {
    let { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
       return res.status(404).json(new ApiError(404,"Invalid OrderID"));
    }

    let bids = await Bid.find({ orderId: orderId });

    if (!bids || bids.length === 0) {
        return res.status(404).json(new ApiError(404, "No bids found for this order."));
    }

    res.status(200).json(new ApiResponse(200, bids, "Bids Fetched Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});
