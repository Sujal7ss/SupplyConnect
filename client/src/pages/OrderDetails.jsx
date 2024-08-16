import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard.jsx";
import OlaMapsClient from "ola-map-sdk";
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const OrderDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [order, setOrder] = useState(null);
  const [map, setMap] = useState(null);
  const [styleURL, setStyleURL] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const mapContainer = useRef(null);
  const navigate = useNavigate(); // Hook for navigation

  const API_KEY = "Bkd1aAL6DtnBj1HCOLNaoHew2KQw4QNfJlRZFrKb";
  const STYLE_NAME = "default-light-standard";

  // Dummy data for order details
  const dummyOrder = {
    _id: "1",
    pickUpLocation: "Nagpur, Maharashtra",
    deliveryLocation: "Raipur, Chhattisgarh",
    pickup_coordinates: { lng: 79.088216, lat: 21.152413 },
    dropoff_coordinates: { lng: 81.60399, lat: 21.24783 },
    vehicleType: "Truck",
    orderAmount: 250.0,
    orderStatus: "waiting",
  };

  // Fetch style URL
  useEffect(() => {
    const fetchStyleURL = async () => {
      try {
        const styleURL = `https://api.olamaps.io/tiles/vector/v1/styles/${STYLE_NAME}/style.json`;
        setStyleURL(styleURL);
      } catch (error) {
        console.error("Error fetching style URL:", error);
      }
    };

    fetchStyleURL();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!styleURL || !mapContainer.current) return;

    const transformRequest = (url, resourceType) => {
      url = url.replace("app.olamaps.io", "api.olamaps.io");
      const separator = url.includes("?") ? "&" : "?";
      return {
        url: `${url}${separator}api_key=${API_KEY}`,
        resourceType,
      };
    };

    const newMap = new MapLibreMap({
      container: mapContainer.current,
      style: styleURL,
      center: [dummyOrder.pickup_coordinates.lng, dummyOrder.pickup_coordinates.lat],
      zoom: 14,
      transformRequest,
    });

    const startMarker = new Marker({ color: "#F30000" })
      .setLngLat([dummyOrder.pickup_coordinates.lng, dummyOrder.pickup_coordinates.lat])
      .addTo(newMap);
    const endMarker = new Marker({ color: "#F30000" })
      .setLngLat([dummyOrder.dropoff_coordinates.lng, dummyOrder.dropoff_coordinates.lat])
      .addTo(newMap);

    newMap.addControl(new NavigationControl({ visualizePitch: false, showCompass: true }), "bottom-right");

    newMap.on("load", async () => {
      if (startMarker && endMarker) {
        const startLngLat = startMarker.getLngLat();
        const endLngLat = endMarker.getLngLat();

        try {
          const client = new OlaMapsClient(API_KEY);
          const result = await client.routing.getDirections(
            { lat: startLngLat.lat, lon: startLngLat.lng },
            { lat: endLngLat.lat, lon: endLngLat.lng },
            {
              alternatives: true,
              steps: true,
              overview: "full",
              language: "en",
              traffic_metadata: true,
            }
          );

          setDistance(`${result.routes[0].legs[0].readable_distance}`);
          setDuration(`${result.routes[0].legs[0].readable_duration}`);

          const stepsArray = result.routes[0].legs[0].steps;
          let routeCoordinates = stepsArray.map((step) => [
            step.end_location.lng,
            step.end_location.lat,
          ]);
          routeCoordinates.unshift([startLngLat.lng, startLngLat.lat]);
          routeCoordinates.push([endLngLat.lng, endLngLat.lat]);

          addRouteLayer(newMap, routeCoordinates);
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      }
    });

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, [styleURL]);

  // Function to add the route layer to the map
  const addRouteLayer = (mapInstance, routeCoordinates) => {
    if (mapInstance.isStyleLoaded()) {
      if (mapInstance.getLayer("route")) {
        mapInstance.removeLayer("route");
        mapInstance.removeSource("route");
      }

      mapInstance.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF0000",
          "line-width": 4,
        },
      });

      const bounds = mapInstance.getBounds();
      mapInstance.fitBounds(bounds, { padding: 50 });
    }
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // Simulate a successful API response
        setOrder(dummyOrder);
        // const orderResponse = await axios.get(`/api/orders/${id}`);
        // setOrder(orderResponse.data.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <>
      <div className="p-4 space-y-4 w-full">
        {/* Buttons Container */}
        <div className="flex justify-between items-center mb-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>
          {/* Bids Button */}
          <button
            onClick={() => navigate(`/bids/${id}`)} // Navigate to Bids page
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md"
          >
            Bids
          </button>
        </div>

        <div className="flex flex-col space-y-4 mt-4 align-middle items-center h-screen">
          {/* Map Div */}
          <div className="w-11/12 h-80 bg-gray-200 rounded-lg shadow-md">
            <div
              ref={mapContainer}
              className="flex items-center justify-center h-full text-gray-600"
            ></div>
          </div>

          {/* Basic Info Div */}
          <OrderCard order={dummyOrder} />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
