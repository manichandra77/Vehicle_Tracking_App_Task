import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface VehicleMapProps {
  isPlaying: boolean;
  speed: number;
  onPositionUpdate: (point: RoutePoint, index: number) => void;
  onComplete: () => void;
}

const VehicleMap: React.FC<VehicleMapProps> = ({ 
  isPlaying, 
  speed, 
  onPositionUpdate, 
  onComplete 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const vehicleMarker = useRef<L.Marker | null>(null);
  const routePolyline = useRef<L.Polyline | null>(null);
  const completedRoute = useRef<L.Polyline | null>(null);
  
  const [routeData, setRouteData] = useState<RoutePoint[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create custom vehicle icon
  const vehicleIcon = L.divIcon({
    className: 'custom-vehicle-marker',
    html: `
      <div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
        <div class="w-2 h-2 bg-white rounded-full"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  // Load route data
  useEffect(() => {
    const loadRouteData = async () => {
      try {
        const response = await fetch('/dummy-route.json');
        const data: RoutePoint[] = await response.json();
        setRouteData(data);
      } catch (error) {
        console.error('Error loading route data:', error);
      }
    };

    loadRouteData();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !routeData.length) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    // Create map centered on the first point
    const map = L.map(mapRef.current).setView(
      [routeData[0].latitude, routeData[0].longitude], 
      15
    );

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create complete route polyline (light gray)
    const allCoords = routeData.map(point => [point.latitude, point.longitude] as [number, number]);
    const fullRoute = L.polyline(allCoords, {
      color: '#9CA3AF',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10'
    }).addTo(map);

    // Create completed route polyline (blue)
    const completedRoutePolyline = L.polyline([], {
      color: '#3B82F6',
      weight: 4,
      opacity: 0.9
    }).addTo(map);

    // Create vehicle marker
    const marker = L.marker(
      [routeData[0].latitude, routeData[0].longitude],
      { icon: vehicleIcon }
    ).addTo(map);

    // Fit map to route bounds
    map.fitBounds(fullRoute.getBounds(), { padding: [20, 20] });

    mapInstance.current = map;
    vehicleMarker.current = marker;
    routePolyline.current = fullRoute;
    completedRoute.current = completedRoutePolyline;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [routeData]);

  // Handle movement animation
  useEffect(() => {
    if (!isPlaying || !routeData.length || !vehicleMarker.current) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const moveVehicle = () => {
      if (currentIndex >= routeData.length - 1) {
        onComplete();
        return;
      }

      const nextIndex = currentIndex + 1;
      const currentPoint = routeData[currentIndex];
      const nextPoint = routeData[nextIndex];

      // Smooth animation between points
      const steps = 10;
      let step = 0;

      const animateStep = () => {
        if (!vehicleMarker.current || !completedRoute.current) return;

        step++;
        const progress = step / steps;

        // Interpolate position
        const lat = currentPoint.latitude + (nextPoint.latitude - currentPoint.latitude) * progress;
        const lng = currentPoint.longitude + (nextPoint.longitude - currentPoint.longitude) * progress;

        vehicleMarker.current.setLatLng([lat, lng]);

        if (progress >= 1) {
          // Update completed route
          const completedCoords = routeData.slice(0, nextIndex + 1).map(
            point => [point.latitude, point.longitude] as [number, number]
          );
          completedRoute.current.setLatLngs(completedCoords);

          setCurrentIndex(nextIndex);
          onPositionUpdate(nextPoint, nextIndex);
        } else {
          setTimeout(animateStep, (1000 / speed) / steps);
        }
      };

      animateStep();
    };

    intervalRef.current = setInterval(moveVehicle, 1000 / speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, currentIndex, routeData, onPositionUpdate, onComplete]);

  // Reset position
  useEffect(() => {
    if (!isPlaying && currentIndex === 0 && vehicleMarker.current && completedRoute.current) {
      vehicleMarker.current.setLatLng([routeData[0]?.latitude || 0, routeData[0]?.longitude || 0]);
      completedRoute.current.setLatLngs([]);
    }
  }, [isPlaying, currentIndex, routeData]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-md rounded-lg px-3 py-2">
        <p className="text-white text-sm font-medium">
          Live Vehicle Tracking
        </p>
      </div>
    </div>
  );
};

export default VehicleMap;