import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";
  // Import the OlaMapsClient SDK
import OlaMapsClient from 'ola-map-sdk';
import { Map as MapLibreMap, NavigationControl, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
// import DistanceDuration from "./components/DistanceDuration";
// import RecenterButton from "./components/RecenterButton";
import mapboxgl from "mapbox-gl";

export const MapContext = createContext({});

export const MapPr = ({ children }) => {
  const [map, setMap] = useState(null);
  const [styleURL, setStyleURL] = useState(null);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const mapContainer = useRef(null);
  const searchBoxRef = useRef(null);
  const suggestionsRef = useRef(null);
  const [usermarker, setusermarker] = useState(null);
  const [reversegeovalue,setreversegeovalue] = useState(null);
  const API_KEY = "Bkd1aAL6DtnBj1HCOLNaoHew2KQw4QNfJlRZFrKb"
  const STYLE_NAME = "default-light-standard";
  const transformRequest = useCallback((url, resourceType) => {
    url = url.replace("app.olamaps.io", "api.olamaps.io");
    const separator = url.includes("?") ? "&" : "?";
    return {
      url: `${url}${separator}api_key=${API_KEY}`,
      resourceType
    };
  }, []);

  useEffect(() => {
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
          const {  latitude , longitude } = position.coords;
          setUserLocation({ latitude: latitude , longitude: longitude});
          const m = new Marker({ color: "#F30000" , draggable : true})
            .setLngLat([longitude, latitude])
            .addTo(newMap);
          setusermarker(m);
        //   map-> longitude ,latitude        

          newMap.flyTo({ center: [longitude, latitude], zoom: 14 });
          m.on('dragend', () => {
            const lngLat = m.getLngLat(); 
            setUserLocation({ latitude: lngLat.lat, longitude: lngLat.lng });
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Device does not contain live location service");
    }
  };
  const reversegeo = useCallback(async () => {
    try {
      const client = new OlaMapsClient(API_KEY);
      const { latitude, longitude } = userLocation;
      console.log(latitude, longitude);
      const lat = latitude;
     const lng = longitude;

        const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${API_KEY}`;

    axios.get(url)
      .then(response => {
        // console.log('Reverse Geocode result:', response.data);
        console.log('Reverse Geocode result:', response.data.results[0].formatted_address);
        setreversegeovalue(response.data.results[0].formatted_address);
      })
      .catch(error => {
        console.error('Error during reverse geocoding:', error);
      });
      
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  }, [userLocation]);
  
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

  useEffect(() => {
    if (userLocation.longitude !== null && userLocation.latitude !== null) {
        reversegeo();
    }
  }, [userLocation, reversegeo]);

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
        reversegeovalue,
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

export const useMapp = () => {
  return useContext(MapContext);
};
