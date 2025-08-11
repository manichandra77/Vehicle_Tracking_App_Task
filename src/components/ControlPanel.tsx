import React from 'react';
import { Play, Pause, RotateCcw, Gauge } from 'lucide-react';

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPlaying,
  speed,
  onPlayPause,
  onReset,
  onSpeedChange
}) => {
  const speedOptions = [
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 4, label: '4x' }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/50 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Gauge className="w-5 h-5 text-blue-500" />
        Vehicle Controls
      </h3>
      
      <div className="flex flex-wrap items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={onPlayPause}
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Play
            </>
          )}
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Speed:</span>
          <div className="flex gap-1">
            {speedOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSpeedChange(option.value)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  speed === option.value
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;