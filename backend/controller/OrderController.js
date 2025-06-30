import { ApiResponse } from "../lib/utils/ApiResponse.js";
import { asyncHandler } from "../lib/utils/AsyncHandler.js";
import { ApiError } from "../lib/utils/error.js";
import { Bid } from "../models/bid.js";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const {
      title,
      description,
      pickupAddress,
      deliveryAddress,
      pickupCoordinates,
      deliveryCoordinates,
      items,
      totalWeight,
      dimensions,
      expectedPickupDate,
      expectedDeliveryDate,
      budget,
      distance,
      duration,
    } = req.body;

    const supplierId = req.user?._id;
    if (!supplierId) {
      return res.status(401).json({ message: "Unauthorized: supplierId missing" });
    }

    // Basic manual validation
    const requiredFields = [
      { field: title, name: "title" },
      { field: description, name: "description" },
      { field: pickupAddress, name: "pickupAddress" },
      { field: deliveryAddress, name: "deliveryAddress" },
      { field: pickupCoordinates?.lat, name: "pickupCoordinates.lat" },
      { field: pickupCoordinates?.lng, name: "pickupCoordinates.lng" },
      { field: deliveryCoordinates?.lat, name: "deliveryCoordinates.lat" },
      { field: deliveryCoordinates?.lng, name: "deliveryCoordinates.lng" },
      { field: items, name: "items" },
      { field: totalWeight, name: "totalWeight" },
      { field: dimensions, name: "dimensions" },
      { field: expectedPickupDate, name: "expectedPickupDate" },
      { field: expectedDeliveryDate, name: "expectedDeliveryDate" },
      { field: budget, name: "budget" },
      { field: distance, name: "distance" },
      { field: duration, name: "duration" },
    ];

    const missingFields = requiredFields.filter((f) => !f.field && f.field !== 0);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Missing required fields",
        missing: missingFields.map((f) => f.name),
      });
    }

    // Optional: Validate array of items
    const invalidItems = items.filter(
      (item) => !item.name || item.quantity === undefined || !item.weight
    );
    if (invalidItems.length > 0) {
      return res.status(400).json({
        message: "Invalid items in the order. Each item must include name, quantity, and weight.",
      });
    }

    const newOrder = new Order({
      title,
      description,
      pickupAddress,
      deliveryAddress,
      pickupCoordinates,
      deliveryCoordinates,
      items,
      totalWeight,
      dimensions,
      expectedPickupDate,
      expectedDeliveryDate,
      budget,
      distance,
      duration,
      supplierId,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message || "Something went wrong",
    });
  }
};


// Get Order Details
export const orderDetails = asyncHandler(async (req, res) => {
  let { orderId } = req.params;

  const orderdetails = await Order.findById(orderId);
  if (!orderdetails) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          `Order with ID ${orderId} not found. Please contact us.`
        )
      );
  }
  // if (req.user.type === "supplier") {
  //   if (req.user._id.toString() !== orderdetails.supplierId.toString()) {
  //     return res.status(403).json(new ApiError(403, "You cannot access other users' data"));
  //   }
  // }
  res
    .status(200)
    .json(new ApiResponse(200, orderdetails, "Your Order Details"));
});

// Update Order Details
export const updateorderdetails = asyncHandler(async (req, res) => {
  let { orderId } = req.params;
  if (req.user.type === "driver") {
    return res
      .status(403)
      .json(new ApiError(403, "You cannot edit the order data"));
  }

  const orderdetails = await Order.findById(orderId);
  if (!orderdetails) {
    return res
      .status(404)
      .json(
        new ApiError(
          404,
          `Order with ID ${orderId} not found. Please contact us.`
        )
      );
  }

  let od = await Order.findByIdAndUpdate(orderId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!od) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          `Order with ID ${orderId} was not updated. Please try again.`
        )
      );
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
    res
      .status(200)
      .json(new ApiResponse(200, orders, "All Orders Fetched Successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(500, error.message));
  }
});

// Get Orders for Logged-in User
export const MyOrders = asyncHandler(async (req, res) => {
  try {
    console.log(req.user);
    const curruser = req.user;

    // ❌ Restrict access for drivers
    if (curruser.type === "driver") {
      return res
        .status(403)
        .json({
          success: false,
          message: "Drivers can't access supplier orders.",
        });
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
    const totalOrders = await Order.countDocuments({
      supplierId: curruser._id,
    });

    return res.status(200).json({
      success: true,
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
      message: "Your order details fetched successfully!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// Get Bids for a Specific Order
export const getBidsForOrder = asyncHandler(async (req, res) => {
  try {
    let { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json(new ApiError(404, "Invalid OrderID"));
    }

    let bids = await Bid.find({ orderId: orderId });

    if (!bids || bids.length === 0) {
      return res
        .status(404)
        .json(new ApiError(404, "No bids found for this order."));
    }

    res
      .status(200)
      .json(new ApiResponse(200, bids, "Bids Fetched Successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});
