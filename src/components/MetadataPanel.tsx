import React from 'react';
import { MapPin, Clock, Zap, Navigation } from 'lucide-react';

interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface MetadataPanelProps {
  currentPosition: RoutePoint | null;
  currentIndex: number;
  totalPoints: number;
  speed: number;
  elapsedTime: string;
}

const MetadataPanel: React.FC<MetadataPanelProps> = ({
  currentPosition,
  currentIndex,
  totalPoints,
  speed,
  elapsedTime
}) => {
  const formatCoordinate = (coord: number) => coord.toFixed(6);
  
  const calculateSpeed = () => {
    // Mock speed calculation based on simulation speed
    return (speed * 45).toFixed(1); // Assuming base speed of 45 km/h
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const progress = totalPoints > 0 ? ((currentIndex / (totalPoints - 1)) * 100) : 0;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Navigation className="w-5 h-5 text-emerald-500" />
        Live Data
      </h3>
      
      <div className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Route Progress</span>
            <span className="text-sm font-bold text-gray-800">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {currentIndex + 1} of {totalPoints} points
          </div>
        </div>

        {/* Current Position */}
        {currentPosition && (
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                  Current Position
                </p>
                <p className="text-sm font-mono text-blue-900 truncate">
                  {formatCoordinate(currentPosition.latitude)}, {formatCoordinate(currentPosition.longitude)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
              <Clock className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide">
                  Timestamp
                </p>
                <p className="text-sm font-mono text-emerald-900">
                  {formatTimestamp(currentPosition.timestamp)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
              <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-orange-700 uppercase tracking-wide">
                  Speed
                </p>
                <p className="text-sm font-mono text-orange-900">
                  {calculateSpeed()} km/h
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Elapsed Time */}
        <div className="pt-3 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Elapsed Time
            </p>
            <p className="text-2xl font-mono font-bold text-gray-800 mt-1">
              {elapsedTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataPanel;