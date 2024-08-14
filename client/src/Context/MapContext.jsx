import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { toast } from "react-toastify";
// Import the OlaMapsClient SDK
import OlaMapsClient from "ola-map-sdk";
import { Map as MapLibreMap, NavigationControl, Marker, GeolocateControl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
import mapboxgl from "mapbox-gl";

export const MapContext = createContext({});

export const MapPr = ({ children }) => {
  const [map, setMap] = useState(null);
  const [firstMarker, setFirstMarker] = useState(null);
  const [secondMarker, setSecondMarker] = useState(null);
  const [styleURL, setStyleURL] = useState(null);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startAddress, setstartaddress] = useState(null);
  const [endAddress, setendAddress] = useState(null);
  const [userLocation, setuserLocation] = useState(null);
  const mapContainer = useRef(null);
  const startboxref = useRef(null);
  const endboxref = useRef(null);
  const suggestionsRef = useRef(null);
  const [userMarker, setUserMarker] = useState(null);
  const [reverseGeoValue, setReverseGeoValue] = useState(null);
  const API_KEY = "Bkd1aAL6DtnBj1HCOLNaoHew2KQw4QNfJlRZFrKb";
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
    const m = new Marker({ color: "#F30000"});
    setUserMarker(m);
  },[])
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

    // Create the map instance first
    const newMap = new MapLibreMap({
      container: mapContainer.current,
      style: styleURL,
      center: [0, 0],
      zoom: 2,
      transformRequest,
    });

    // Add the GeolocateControl after the map is created
    const geolocate = new GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showAccuracyCircle: false,
    });
    newMap.addControl(geolocate);

    // Add the NavigationControl
    newMap.addControl(
      new NavigationControl({ visualizePitch: false, showCompass: true }),
      "bottom-left"
    );

    // Use the map's 'load' event to trigger other actions
    newMap.on("load", () => {
      geolocate.trigger();
      geolocate.on("geolocate", (event) => {
        const userLocation = { latitude: event.coords.latitude, longitude: event.coords.longitude };
        setuserLocation(userLocation);
        userMarker.setLngLat([event.coords.longitude, event.coords.latitude]).addTo(newMap);
        setUserMarker(userMarker);
        newMap.flyTo({ center: [event.coords.longitude, event.coords.latitude], zoom: 14 });
      });
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
    [map]
  );

  const handleSearchInputChange = useCallback((e)=>{
      e.preventDefault();
      const query = e.target.value.trim();
      if (query.length > 0) {
        handleAutocomplete(query);
      } else {
        setAutocompleteResults([]);
        if (e.target.id === "start_location") {
          setstartaddress(null);
          if (firstMarker) firstMarker.remove();
          setFirstMarker(null);
        }
        if (e.target.id === "endlocation") {
          setendAddress(null);
          if (secondMarker) secondMarker.remove();
          setSecondMarker(null);
        }
        if(!(firstMarker || secondMarker)){
          const newMarker = new Marker({ color: "#F30000"})
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .addTo(map);
        setUserMarker(newMarker);
        }
      }
  },[firstMarker,secondMarker,userMarker,startAddress,endAddress]);

  const handlesuggestionstart = (place) => {
    startboxref.current.value = place.description;
    if (userMarker) {
      userMarker.remove();
    }
    const { lat, lng } = place.geometry.location;
    const newMarker = new Marker({ color: "#00F" })
      .setLngLat([lng, lat])
      .addTo(map);
      map.flyTo({ center: [lng, lat], zoom: 14 });
    setFirstMarker(newMarker);
    console.log(place.description);
    setstartaddress(place.description);
    setAutocompleteResults([]);
  };

  const handlesuggestionend = (place) => {
    endboxref.current.value = place.description;
    if (secondMarker) secondMarker.remove();
    const { lat, lng } = place.geometry.location;
    const newMarker = new Marker({ color: "#F00"})
      .setLngLat([lng, lat])
      .addTo(map);
      map.flyTo({ center: [lng, lat], zoom: 14 });
    setSecondMarker(newMarker);
    setendAddress(place.description);
    setAutocompleteResults([]);
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

        setDistance(`${result.routes[0].legs[0].readable_distance} km`);
        setDuration(`${result.routes[0].legs[0].readable_duration}`);

        const stepsArray = result.routes[0].legs[0].steps;
        console.log(stepsArray);
        let routeCoordinates = stepsArray.map((step) => [
          step.end_location.lng,
          step.end_location.lat,
        ]);
        routeCoordinates.push([endLngLat.lng, endLngLat.lat]);

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

          const bounds = new mapboxgl.LngLatBounds();
          routeCoordinates.forEach((coord) => bounds.extend(coord));
          map.fitBounds(bounds, { padding: 50 });
        }
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
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
        setuserLocation,
        startAddress,
        endAddress,
        autocompleteResults
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapp = () => useContext(MapContext);
