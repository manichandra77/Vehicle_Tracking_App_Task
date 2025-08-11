import React, { useState, useEffect } from 'react';
import VehicleMap from './components/VehicleMap';
import ControlPanel from './components/ControlPanel';
import MetadataPanel from './components/MetadataPanel';
import HelpPanel from './components/HelpPanel';
import { Navigation, MapPin } from 'lucide-react';

interface RoutePoint {
  latitude: number;
  longitude: number;
  timestamp: string;
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentPosition, setCurrentPosition] = useState<RoutePoint | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  // Load total points for progress calculation
  useEffect(() => {
    const loadTotalPoints = async () => {
      try {
        const response = await fetch('/dummy-route.json');
        const data: RoutePoint[] = await response.json();
        setTotalPoints(data.length);
        setCurrentPosition(data[0]);
      } catch (error) {
        console.error('Error loading route data:', error);
      }
    };

    loadTotalPoints();
  }, []);

  // Update elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;
        
        setElapsedTime(
          `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, startTime]);

  const handlePlayPause = () => {
    if (!isPlaying && !startTime) {
      setStartTime(new Date());
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
    setStartTime(null);
    setElapsedTime('00:00:00');
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handlePositionUpdate = (point: RoutePoint, index: number) => {
    setCurrentPosition(point);
    setCurrentIndex(index);
  };

  const handleComplete = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Navigation className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Vehicle Tracking System
              </h1>
              <p className="text-blue-200 text-sm">
                Real-time vehicle movement simulation
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3 h-[500px] lg:h-[600px]">
            <VehicleMap
              isPlaying={isPlaying}
              speed={speed}
              onPositionUpdate={handlePositionUpdate}
              onComplete={handleComplete}
            />
          </div>

          {/* Control and Metadata Panel */}
          <div className="lg:col-span-1 space-y-6">
            <ControlPanel
              isPlaying={isPlaying}
              speed={speed}
              onPlayPause={handlePlayPause}
              onReset={handleReset}
              onSpeedChange={handleSpeedChange}
            />

            <MetadataPanel
              currentPosition={currentPosition}
              currentIndex={currentIndex}
              totalPoints={totalPoints}
              speed={speed}
              elapsedTime={elapsedTime}
            />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <MapPin className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold">Total Waypoints</h3>
            <p className="text-2xl font-bold text-blue-400">{totalPoints}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <h3 className="text-white font-semibold">Current Point</h3>
            <p className="text-2xl font-bold text-emerald-400">{currentIndex + 1}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center text-white font-bold">
              {speed}x
            </div>
            <h3 className="text-white font-semibold">Simulation Speed</h3>
            <p className="text-2xl font-bold text-orange-400">{speed}x Normal</p>
          </div>
        </div>
      </main>
      
      {/* Help Panel */}
      <HelpPanel />
    </div>
  );
}

export default App;