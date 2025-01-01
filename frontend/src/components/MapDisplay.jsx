import React from "react";
import { useMap } from "../hooks/MapProvider";

const MapDisplay = () => {
  const { mapContainer } = useMap();

  return <div ref={mapContainer} style={{ width: "60%", height: "300px" }} />;
};

export default MapDisplay;
