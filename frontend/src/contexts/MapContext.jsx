import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { toast } from "react-toastify";
import OlaMapsClient from "ola-map-sdk";
import {
  Map as MapLibreMap,
  NavigationControl,
  Marker,
  GeolocateControl,
  LngLat,
  LngLatBounds,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const MapContext = createContext({});

export const MapPr = ({ children }) => {
  const [map, setMap] = useState(null);
  const [firstMarker, setFirstMarker] = useState(null);
  const [secondMarker, setSecondMarker] = useState(null);
  const [styleURL, setStyleURL] = useState(null);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startAddress, setStartAddress] = useState(null);
  const [endAddress, setEndAddress] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [activeInput, setActiveInput] = useState(null);

  const mapContainer = useRef(null);
  const startboxref = useRef(null);
  const endboxref = useRef(null);
  const suggestionsRef = useRef(null);
  const [userMarker, setUserMarker] = useState(null);
  const [reverseGeoValue, setReverseGeoValue] = useState(null);
  const [initialZoomDone, setInitialZoomDone] = useState(false);

  const API_KEY = import.meta.env.VITE_OLA_MAP_API;
  const STYLE_NAME = "default-light-standard";

  const transformRequest = useCallback((url, resourceType) => {
    url = url.replace("app.olamaps.io", "api.olamaps.io");
    const separator = url.includes("?") ? "&" : "?";
    return {
      url: `${url}${separator}api_key=${API_KEY}`,
      resourceType,
    };
  }, []);

  useEffect(() => {
    const m = new Marker({ color: "#F30000" });
    setUserMarker(m);
  }, []);

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

  useEffect(() => {
    if (!styleURL) return;

    if (mapContainer.current) {
      const newMap = new MapLibreMap({
        container: mapContainer.current,
        style: styleURL,
        center: [0, 0],
        zoom: 14,
        transformRequest,
      });

      const geolocate = new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showAccuracyCircle: false,
      });
      newMap.addControl(geolocate);

      newMap.addControl(
        new NavigationControl({ visualizePitch: false, showCompass: true }),
        "bottom-right"
      );

      newMap.on("load", () => {
        geolocate.trigger();
        geolocate.on("geolocate", (event) => {
          const userLocation = {
            latitude: event.coords.latitude,
            longitude: event.coords.longitude,
          };
          setUserLocation(userLocation);
          userMarker
            .setLngLat([event.coords.longitude, event.coords.latitude])
            .addTo(newMap);
          setUserMarker(userMarker);

          if (!initialZoomDone) {
            newMap.flyTo({
              center: [event.coords.longitude, event.coords.latitude],
              zoom: 14,
            });
            setInitialZoomDone(true);
          }
        });
      });
      setMap(newMap);
      return () => newMap.remove();
    }
  }, [styleURL, transformRequest, initialZoomDone]);

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleAutocomplete = useCallback(
    debounce(async (query) => {
      const client = new OlaMapsClient(API_KEY);
      try {
        const result = await client.places.autocomplete(query);
        setAutocompleteResults(result.predictions || []);
      } catch (error) {
        console.error("Error during autocomplete:", error);
      }
    }, 300),
    [API_KEY]
  );

  const handleSearchInputChange = useCallback(
    (e) => {
      e.preventDefault();
      const query = e.target.value.trim();
      setActiveInput(e.target.id);
      if (query.length > 0) {
        handleAutocomplete(query);
      } else {
        setAutocompleteResults([]);
        if (map?.getLayer("route")) {
          map.removeLayer("route");
          map.removeSource("route");
        }
        if (e.target.id === "start_location") {
          setStartAddress(null);
          if (firstMarker) firstMarker.remove();
          setFirstMarker(null);
        } else if (e.target.id === "endlocation") {
          setEndAddress(null);
          if (secondMarker) secondMarker.remove();
          setSecondMarker(null);
        }
      }
    },
    [handleAutocomplete, map, firstMarker, secondMarker]
  );

  const reverseGeocode = async (lat, lng) => {
    if (
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      isNaN(lat) ||
      isNaN(lng)
    ) {
      console.error("Invalid coordinates for reverse geocoding:", lat, lng);
      return "Invalid coordinates";
    }

    try {
      const client = new OlaMapsClient(API_KEY);
      const response = await client.places.reverseGeocode({ lat, lon: lng });
      const address = response?.results?.[0]?.formatted_address;
      setReverseGeoValue(address);
      return address || "Unknown address";
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      return "Error fetching address";
    }
  };
  const drawRoute = async (e) => {
    if (e) e.preventDefault();

    if (firstMarker && secondMarker) {
      const startLngLat = firstMarker.getLngLat();
      const endLngLat = secondMarker.getLngLat();

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

        setDistance(result.routes[0].legs[0].readable_distance);
        setDuration(result.routes[0].legs[0].readable_duration);

        const stepsArray = result.routes[0].legs[0].steps;
        const routeCoordinates = [
          [startLngLat.lng, startLngLat.lat],
          ...stepsArray.map((step) => [
            step.end_location.lng,
            step.end_location.lat,
          ]),
          [endLngLat.lng, endLngLat.lat],
        ];

        if (map.isStyleLoaded()) {
          if (map.getLayer("route")) {
            map.removeLayer("route");
            map.removeSource("route");
          }

          map.addLayer({
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

          const bounds = calculateBounds(
            routeCoordinates.map(([lng, lat]) => new LngLat(lng, lat))
          );
          map.fitBounds(bounds, { padding: 50 });
        }
      } catch (error) {
        console.error("Error drawing route:", error);
      }
    } else {
      console.log("Start and end markers must be set.");
    }
  };

  const handlesuggestionstart = (place) => {
    startboxref.current.value = place.description;
    if (userMarker) userMarker.remove();
    if (firstMarker) firstMarker.remove();
    const { lat, lng } = place.geometry.location;
    const newMarker = new Marker({ color: "#00F", draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    newMarker.on("dragend", async () => {
      const lngLat = newMarker.getLngLat();

      if (
        !lngLat ||
        typeof lngLat.lat !== "number" ||
        typeof lngLat.lng !== "number"
      ) {
        console.error("Invalid marker position:", lngLat);
        return;
      }

      const address = await reverseGeocode(lngLat.lat, lngLat.lng);
      startboxref.current.value = address;
      setStartAddress(address);
    });

    map.flyTo({ center: [lng, lat], zoom: 14 });
    setFirstMarker(newMarker);
    setStartAddress(place.description);
    setAutocompleteResults([]);
  };

  const handlesuggestionend = (place) => {
    endboxref.current.value = place.description;
    if (secondMarker) secondMarker.remove();
    const { lat, lng } = place.geometry.location;
    const newMarker = new Marker({ color: "#F00", draggable: true })
      .setLngLat([lng, lat])
      .addTo(map);

    newMarker.on("dragend", async () => {
      const lngLat = newMarker.getLngLat();

      if (
        !lngLat ||
        typeof lngLat.lat !== "number" ||
        typeof lngLat.lng !== "number"
      ) {
        console.error("Invalid marker position:", lngLat);
        return;
      }

      const address = await reverseGeocode(lngLat.lat, lngLat.lng);
      startboxref.current.value = address;
      setStartAddress(address);
    });

    map.flyTo({ center: [lng, lat], zoom: 14 });
    setSecondMarker(newMarker);
    setEndAddress(place.description);
    setAutocompleteResults([]);
  };

  const calculateBounds = (coordinates) => {
    return coordinates.reduce(
      (bounds, coord) => bounds.extend(coord),
      new LngLatBounds(coordinates[0], coordinates[0])
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (firstMarker && secondMarker) {
      const startLngLat = firstMarker.getLngLat();
      const endLngLat = secondMarker.getLngLat();
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

        setDistance(result.routes[0].legs[0].readable_distance);
        setDuration(result.routes[0].legs[0].readable_duration);

        const stepsArray = result.routes[0].legs[0].steps;
        const routeCoordinates = [
          [startLngLat.lng, startLngLat.lat],
          ...stepsArray.map((step) => [
            step.end_location.lng,
            step.end_location.lat,
          ]),
          [endLngLat.lng, endLngLat.lat],
        ];

        if (map.isStyleLoaded()) {
          if (map.getLayer("route")) {
            map.removeLayer("route");
            map.removeSource("route");
          }

          map.addLayer({
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

          const bounds = calculateBounds(
            routeCoordinates.map(([lng, lat]) => new LngLat(lng, lat))
          );
          map.fitBounds(bounds, { padding: 50 });
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    } else {
      console.log("Markers not set");
    }
  };

  return (
    <MapContext.Provider
      value={{
        handleFormSubmit,
        handleSearchInputChange,
        handlesuggestionstart,
        handlesuggestionend,
        suggestionsRef,
        startboxref,
        endboxref,
        distance,
        duration,
        reverseGeoValue,
        mapContainer,
        userLocation,
        setUserLocation,
        startAddress,
        endAddress,
        autocompleteResults,
        firstMarker,
        secondMarker,
        setFirstMarker,
        setSecondMarker,
        activeInput,
        setActiveInput,
        drawRoute 
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapp = () => useContext(MapContext);
