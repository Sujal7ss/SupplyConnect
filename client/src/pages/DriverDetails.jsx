import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { PiTruckLight } from "react-icons/pi";
import { LuClock7 } from "react-icons/lu";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import Avatar, { genConfig } from "react-nice-avatar";

const Driver = {
    name: "John Doe",
    phone : 6215638678,
    registrationNumber : "CG 49 AV 6125",
    drivingLicense : "CG71 73189853189",
    carModel : "P300"

}
const DriverDetails = () => {
  const config = genConfig({ sex: "man", hairStyle: "mohawk" }) 
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-100 w-full min-h-screen flex flex-col align-middle  items-center ">
        <div className="bg-yellow-300 w-96 h-32 fixed top-0 z-0 rounded-b-full shadow-sm"></div>
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
              <Avatar
                style={{ width: "70px", height: "70px" }}
                {...config}
              />
            </div>
            <div className="font-bold">{Driver.name}</div>
          </div>
          <div className="bg-white w-48 h-14 shadow-md rounded-2xl flex align-middle items-center justify-center font-semibold">
            {Driver.phone}
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
            <h3 className="text-sm">Registration Number</h3>
            <h3 className="text-lg">{Driver.registrationNumber}</h3>
          </div>
          <div className="flex flex-col align-start items-center border-black">
            <h3 className="text-sm">Driving License</h3>
            <h3 className="text-lg">{Driver.drivingLicense}</h3>
          </div>
          <div className="flex flex-col align-start items-center border-black">
            <h3 className="text-sm">Car Model</h3>
            <h3 className="text-lg">{Driver.carModel}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
