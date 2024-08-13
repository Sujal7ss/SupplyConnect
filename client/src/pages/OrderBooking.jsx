import { useEffect, useRef, useState } from "react";
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
    handleSuggestionClick,
    reversegeovalue,
    handleFormSubmit
    
  } = useMapp();

  const [pickupLocation, setPickupLocation] = useState(reversegeovalue);
  const [dropoffLocation, setDropoffLocation] = useState();
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [orderTime, setOrderTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [flag,setflag] = useState(1);
  const changepickupvalue = useRef();


  // useEffect(()=>{
  //   console.log(reversegeovalue);
  //   changepickupvalue.current.value = reversegeovalue;
  // },[pickupLocation]);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if(isLoggedIn === false){
    navigate("/signin")
  }
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
    <div className="w-screen h-screen overflow-hidden relative">
      <div ref={ mapContainer } className="w-full h-full" />
      <div className="absolute top-0 left-0 right-0 z-10">
        <section>
          <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <form
              id="search-form"
              className="max-w-xl mx-auto"
              // onSubmit={ }
            >
              <div className="relative">  
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 z-10 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="start_location"
                  ref={ startboxref }
                  // value={  }
                  className="w-full p-4 ps-10 pe-16 text-sm text-gray-800 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none placeholder-gray-800"
                  placeholder="Search for places"
                  required
                  onChange={ handleSearchInputChange }
                />
                <button
                  type="submit"
                  className="text-gray-800 absolute end-2.5 bottom-2.5 bg-gray-700/5 backdrop-blur-md hover:bg-white/20 focus:outline-none font-medium rounded-md text-sm px-4 py-2"
                >
                  Go
                </button>
              </div>
              <ul
                className={`mt-4 w-full space-y-1 list-none list-inside ${
                  autocompleteResults.length === 0 ? "hidden" : ""
                }`}
                id="suggestions"
                ref={suggestionsRef}
              >
                {autocompleteResults.map((place, index) => (
                  <li
                    key={index}
                    className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/50 rounded-md cursor-pointer text-gray-800 text-start break-word"
                    onClick={() => handlesuggestionstart(place)}
                  >
                    {place.description}
                  </li>
                ))}
              </ul>
            </form>
            {/* <form
              id="search-form"
              className="max-w-xl mx-auto"
              onSubmit={ handleFormSubmit }
            >
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 z-10 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="search-box"
                  ref={searchBoxRef}
                  className="w-full p-4 ps-10 pe-16 text-sm text-gray-800 rounded-lg bg-white/10 backdrop-blur-md focus:outline-none placeholder-gray-800"
                  placeholder="Search for places"
                  required
                  onChange={handleSearchInputChange}
                />
                <button
                  type="submit"
                  className="text-gray-800 absolute end-2.5 bottom-2.5 bg-gray-700/5 backdrop-blur-md hover:bg-white/20 focus:outline-none font-medium rounded-md text-sm px-4 py-2"
                >
                  Go
                </button>
              </div>
              <ul
                className={`mt-4 w-full space-y-1 list-none list-inside ${
                  autocompleteResults.length === 0 ? "hidden" : ""
                }`}
                id="suggestions"
                ref={suggestionsRef}
              >
                {autocompleteResults.map((place, index) => (
                  <li
                    key={index}
                    className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/50 rounded-md cursor-pointer text-gray-800 text-start break-word"
                    onClick={() => handleSuggestionClick(place)}
                  >
                    {place.description}
                  </li>
                ))}
              </ul>
            </form> */}
          </div>
        </section>
      </div>
      {/* <DistanceDuration distance={distance} duration={duration} />
      <RecenterButton handleRecenter={handleRecenter} /> */}
    </div>
    </>
  );
}
