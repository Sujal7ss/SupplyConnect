import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MapDisplay from "../components/MapDisplay";
import SearchComponent from "../components/Search";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMap } from "../hooks/MapProvider";

function CreateOrder() {
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
  } = useMap();

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
  // const { isLoggedIn } = useAuth();

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
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/book-ride`,
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
    <div className="flex flex-row justify-around p-5">
      <MapDisplay />
      <SearchComponent />
    </div>
  );
}

export default CreateOrder;
