import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { PiTruckLight } from "react-icons/pi";
import { LuClock7 } from "react-icons/lu";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";

const DriverDetails = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 w-full min-h-screen flex flex-col align-middle items-center">
        <div className="bg-yellow-300 w-full h-32 fixed top-0 z-0 rounded-b-full shadow-sm"></div>
        <button
          onClick={() => navigate(-1)}
          className="bg-white shadow-md  w-10 h-10 z-20 flex items-center justify-center fixed left-8 top-5 rounded-lg"
        >
          <FaChevronLeft className="text-black " />
        </button>

        <div className="w-full h-80 relative mb-7 top-10 flex flex-col justify-between align-middle items-center">
          <h2 className="font-semibold">Driver Details</h2>
          <div>
            <div className="bg-transparent w-20 h-20 rounded-lg shadow-sm flex align-middle justify-center items-center">
              {" "}
              <CgProfile size={50} />
            </div>
            <div className="font-bold">Joe Smith</div>
          </div>
          <div className="bg-white w-48 h-14 shadow-md rounded-2xl flex align-middle items-center justify-center font-semibold">
            +93156 38678
          </div>
          <div className="bg-white w-80  h-20 shadow-md rounded-badge flex flex-row align-middle items-center justify-around font-semibold">
            <div className="flex flex-col align-middle items-center">
              <CiStar className="size-6" />
              <h3>
                4.8 <span className="text-xs">Stars</span>
              </h3>
            </div>
            <div className="flex flex-col align-middle items-center">
              <PiTruckLight className="size-6" />
              <h3>
                126 <span className="text-xs">Trips</span>
              </h3>
            </div>
            <div className="mt-2 flex flex-col align-middle items-center">
              <LuClock7 className="size-4" />
              <h3>
                3 <span className="text-xs">Years</span>
              </h3>
            </div>
          </div>
        </div>

        {/* <div className=" w-11/12 h-80 mb-10 relative top-10 flex flex-col justify-between align-middle items-center"></div> */}
        <div className="bg-white w-80 h-72 shadow-md rounded-badge relative top-10 flex flex-col justify-around align-start items-center px-10">
          <div className="flex flex-col align-start items-center border-black">
            <h3 className="text-sm">License Number</h3>
            <h3 className="text-lg">MH 49 AV 6125</h3>
          </div>
          <div className="flex flex-col align-start items-center border-black">
            <h3 className="text-sm">Driving License</h3>
            <h3 className="text-lg">XXXXXX</h3>
          </div>
          <div className="flex flex-col align-start items-center border-black">
            <h3 className="text-sm">Car Model</h3>
            <h3 className="text-lg">XXXXXX</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
