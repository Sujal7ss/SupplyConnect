import React from "react";
// import { Link } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { RiRoadMapLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { PiTruck } from "react-icons/pi";

const OrderCardSmall = ({ order, distance }) => {
  const {
    _id,
    pickUpLocation,
    deliveryLocation,
    vehicleType,
    orderAmount,
    orderStatus,
  } = order;

  return (
    <>
      {/* <Link
        to={`/order-detaildss/${_id}`}
        className="bg-white rounded-2xl w-11/12 h-52 p-4 flex flex-col justify-between shadow-md mt-4"
      > */}
        <div className="bg-white rounded-2xl w-11/12 h-52 p-4 flex flex-row justify-between shadow-md mt-4">
          <div className="w-10 flex flex-col justify-around align-middle items-center">
            <HiLocationMarker size={20} />
            <HiOutlineLocationMarker size={20} />
          </div>
          <div className=" bg-white  flex flex-col align-middle justify-around">
            <div>
              <div className="font-thin">Pickup Point</div>
              <div>{pickUpLocation}</div>
            </div>
            <div>
              <div className="font-thin">Drop Point</div>
              <div>{deliveryLocation}</div>
            </div>
          </div>
        </div>
        <div className=" w-full h-12 flex flex-row align-middle items-center justify-around">
          <div className="flex flex-row ">
            <RiRoadMapLine size={20} className="mr-1" />
            <div className="font-semibold">287.1 km</div>
          </div>
          <div className="flex flex-row ">
            <PiTruck size={23} className="mr-1" />
            <div className="font-semibold">{vehicleType}</div>
          </div>
          <div className="flex flex-row ">
            <FaRupeeSign size={15} className="mr-1 mt-1" />
            <div className="font-semibold"> {orderAmount}</div>
          </div>
        </div>
      {/* </Link> */}
    </>
  );
};

export default OrderCardSmall;
