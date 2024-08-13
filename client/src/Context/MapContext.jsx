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
// import DistanceDuration from "./components/DistanceDuration";
// import RecenterButton from "./components/RecenterButton";
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
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [startAddress , setstartaddress] = useState(null);
  const [endAddress , setendAddress] = useState(null);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [DropLocation, setDropLocation] = useState({
    latitude: null,
    longitude: null,
  });
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
  const reverseGeo = useCallback(async () => {
    try {
      const { latitude, longitude } = startMarker;
      console.log("hi", latitude, longitude);
      const lat = latitude;
      const lng = longitude;

      const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${API_KEY}`;

      await axios
        .get(url)
        .then((response) => {
          console.log(response.data.results[0].address_components[2].long_name);
          console.log(response.data.results[0].formatted_address);
          setCityName(response.data.results[0].address_components[2].long_name);
          setReverseGeoValue(response.data.results[0].formatted_address);
        })
        .catch((error) => {
          console.error("Error during reverse geocoding:", error);
        });
    } catch (error) {
      console.error("Error during reverse geocoding:", error);
    }
  }, [startMarker]);


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
      const m = new Marker({ color: "#F30000", draggable: true });
      geolocate.on("geolocate", (event) => {
        const userLocation = { latitude: event.coords.latitude, longitude: event.coords.longitude };
        setUserLocation(userLocation);
        setStartMarker(userLocation);
        m.setLngLat([event.coords.longitude, event.coords.latitude]).addTo(newMap);
        setUserMarker(m);
        newMap.flyTo({ center: [event.coords.longitude, event.coords.latitude], zoom: 14 });
        m.on("dragend", () => {
          const lngLat = m.getLngLat();
          setStartMarker({ latitude: lngLat.lat, longitude: lngLat.lng });
          newMap.flyTo({ center: [startMarker.longitude, startMarker.latitude], zoom: 14 });
      reverseGeo();
        });
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
  const handleSearchInputChange = (e) => {
    e.preventDefault();
    const query = e.target.value.trim();
    if (query.length > 0) {
      handleAutocomplete(query);
    } else {
      setAutocompleteResults([]);
      if (userMarker){
        userMarker.remove();
      } 
      const newMarker = new Marker({ color: "#F30000", draggable: true })
        .setLngLat([userLocation.longitude, userLocation.latitude])
        .addTo(map);
      setUserMarker(newMarker);
    }
  };

  const handlesuggestionstart = (place) => {
    startboxref.current.value = place.description;
      if (userMarker){
        // console.log(startMarker);
        // setStartMarker(null);
        userMarker.remove();
      } 
      const { lat, lng } = place.geometry.location;
      const newMarker = new Marker({ color: "#00F", draggable: true })
        .setLngLat([lng, lat])
        .addTo(map);
      setUserMarker(newMarker);
      console.log(place.description);
      setstartaddress(place.description);
    setAutocompleteResults([]);
  };
  const handlesuggestionend = (place) => {
    endboxref.current.value = place.description;
    if(endMarker) endMarker.remove();
      const { lat, lng } = place.geometry.location;
      const newMarker = new Marker({ color: "#F00", draggable: true })
        .setLngLat([lng, lat])
        .addTo(map);
      setEndMarker(newMarker);
      setendAddress(place);
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
            overview: "full",
            language: "en",
            traffic_metadata: true,
          }
        );

        setDistance(`${result.routes[0].legs[0].readable_distance} km`);
        setDuration(`${result.routes[0].legs[0].readable_duration}`);

        const stepsArray = result.routes[0].legs[0].steps;
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

  const handleRecenter = () => {
    if (map && userLocation) {
      map.flyTo({ center: [userLocation.longitude, userLocation.latitude], zoom: 14 });
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
        startboxref,
        endboxref,
        suggestionsRef,
        userMarker,
        reverseGeoValue,
        startAddress,
        endAddress,
        handleSearchInputChange,
        handlesuggestionstart,
        handlesuggestionend,
        handleFormSubmit,
        handleRecenter,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapp = () => {
  return useContext(MapContext);
};


