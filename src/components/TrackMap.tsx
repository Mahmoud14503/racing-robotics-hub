
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
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
    <section className="py-6 px-4" id="track">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Track Map</h2>
          <p className="text-white/60">Live position tracking</p>
        </div>
        
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
          <div className="glass-panel relative overflow-hidden min-h-[400px]">
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
            
            <div className="absolute bottom-4 right-4">
              <div className="glass-panel-dark p-2 text-xs text-white/80 flex items-center">
                <Navigation size={14} className="mr-1 text-racing-accent" /> 
                <span>Sector {getCurrentSector(carPosition)}/3</span>
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
