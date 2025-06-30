import React, { useEffect, useRef } from 'react';

// Mock Map component (would use a real map library like Mapbox or Google Maps in production)
const Map = ({ 
  locations = [], 
  route = null, 
  center = { lat: 37.0902, lng: -95.7129 }, // USA center
  zoom = 4,
  height = '400px',
  showCurrentLocation = false,
  className = ''
}) => {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // This is a mock implementation
    // In a real application, you would initialize the map library here
    
    // For demonstration purposes, let's just add a background and some markers
    if (mapRef.current) {
      mapRef.current.innerHTML = '';
      
      // Add location markers
      locations.forEach((location, index) => {
        const marker = document.createElement('div');
        marker.className = 'absolute w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold -translate-x-1/2 -translate-y-1/2 border-2 border-white';
        marker.style.left = `${Math.random() * 80 + 10}%`;
        marker.style.top = `${Math.random() * 80 + 10}%`;
        marker.innerHTML = String(index + 1);
        
        // Add tooltip
        marker.setAttribute('title', location.address || 'Location marker');
        
        mapRef.current.appendChild(marker);
      });
      
      // Add current location marker if needed
      if (showCurrentLocation) {
        const currentMarker = document.createElement('div');
        currentMarker.className = 'absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pulse border-2 border-white';
        currentMarker.style.left = '50%';
        currentMarker.style.top = '50%';
        
        // Add pulse animation
        const pulse = document.createElement('div');
        pulse.className = 'absolute w-12 h-12 bg-red-500 rounded-full opacity-30 animate-ping';
        currentMarker.appendChild(pulse);
        
        const icon = document.createElement('div');
        icon.className = 'w-3 h-3 bg-white rounded-full';
        currentMarker.appendChild(icon);
        
        mapRef.current.appendChild(currentMarker);
      }
      
      // Add route path
      if (route) {
        const path = document.createElement('div');
        path.className = 'absolute border-4 border-dashed border-blue-500 rounded-lg';
        path.style.width = '70%';
        path.style.height = '40%';
        path.style.left = '15%';
        path.style.top = '30%';
        path.style.zIndex = '-1';
        
        mapRef.current.appendChild(path);
      }
    }
  }, [locations, route, center, zoom, showCurrentLocation]);
  
  return (
    <div 
      ref={mapRef}
      className={`relative bg-blue-50 rounded-lg overflow-hidden ${className}`}
      style={{ 
        height, 
        backgroundImage: 'url(https://images.pexels.com/photos/355931/pexels-photo-355931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8
      }}
    >
      {/* Map content will be added here dynamically */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-20"></div>
      <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md text-xs font-medium shadow-md">
        Demo Map - In production, this would use Mapbox or Google Maps
      </div>
    </div>
  );
};

export default Map;