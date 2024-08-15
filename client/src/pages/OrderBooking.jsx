import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { DateTimePicker } from "react-datetime-picker";
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
  const [type, setType] = useState("");
  const [orderTime, setOrderTime] = useState(new Date());
  // const [distance, setDistance] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [flag, setflag] = useState(1);
  const changepickupvalue = useRef();
  const [placeorderbutton,setplaceorderbutton] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === false) {
    navigate("/signin");
  }

  // useEffect(() => {
  //   setPickupLocation(startAddress);
  //   setDropoffLocation(endAddress);
  // }, [firstMarker, secondMarker, startAddress, endAddress]);

  useEffect(() => {
    if (startAddress && endAddress) {
      setPickupLocation(startAddress);
      setDropoffLocation(endAddress);
    }
  }, [startAddress, endAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-auto flex justify-center items-center bg-slate-200">
        <div className="w-full max-w-md h-full overflow-hidden relative flex flex-col">
          <div ref={mapContainer} className={!placeorderbutton ? `w-full h-screen` : `w-full h-[55vh]`}/>
          <div className="absolute top-4 left-14 z-10">
            <form id="search-form" onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-2">
                <input
                  type="search"
                  id="start_location"
                  ref={startboxref}
                  // value={  }
                  className="p-4 ps-3 pe-16 text-sm text-gray-800 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none placeholder-gray-800"
                  placeholder="Pickup Location"
                  required
                  onChange={handleSearchInputChange}
                />
                <div className="flex">
                  <input
                    type="search"
                    id="endlocation"
                    ref={endboxref}
                    className="p-4 ps-3 pe-16 text-sm text-gray-800 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none placeholder-gray-800"
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
                className={`mt-4 space-y-1 list-none list-inside w-52${
                  autocompleteResults.length === 0 ? "hidden" : ""
                }`}
                id="suggestions"
                ref={suggestionsRef}
              >
                {startAddress === null
                  ? autocompleteResults.map((place, index) => (
                      <li
                        key={index}
                        className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/50 rounded-md cursor-pointer text-gray-800 text-start break-word"
                        onClick={() => handlesuggestionstart(place)}
                      >
                        {place.description}
                      </li>
                    ))
                  : autocompleteResults.map((place, index) => (
                      <li
                        key={index}
                        className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/50 rounded-md cursor-pointer text-gray-800 text-start break-word"
                        onClick={() => handlesuggestionend(place)}
                      >
                        {place.description}
                      </li>
                    ))}
              </ul>
            </div>
          </div>
          {/* <div className={!placeorderbutton ? `absolute bottom-0 left-0 w-full max-w-md h-[5vh] bg-red-400 rounded-xl z-40` : `absolute bottom-0 w-full h-[45vh] bg-red-400 rounded-xl z-40`}></div> */}
        </div>
      </div>
    </>
  );
}
