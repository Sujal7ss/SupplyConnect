/* eslint-disable no-unused-vars */
import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useMap } from "../hooks/MapProvider";
import SupplierNavbar from "./SupplierNavbar.jsx";
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
      <SupplierNavbar />

    </div>
  );
}

export default Dashboard;
