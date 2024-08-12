import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
  // Import the OlaMapsClient SDK
  import OlaMapsClient from 'ola-map-sdk';
import MapLibreMap, { Marker, NavigationControl } from "maplibre-gl";  // Import necessary classes from MapLibre

export const MapContext = createContext({});

export const MapPr = ({ children }) => {
  const [map, setMap] = useState(null);
  const [styleURL, setStyleURL] = useState(null);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [userLocation, setUserLocation] = useState({ lng: null, lat: null });
  const mapContainer = useRef(null);
  const searchBoxRef = useRef(null);
  const suggestionsRef = useRef(null);
  const [usermarker, setusermarker] = useState(null);
  const API_KEY = "Bkd1aAL6DtnBj1HCOLNaoHew2KQw4QNfJlRZFrKb"
  const transformRequest = useCallback((url, resourceType) => {
    url = url.replace("app.olamaps.io", "api.olamaps.io");
    const separator = url.includes("?") ? "&" : "?";
    return {
      url: `${url}${separator}api_key=${API_KEY}`,
      resourceType
    };
  }, []);

  useEffect(() => {
    const client = new OlaMapsClient(API_KEY);
    const fetchStyleURL = async () => {
      try {
        const styleURL = `https://api.olamaps.io/tiles/vector/v1/styles/${STYLE_NAME}/style.json`;
        setStyleURL(styleURL);
      } catch (error) {
        console.error('Error fetching style URL:', error);
      }
    };

    fetchStyleURL();
  }, []);

  const getuserlocation = (newMap) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation({ lng: longitude, lat: latitude });
          const m = new Marker({ color: "#F30000", draggable: true })
            .setLngLat([longitude, latitude])
            .addTo(newMap);
          setusermarker(m);
          newMap.flyTo({ center: [longitude, latitude], zoom: 14 });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Device does not contain live location service");
    }
  };

  useEffect(() => {
    if (!styleURL) return;

    const newMap = new MapLibreMap({
      container: mapContainer.current,
      style: styleURL,
      center: [0, 0],
      zoom: 2,
      transformRequest,
    });

    newMap.addControl(new NavigationControl({ visualizePitch: false, showCompass: true }), "bottom-left");

    newMap.on("load", () => {
      getuserlocation(newMap);
    });

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, [styleURL, transformRequest]);

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleAutocomplete = useCallback(debounce(async (query) => {
    const client = new OlaMapsClient(API_KEY);
    try {
      const result = await client.places.autocomplete(query);
      setAutocompleteResults(result.predictions || []);
    } catch (error) {
      console.error('Error during autocomplete:', error);
    }
  }, 300), [map]);

  const handleSearchInputChange = (e) => {
    const query = e.target.value.trim();
    if (query.length > 0) {
      handleAutocomplete(query);
    } else {
      setAutocompleteResults([]);
    }
  };

  const handleSuggestionClick = (place, type) => {
    searchBoxRef.current.value = place.description;
    if (type === 'start') {
      if (startMarker) startMarker.remove();
      const { lat, lng } = place.geometry.location;
      const newMarker = new Marker({ color: "#00F" }).setLngLat([lng, lat]).addTo(map);
      setStartMarker(newMarker);
    } else {
      if (endMarker) endMarker.remove();
      const { lat, lng } = place.geometry.location;
      const newMarker = new Marker({ color: "#F00" }).setLngLat([lng, lat]).addTo(map);
      setEndMarker(newMarker);
    }
    setAutocompleteResults([]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
            overview: 'full',
            language: 'en',
            traffic_metadata: true
          }
        );

        setDistance(`${result.routes[0].legs[0].readable_distance} km`);
        setDuration(`${result.routes[0].legs[0].readable_duration}`);

        const stepsArray = result.routes[0].legs[0].steps;
        let routeCoordinates = stepsArray.map(step => [step.end_location.lng, step.end_location.lat]);
        routeCoordinates.push([endLngLat.lng, endLngLat.lat]);

        if (map.isStyleLoaded()) {
          if (map.getLayer('route')) {
            map.removeLayer('route');
            map.removeSource('route');
          }

          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: routeCoordinates
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#FF0000',
              'line-width': 4
            }
          });

          const bounds = new mapboxgl.LngLatBounds();
          routeCoordinates.forEach(coord => bounds.extend(coord));
          map.fitBounds(bounds, { padding: 50 });
        }

      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    }
  };

  const handleRecenter = () => {
    if (map && userLocation) {
      map.flyTo({ center: [userLocation.lng, userLocation.lat], zoom: 14 });
    }
  };

  return (
    <MapContext.Provider
      value={{
        map,
        styleURL,
        autocompleteResults,
        distance,
        duration,
        startMarker,
        endMarker,
        userLocation,
        mapContainer,
        searchBoxRef,
        suggestionsRef,
        usermarker,
        handleSearchInputChange,
        handleSuggestionClick,
        handleFormSubmit,
        handleRecenter,
        getuserlocation
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  return useContext(MapContext);
};
