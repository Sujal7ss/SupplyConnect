import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { DateTimePicker } from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function OrderBooking() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [orderTime, setOrderTime] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Replace the URL with your API endpoint
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/book-ride`, {
        pickupLocation,
        dropoffLocation,
        weight,
        size,
        type,
        orderTime,
      });
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
      <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
        {/* Row 1: Pickup and Dropoff Input Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-800">
              Pickup Location
            </label>
            <input
              type="text"
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
            />
          </div>
          <div>
            <label htmlFor="dropoffLocation" className="block text-sm font-medium text-gray-800">
              Dropoff Location
            </label>
            <input
              type="text"
              id="dropoffLocation"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              required
              className="mt-2 block w-full border-2 border-gray-300 rounded-lg shadow-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 px-4 py-2 transition ease-in-out duration-150"
            />
          </div>
        </div>

        {/* Row 2: Map Component Placeholder */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800">
            Map for Location Selection
          </label>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600">
            {/* Replace this div with your map component */}
            <p>Select pickup and dropoff locations on the map.</p>
          </div>
        </div>

        {/* Row 3: Order Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
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
              style={{ minWidth: '0', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
        {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 transition ease-in-out duration-150"
        >
          {loading ? "Booking..." : "Book Ride"}
        </button>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}
