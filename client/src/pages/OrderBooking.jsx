import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DateTimePicker } from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "maplibre-gl/dist/maplibre-gl.css";
import { useMapp } from "../Context/MapContext";

export default function OrderBooking() {
  const {
    mapContainer,
    searchBoxRef,
    handleSearchInputChange,
    autocompleteResults,
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


  useEffect(()=>{
    console.log(reversegeovalue);
    changepickupvalue.current.value = reversegeovalue;
  },[pickupLocation]);

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
    <div className="flex flex-col items-center justify-center w-full max-w-4xl p-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Create Order</h1>
      <form onSubmit={handleFormSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Pickup Location */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Pickup Details</h2>
          <div className="relative">
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-800">
              Pickup Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              // onChange={handleSearchInputChange}
              required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
              ref={changepickupvalue}
            />
            {/* <ul
              className={`absolute left-0 right-0 mt-1 w-full space-y-1 list-none list-inside bg-white shadow-lg rounded-md ${
                autocompleteResults.length === 0 ? "hidden" : ""
              }`}
              id="suggestions"
              ref={ suggestionsRef }
            >
              {autocompleteResults.map((place, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-blue-50 rounded-md cursor-pointer text-gray-800 text-start break-word"
                  onClick={() => handleSuggestionClick(place, "start")}
                >
                  {place.description}
                </li>
              ))}
            </ul> */}
          </div>
        </div>

        {/* Dropoff Location */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Dropoff Details</h2>
          <div className="relative">
            <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-800">
              Dropoff Location
            </label>
            <div className="flex">
            <input
              type="search"
              id="dropoffLocation"
              value={dropoffLocation}
              onChange={handleSearchInputChange}
              required
              className="mt-2 block  border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
              ref={searchBoxRef}
            />
            <button
                  type="submit"
                >
                  go
                </button>
            </div>
            <ul
              className={`absolute left-0 right-0 mt-1 space-y-1 list-none list-inside bg-white shadow-lg rounded-md ${
                autocompleteResults.length === 0 ? "hidden" : ""
              }`}
              id="suggestions"
              ref={suggestionsRef}
            >
              {autocompleteResults.map((place, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-blue-50 rounded-md cursor-pointer text-gray-800 text-start break-word"
                  onClick={() => handleSuggestionClick(place, "end")}
                >
                  {place.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Map Component */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800">
            Map for Location Selection
          </label>
          <div
            className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600"
            ref={mapContainer}
          ></div>
        </div>
        </form>
        <form action="">

        
        {/* Order Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-800">
                Weight
              </label>
              <input
                type="text"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-800">
                Size
              </label>
              <input
                type="text"
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-800">
                Type
              </label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
              />
            </div>
            <div>
              <label htmlFor="orderTime" className="block text-sm font-medium text-gray-800">
                Time
              </label>
              <DateTimePicker
                id="orderTime"
                value={orderTime}
                onChange={setOrderTime}
                className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md bg-gray-100 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
                style={{ minWidth: "0", boxSizing: "border-box" }}
              />
            </div>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 transition ease-in-out duration-150"
        >
          {loading ? "Creating..." : "Create Order"}
        </button>

        {/* Back to Home Link */}
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}
