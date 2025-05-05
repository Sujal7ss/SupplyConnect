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
    vehicleType,
    city
  } = req.body;

  if (
    !pickUpLocation ||
    !deliveryLocation ||
    !pickUpTime ||
    !deliveryTime ||
    !orderAmount ||
    !vehicleType ||
    !city
  ) {
    return res.status(400).json(new ApiError(400, "Please provide all the fields"));
  }

  // Validate field formats (if needed, e.g., dates)
  if (isNaN(new Date(pickUpTime)) || isNaN(new Date(deliveryTime))) {
    return res.status(400).json(new ApiError(400, "Invalid date format"));
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
    vehicleType,
    AssignedAmount: 0,
    city
  });

  let createdorder = await order.save();
  if (!createdorder) {
    console.log("Please check the database");
    return res.status(400).json(new ApiError(400, "Error adding order data to the database"));
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdorder, "New Order Created Successfully!"));
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
  // if (req.user.type === "supplier") {
  //   if (req.user._id.toString() !== orderdetails.supplierId.toString()) {
  //     return res.status(403).json(new ApiError(403, "You cannot access other users' data"));
  //   }
  // }
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
// Get All Orders
export const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json(new ApiError(404, "No orders found."));
    }
    res.status(200).json(new ApiResponse(200, orders, "All Orders Fetched Successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
});



// Get Orders for Logged-in User
export const MyOrders = asyncHandler(async (req, res) => {
  try {
    console.log(req.user)
    const curruser = req.user;

    // ❌ Restrict access for drivers
    if (curruser.type === "driver") {
      return res.status(403).json({ success: false, message: "Drivers can't access supplier orders." });
    }

    // ✅ Pagination (default: page 1, limit 10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ✅ Fetch orders for the supplier with pagination & sorting (latest orders first)
    const orders = await Order.find({ supplierId: curruser._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // ✅ Count total orders for pagination metadata
    const totalOrders = await Order.countDocuments({ supplierId: curruser._id });

    return res.status(200).json({
      success: true,
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
      message: "Your order details fetched successfully!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
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
