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


  // useEffect(()=>{
  //   console.log(reversegeovalue);
  //   changepickupvalue.current.value = reversegeovalue;
  // },[pickupLocation]);

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
    <div ref={mapContainer} className="w-full h-96"></div>
  );
}
