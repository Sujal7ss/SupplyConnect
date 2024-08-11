import { ApiResponse } from "../lib/utils/ApiResponse";
import { asyncHandler } from "../lib/utils/asyncHandler";
import { ApiError } from "../lib/utils/error";
import Bid from "../models/bid";
import Order from "../models/order";

export const CreateOrder = asyncHandler(async (req, res) => {
  try {
    // let userdetails = await user.findOne({_id : req.user._id});
    let userdetails = req.user;

    if (userdetails.type === "driver") {
      return res
        .status(400)
        .json(new ApiError(400, "Driver can not Place the Order (No Access)"));
    }
    const {
      pickUpLocation,
      DeliveryLocation,
      pickUpTime,
      deliveryTime,
      orderAmount,
    } = req.body;

    if (
      !pickUpLocation ||
      !DeliveryLocation ||
      !pickUpTime ||
      !deliveryTime ||
      !orderAmount
    ) {
      return res
        .status(400)
        .json(new ApiError(400, "Please Provide all the Fields"));
    }

    let supplierid = userdetails._id;
    let driverid = NULL;
    // When driver is confirm change the Driver id
    // const today = new Date();
    // const options = { day: 'numeric', month: 'long', year: 'numeric' };
    // const formattedDate = today.toLocaleDateString('en-US', options);

    // for the future use;

    let order = new Order({
      supplierid,
      driverid,
      pickUpLocation,
      DeliveryLocation,
      orderStatus : "waiting",
      pickUpTime,
      deliveryTime,
      orderAmount,
      AssignedAmount : 0,
    });

    let createdorder = await order.save();
    if(!createdorder){
      console.log("Please Check the Database");
      return res.status(400).json(new ApiError(400,"Error in adding Orderdata to the Database"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(200, createdorder, "New Order Created Sucessfully !!")
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
});

export const orderDetails = asyncHandler(async (req, res) => {
  try {
    let { orderId } = req.params;
    const orderdetails = await Order.findone({ _id: orderId });
    if (!orderdetails) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `order with order id ${orderId} is not Found Please Contact Us`
          )
        );
    }
    if(req.user.type === "supplier" ){
      if(req.user.user_id !== orderdetails.supplierid){
        res.status(400).json(new ApiError(400,"You Can't Access to the other Data"));
      }
    }
    res
      .status(200)
      .json(new ApiResponse(200, orderdetails, "Your Order Details"));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
});

export const updateorderdetails = asyncHandler(async (req, res) => {
  try {
    let { orderId } = req.params;
    if(req.user.type === "driver"){
      return res.status(400).json(new ApiError(400,"You Can't Edit the Order Data"));
    }
    const orderdetails = await Order.findone({ _id: orderId });
    if (!orderdetails) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `order with order id ${orderId} is not Found Please Contact Us`
          )
        );
    }

    let od = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!od) {
      res
        .status(400)
        .json(
          new ApiError(
            400,
            `order with order id ${orderId} is not Updated Please ReUpdate it `
          )
        );
    }

    res.status(200).json(new ApiResponse(200, od, "Job Updated Succesfully"));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
});
export const allorders = asyncHandler(async (req, res) => {
  try {
    let user = req.user;
    if(user.type === "supplier"){
      return res.status(400).json(new ApiError(400,"Supplier can't get Access to the AllOrder Sections"));
    }
    let allorders = await Order.find({orderStatus : "waiting"});
    if(!allorders){
      return res.status(400).json(new ApiError(400,"Can't Get order's Details"));
    }

    return res.status(200).json(new ApiResponse(200,allorders,"All Orders Fetched !!"));
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
});

export const MyOrders = asyncHandler(async (req, res) => {
  try {
    // let curruser = await user.find({_id : req.user._id});
    // if(!curruser){
    //     res.status(404).json(new ApiError(404," please Authenticate yourSelf"));
    // }
    let curruser = req.user;
    if (curruser.type === "driver") {
      res.status(400).json(new ApiError(404, "Unauthorised User Access"));
    }

    let data = await Order.find({ _id: req.user_id });

    if (!data) {
      res.status(400).json(new ApiError(400, "Can't fatch the data"));
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          data,
          "Order Details Created By you Fetched Successfully !!"
        )
      );
  } catch (error) {
    console.log(error);
    return res.status(400).json(new ApiError(400, error.message));
  }
});

export const getBidsForOrder = asyncHandler(async (req, res) => {
  try {
    let { orderId } = req.params;
    orderId = await Order.find({_id : orderId});
    if(!orderId){
       return res.status(400).json(new ApiError(400,"Invalid OrderID"));
    }

    let bids = await Bid.find({ orderId : orderId });

    if(!bids){
        return res.status(400).json(new ApiError(400,"can't fetch the bids for this User"));
    }

    res.status(200).json(new ApiResponse(200,bids,"Bids Fetched Succefully"));
  } catch (error) {
    res.status(500).json(new ApiError(500,error.message));
  }
});