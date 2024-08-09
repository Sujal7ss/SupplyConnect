import { ApiResponse } from "../lib/utils/ApiResponse";
import { asyncHandler } from "../lib/utils/asyncHandler";
import { ApiError } from "../lib/utils/error";
import { Order } from "../models/order";
import user from "../models/user";


const CreateOrder = asyncHandler(async(req,res) => {

    // let userdetails = await user.findOne({_id : req.user._id});
    let userdetails = req.user;

    if(userdetails.type === "driver"){
        return res.status(400).json(new ApiError(400,"Driver can not Place the Order (No Access)"))
    }
    const {pickUpLocation,DeliveryLocation,orderStatus,pickUpTime,deliveryTime,orderAmount} = req.body;
    
    if(!pickUpLocation || !DeliveryLocation || !orderStatus || !pickUpTime || !deliveryTime || !orderAmount){
        return res.status(400).json(new ApiError(400,"Please Provide all the Fields"));
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
        orderStatus,
        pickUpTime,
        deliveryTime,
        orderAmount
    })

    let createdorder = await order.save();

    return res.status(201).json(new ApiResponse(201, createdorder , "New Order Created Sucessfully !!"));

});

const orderDetails = asyncHandler(async (req,res) => {

    let { orderId } = req.params;

    const orderdetails = await Order.findone({_id : orderId}) ;

    if(!orderdetails){
        return res.status(400).json(new ApiError(400,`order with order id ${orderId} is not Found Please Contact Us`));
    }
    res.status(201).json(new ApiResponse(201,orderdetails,"Your Order Details"));
});

const updateorderdetails = asyncHandler(async (req,res) => {
    let { orderId } = req.params;

    const orderdetails = await Order.findone({_id : orderId}) ;

    if(!orderdetails){
        return res.status(400).json(new ApiError(400,`order with order id ${orderId} is not Found Please Contact Us`));
    }

    let od = await Order.findByIdAndUpdate(orderId,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

    if(!od){
        res.status(400).json(new ApiError(400,`order with order id ${orderId} is not Updated Please ReUpdate it `));
    }

    res.status(201).json(new ApiResponse(201,od,"Job Updated Succesfully"));
});
const allorders = asyncHandler(async (req,res) => {
    let { supplierid } = req.params;
    if(!supplierid){
        res.status(400).json(new ApiError(400,"Please Provide the Supplier Details"));
    }
    let allord = await Order.find({_id : supplierid});
    res.status(200).json(new ApiResponse(200,allord,`All Orders with Suppler id  = ${supplierid} is Fetched`));

});

const MyOrders = asyncHandler(async (req,res) =>{ 
    // let curruser = await user.find({_id : req.user._id});
    // if(!curruser){
    //     res.status(404).json(new ApiError(404," please Authenticate yourSelf"));
    // }
    let curruser = req.user;
    if(curruser.type == "driver"){
        res.status(400).json(new ApiError(404,"Unauthorised User Access"));
    }

    let data = await Order.find({_id : req.user_id});

    if(!data){
        res.status(400).json(new ApiError(400,"Can't fatch the data"));
    }
    
    res.status(201).json(new ApiResponse(201,data,"Order Details Created By you Fetched Successfully !!"));
});



module.exports = {
    CreateOrder,orderDetails,updateorderdetails,allorders,MyOrders
}