/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useMap } from "../hooks/MapProvider";

import SearchComponent from "./Search";
import MapDisplay from "./MapDisplay"
import RouteForm from "./RouteForm";
function Dashboard() {
  const {
    handleSearchInputChange,
    suggestionsRef,
    startboxref,
    endboxref,
    handlesuggestionstart,
    handlesuggestionend,
    distance,
    duration,
    autocompleteResults,
  } = useMap();
  const { user } = useAuth();
  return (
    <div>
      <SearchComponent />
      <MapDisplay />
      <RouteForm />

    </div>
  );
}

export default Dashboard;
