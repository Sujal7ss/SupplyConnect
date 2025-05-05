import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DateTimePicker } from "react-datetime-picker";
import { FaChevronLeft } from "react-icons/fa";
import { RiRoadMapLine } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { PiTruck } from "react-icons/pi";
import { toast } from "react-toastify";

import mini from "../assets/mini.png";
import medium from "../assets/medium.png";
import big from "../assets/big.png";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "maplibre-gl/dist/maplibre-gl.css";
import { useMapp } from "../Context/MapContext";
import { useAuth } from "../Context/AuthContext";

export default function OrderBooking() {
  const {
    mapContainer,
    startboxref,
    startAddress,
    handleSearchInputChange,
    autocompleteResults,
    handlesuggestionstart,
    suggestionsRef,
    distance,
    reversegeovalue,
    handleFormSubmit,
    endboxref,
    handlesuggestionend,
    firstMarker,
    secondMarker,
    endAddress,
  } = useMapp();

  const [pickupLocation, setPickupLocation] = useState(reversegeovalue);
  const [dropoffLocation, setDropoffLocation] = useState();
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("medium");
  const [orderTime, setOrderTime] = useState(new Date());
  const [estimatedCost, setEstimatedCost] = useState(0);
  // const [distance, setDistance] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [flag, setflag] = useState(1);
  const changepickupvalue = useRef();
  const [placeorderbutton, setplaceorderbutton] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === false) {
    navigate("/signin");
  }

  // Truck fuel efficiencies in km per liter (example values)
  const truckFuelEfficiencies = {
    mini: 8, // Example: 8 km/l
    medium: 7, // Example: 7 km/l
    big: 6, // Example: 6 km/l
  };

  // Fuel price in INR per liter
  const fuelPricePerLiter = 100;

  // Function to calculate estimated cost
  const calculateEstimatedCost = (distanceKm, truckType) => {
    if (!truckFuelEfficiencies[truckType]) {
      return 0;
    }

    const fuelEfficiencyKmPerLiter = truckFuelEfficiencies[truckType];
    const fuelNeeded = distanceKm / fuelEfficiencyKmPerLiter;
    const cost = fuelNeeded * fuelPricePerLiter;
    return cost.toFixed(2);
  };

  useEffect(() => {
    if (startAddress && endAddress) {
      setPickupLocation(startAddress);
      setDropoffLocation(endAddress);
    }
  }, [startAddress, endAddress]);

  useEffect(() => {
    if (distance && type) {
      const cost = calculateEstimatedCost(distance, type);
      setEstimatedCost(cost);
    }
  }, [distance, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Order Created");

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/book-ride`,
        {
          pickupLocation,
          dropoffLocation,
          weight,
          size,
          type,
          orderTime,
        }
      );
      setSuccess("Ride booked successfully!");
    } catch (err) {
      setError("Failed to book ride. Please try again.");
    } finally {
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-auto flex justify-center items-center bg-slate-200">
        <button
          onClick={() => navigate(-1)}
          className="bg-white shadow-md  w-10 h-10 z-20 flex items-center justify-center fixed left-4 top-14 rounded-lg"
        >
          <FaChevronLeft className="text-black " />
        </button>

        <div className="w-full max-w-md h-full overflow-hidden relative flex flex-col ">
          <div
            ref={mapContainer}
            className={
              !placeorderbutton ? `w-full h-screen` : `w-full h-[55vh]`
            }
          />
          <div className="absolute top-4 left-14 z-10">
            <form id="search-form" onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-2">
                <input
                  type="search"
                  id="start_location"
                  ref={startboxref}
                  // value={  }
                  className="p-4 ps-3  text-sm text-gray-800 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none placeholder-gray-800"
                  placeholder="Pickup Location"
                  required
                  onChange={handleSearchInputChange}
                />
                <div className="flex">
                  <input
                    type="search"
                    id="endlocation"
                    ref={endboxref}
                    className="p-4 ps-3 text-sm text-gray-800 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none placeholder-gray-800"
                    placeholder="Dropoff Location"
                    required
                    onChange={handleSearchInputChange}
                  />
                  <button
                    type="submit"
                    className="text-gray-800 end-2.5 bottom-2.5 bg-gray-700/5 backdrop-blur-md hover:bg-white/20 focus:outline-none font-medium rounded-md text-sm px-4 py-2"
                  >
                    Go
                  </button>
                </div>
              </div>
            </form>
            <div
              className={` ${
                autocompleteResults.length === 0
                  ? "hidden"
                  : "h-[50vh] overflow-x-scroll no-scrollbar"
              }`}
            >
              <ul
                className={`mt-4 space-y-1 list-none list-inside w-52 ${
                  autocompleteResults.length === 0 ? "hidden" : ""
                }`}
                id="suggestions"
                ref={suggestionsRef}
              >
                {autocompleteResults.map((result, index) => (
                  <li
                    key={index}
                    className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/50 rounded-md cursor-pointer text-gray-800 text-start break-word"
                    onClick={() =>
                      startboxref.current.id === "start_location"
                        ? handlesuggestionstart(result)
                        : handlesuggestionend(result)
                    }
                  >
                    {result.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white w-full h-96  flex flex-col align-middle items-center rounded-t-badge justify-around z-10">
            <div className="  font-semibold ">Select Truck</div>
            <div className="flex w-full h-40 align-middle items-center justify-evenly">
              <button
                onClick={() => {
                  setType("mini");
                }}
                className={`w-full m-1 rounded-badge h-full flex align-middle items-center  ${
                  type === "mini" ? "shadow-xl " : "bg-white mt-4"
                }`}
              >
                <img src={mini} alt="medium" className="w-42 mt-7" />
              </button>
              <button
                onClick={() => {
                  setType("medium");
                }}
                className={`w-full m-1 rounded-badge h-full flex align-middle items-center  ${
                  type === "medium" ? "shadow-xl " : "bg-white mt-4"
                }`}
              >
                <img src={medium} alt="mini" className="w-26" />
              </button>
              <button
                onClick={() => {
                  setType("big");
                }}
                className={`w-full m-1 rounded-badge h-full flex align-middle items-center  ${
                  type === "big" ? " shadow-xl " : "bg-white mt-4"
                }`}
              >
                <img src={big} alt="big" className="w-full" />
              </button>
            </div>

            <div className=" w-full h-12 flex flex-row align-middle items-center justify-around">
              <div className="flex flex-row ">
                <RiRoadMapLine size={20} className="mr-1" />
                <div className="font-semibold">{distance} km</div>
              </div>
              <div className="flex flex-row ">
                <PiTruck size={23} className="mr-1" />
                <div className="font-semibold">{type}</div>
              </div>
              <div className="flex flex-row ">
                <FaRupeeSign size={15} className="mr-1 mt-1" />
                <div className="font-semibold"> {estimatedCost}</div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="btn bg-yellow-300 w-44 rounded-2xl h-12"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
