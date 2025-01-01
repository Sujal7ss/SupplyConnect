import React from "react";
import { useMap } from "../hooks/MapProvider";

const RouteForm = () => {
  const { handleFormSubmit } = useMap();

  return (
    <form onSubmit={handleFormSubmit}>
      <button type="submit">Get Directions</button>
    </form>
  );
};

export default RouteForm;
