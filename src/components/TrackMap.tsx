
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Clock, Thermometer, Droplets } from 'lucide-react';
import { trackData } from '../utils/telemetryData';
import { useEntranceAnimation } from '../utils/animations';

const TrackMap: React.FC = () => {
  const [carPosition, setCarPosition] = useState(67); // Track position (0-100%)
  const isVisible = useEntranceAnimation(400);
  
  // Update car position
  useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition(prev => {
        const newPos = prev + 0.5;
        return newPos > 100 ? 0 : newPos;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-20 px-6" id="track">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Track Map</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Live position tracking and circuit information</p>
        </div>
        
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
          <div className="lg:col-span-2 glass-panel relative overflow-hidden min-h-[400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Silverstone_Circuit_2020.png/800px-Silverstone_Circuit_2020.png" 
                alt="Silverstone Circuit"
                className="w-full h-full object-contain opacity-70 p-8"
              />
              
              {/* Car indicator on the track */}
              <div 
                className="absolute w-4 h-4 bg-racing-red rounded-full shadow-lg shadow-racing-red/30 z-10 animate-pulse"
                style={{ 
                  left: `calc(${getXPosition(carPosition)}% - 6px)`, 
                  top: `calc(${getYPosition(carPosition)}% - 6px)` 
                }}
              ></div>
              
              {/* Track progress line */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d={getTrackPath()} 
                  stroke="rgba(255,255,255,0.2)" 
                  strokeWidth="1.5" 
                  fill="none" 
                />
                <path 
                  d={getTrackPathSegment(carPosition)} 
                  stroke="rgba(255,10,71,0.8)" 
                  strokeWidth="1.5" 
                  fill="none" 
                />
              </svg>
            </div>
            
            <div className="absolute top-4 left-4 glass-panel-dark p-3 text-sm">
              <div className="flex items-center space-x-2 mb-1">
                <MapPin size={16} className="text-racing-red" />
                <span className="font-medium text-white">{trackData.name}</span>
              </div>
              <div className="text-xs text-white/60">{trackData.length} • {trackData.turns} Turns</div>
            </div>
            
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <div className="glass-panel-dark p-2 text-xs text-white/80 flex items-center">
                <Clock size={14} className="mr-1 text-racing-accent" /> 
                <span>Lap Record: {trackData.recordLap}</span>
              </div>
              <div className="glass-panel-dark p-2 text-xs text-white/80 flex items-center">
                <Navigation size={14} className="mr-1 text-racing-accent" /> 
                <span>Sector {getCurrentSector(carPosition)}/3</span>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-6">
            <h3 className="text-lg font-medium text-white/80 mb-6">Track Information</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Length</div>
                  <div className="text-lg font-medium text-white">{trackData.length}</div>
                </div>
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Turns</div>
                  <div className="text-lg font-medium text-white">{trackData.turns}</div>
                </div>
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Sectors</div>
                  <div className="text-lg font-medium text-white">{trackData.sectors}</div>
                </div>
                <div className="bg-white/5 rounded p-3 border border-white/10">
                  <div className="text-xs text-white/60 mb-1">Lap Record</div>
                  <div className="text-lg font-medium text-racing-accent">{trackData.recordLap}</div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded p-4 border border-white/10">
                <h4 className="text-sm font-medium text-white/80 mb-3">Current Weather</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-3">
                      {trackData.weather.includes("Cloud") ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                          <path d="M17.5 19a4.5 4.5 0 1 0 0-9h-1.8A7 7 0 1 0 4 15.5V18a2 2 0 0 0 2 2h12.5Z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2" />
                          <path d="M12 20v2" />
                          <path d="m4.93 4.93 1.41 1.41" />
                          <path d="m17.66 17.66 1.41 1.41" />
                          <path d="M2 12h2" />
                          <path d="M20 12h2" />
                          <path d="m6.34 17.66-1.41 1.41" />
                          <path d="m19.07 4.93-1.41 1.41" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-white">{trackData.weather}</div>
                      <div className="text-xs text-white/60">Silverstone, UK</div>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-medium text-white">{trackData.temp}</div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Thermometer size={14} className="text-racing-accent mr-2" />
                    <span className="text-xs text-white/60">Track temp: 28°C</span>
                  </div>
                  <div className="flex items-center">
                    <Droplets size={14} className="text-racing-accent mr-2" />
                    <span className="text-xs text-white/60">Humidity: {trackData.humidity}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded p-4 border border-white/10">
                <h4 className="text-sm font-medium text-white/80 mb-3">Race Information</h4>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-white/60">Current Position</span>
                    <span className="text-xs font-medium text-white">P1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-white/60">Gap to P2</span>
                    <span className="text-xs font-medium text-green-400">+2.4s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-white/60">Current Lap</span>
                    <span className="text-xs font-medium text-white">24/52</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-white/60">Pit Strategy</span>
                    <span className="text-xs font-medium text-racing-accent">2 Stop</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper functions for track visualization
function getXPosition(position: number): number {
  // Map the track position (0-100%) to x coordinates
  // These would be customized based on actual track layout
  // For demo purposes, creating an elliptical path
  return 50 + 35 * Math.cos(position / 100 * 2 * Math.PI);
}

function getYPosition(position: number): number {
  // Map the track position (0-100%) to y coordinates
  return 50 + 25 * Math.sin(position / 100 * 2 * Math.PI);
}

function getTrackPath(): string {
  // Create a path for the track (simplified ellipse for demo)
  let path = "";
  for (let i = 0; i <= 100; i++) {
    const x = getXPosition(i);
    const y = getYPosition(i);
    
    if (i === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  }
  path += " Z"; // Close the path
  return path;
}

function getTrackPathSegment(position: number): string {
  // Create a segment of the path from start to current position
  let path = "";
  for (let i = 0; i <= position; i++) {
    const x = getXPosition(i);
    const y = getYPosition(i);
    
    if (i === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  }
  return path;
}

function getCurrentSector(position: number): number {
  // Determine which sector the car is in based on position
  if (position < 33) {
    return 1;
  } else if (position < 66) {
    return 2;
  } else {
    return 3;
  }
}

export default TrackMap;
