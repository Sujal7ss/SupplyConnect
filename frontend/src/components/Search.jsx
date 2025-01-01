import React from "react";
import { useMap } from "../hooks/MapProvider";

const SearchComponent = () => {
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

  return (
    <div>
      <input
        ref={startboxref}
        id="start_location"
        placeholder="Enter start location"
        onChange={handleSearchInputChange}
      />
      <input
        ref={endboxref}
        id="end_location"
        placeholder="Enter end location"
        onChange={handleSearchInputChange}
      />

      {/* Autocomplete suggestions */}
      <ul ref={suggestionsRef}>
        {autocompleteResults.map((result, index) => (
          <li
            key={index}
            onClick={() =>
              startboxref.current.id === "start_location"
                ? handlesuggestionstart(result)
                : handlesuggestionend(result)
            }
          >
            {result.description}
          </li>
        ))}
      </ul>

      <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
    </div>
  );
};

export default SearchComponent;
