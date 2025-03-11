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
    handleFormSubmit,
  } = useMap();

  console.log(document.activeElement)
  return (
    <div className="w-96 h-36 border-black border-2 rounded-md p-4  gap-4 flex flex-col">
      <form onSubmit={handleFormSubmit}>
        
        <input
          ref={startboxref}
          id="start_location"
          placeholder="Enter start location"
          onChange={handleSearchInputChange}
          className="font-semibold uppercase w-full h-12 p-4 relative hover:-top-1 hover:cursor-pointer hover:drop-shadow-2xl bg-text-secondary text-white rounded-md "
        />
        <input
          ref={endboxref}
          id="end_location"
          placeholder="Enter end location"
          onChange={handleSearchInputChange}
          className="font-semibold uppercase w-full h-12 p-4 relative hover:-top-1 hover:cursor-pointer bg-text-secondary  text-white rounded-md"
        />

        {/* Autocomplete suggestions */}
        <ul
          className={`mt-4 space-y-1 list-none list-inside w-52 ${
            autocompleteResults.length === 0 ? "hidden" : ""
          }`}
          id="suggestions"
          ref={suggestionsRef}
        >
          {autocompleteResults.map((result, index) => (
            <li
              key={index}
              className="p-2 bg-white/10 backdrop-blur-md hover:bg-white/50 rounded-md cursor-pointer text-gray-800 text-start break-word"
              onClick={() =>
                startboxref.current === document.activeElement
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
        <button type="submit">Get Directions</button>
      </form>
    </div>
  );
};

export default SearchComponent;
