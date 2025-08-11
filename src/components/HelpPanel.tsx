import React, { useState } from 'react';
import { HelpCircle, X, Play, Pause, RotateCcw, Gauge, MapPin, Clock, Zap } from 'lucide-react';

const HelpPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        title="Help & Instructions"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Help Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">How to Use Vehicle Tracker</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Start */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🚀 Quick Start</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Click the <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"><Play className="w-3 h-3" />Play</span> button to start the simulation</li>
                  <li>Watch the vehicle move along the predefined route on the map</li>
                  <li>Use speed controls to adjust simulation speed (0.5x to 4x)</li>
                  <li>Click <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm"><Pause className="w-3 h-3" />Pause</span> to pause or <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm"><RotateCcw className="w-3 h-3" />Reset</span> to restart</li>
                </ol>
              </section>

              {/* Control Panel */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-blue-500" />
                  Control Panel
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Play className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Play/Pause Button</p>
                      <p className="text-sm text-blue-700">Start or pause the vehicle movement simulation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <RotateCcw className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Reset Button</p>
                      <p className="text-sm text-gray-700">Reset vehicle to starting position and clear elapsed time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-4 h-4 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">2x</div>
                    <div>
                      <p className="font-medium text-orange-900">Speed Controls</p>
                      <p className="text-sm text-orange-700">Adjust simulation speed: 0.5x (slow) to 4x (fast)</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Live Data Panel */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  Live Data Panel
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Current Position</p>
                      <p className="text-sm text-blue-700">Real-time latitude and longitude coordinates</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-900">Timestamp</p>
                      <p className="text-sm text-emerald-700">Current time from the route data</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <Zap className="w-4 h-4 text-orange-600" />
                    <div>
                      <p className="font-medium text-orange-900">Speed</p>
                      <p className="text-sm text-orange-700">Calculated vehicle speed in km/h</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Map Features */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🗺️ Map Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mb-2"></div>
                    <p className="font-medium text-gray-900">Vehicle Marker</p>
                    <p className="text-sm text-gray-600">Blue dot showing current vehicle position</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-1 bg-blue-500 mb-2"></div>
                    <p className="font-medium text-gray-900">Completed Route</p>
                    <p className="text-sm text-gray-600">Blue line showing path already traveled</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-1 bg-gray-400 border-dashed border-t-2 border-gray-400 mb-2"></div>
                    <p className="font-medium text-gray-900">Full Route</p>
                    <p className="text-sm text-gray-600">Dashed gray line showing complete route</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="w-4 h-4 bg-green-500 rounded mb-2"></div>
                    <p className="font-medium text-gray-900">Interactive Map</p>
                    <p className="text-sm text-gray-600">Zoom and pan to explore the area</p>
                  </div>
                </div>
              </section>

              {/* Tips */}
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Tips</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Use higher speeds (2x, 4x) to quickly see the complete route</li>
                  <li>The progress bar shows how much of the route is completed</li>
                  <li>Elapsed time tracks how long the simulation has been running</li>
                  <li>The map automatically fits the route when first loaded</li>
                  <li>You can zoom and pan the map while the simulation is running</li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">
                Need more help? The interface is intuitive - just start with the Play button! 🚗
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpPanel;