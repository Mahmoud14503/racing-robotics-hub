
import React, { useState, useEffect } from 'react';
import { GaugeCircle, Activity } from 'lucide-react';
import { TelemetryData, initialTelemetry, generateTelemetryUpdate } from '../utils/telemetryData';
import { useSmoothValue, useStaggeredAnimation } from '../utils/animations';

const TelemetryPanel: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>(initialTelemetry);
  const visibleItems = useStaggeredAnimation(3, 100);

  // Smoothly transition values for key metrics
  const smoothSpeed = useSmoothValue(telemetry.speed);
  const smoothRpm = useSmoothValue(telemetry.rpm);
  const smoothThrottle = useSmoothValue(telemetry.throttle);
  const smoothBrake = useSmoothValue(telemetry.brake);
  
  // Update telemetry data every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(current => generateTelemetryUpdate(current));
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-10 px-4" id="telemetry">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Live Telemetry</h2>
          <p className="text-white/60 text-sm">Core performance data</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Speed Card */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[0] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-white/80">Speed</h3>
              <GaugeCircle size={20} className="text-racing-accent" />
            </div>
            
            <div className="text-5xl font-bold mb-2 text-racing-light">
              {Math.round(smoothSpeed)}
              <span className="text-lg font-normal text-white/60 ml-1">km/h</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-white/60">0</span>
              <div className="flex-1 mx-2 mt-2">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-racing-red"
                    style={{ width: `${(smoothSpeed / 350) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-white/60">350</span>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm">
              <div>
                <div className="text-white/60">RPM</div>
                <div className="text-racing-accent font-medium">{Math.round(smoothRpm)}</div>
              </div>
              <div>
                <div className="text-white/60">Gear</div>
                <div className="text-racing-light font-medium text-lg">{telemetry.gear}</div>
              </div>
            </div>
          </div>
          
          {/* Throttle & Brake Card */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[1] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-white/80">Throttle & Brake</h3>
              <Activity size={20} className="text-racing-accent" />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white/60">Throttle</span>
                <span className="text-sm font-medium text-racing-accent">{Math.round(smoothThrottle)}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${smoothThrottle}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white/60">Brake</span>
                <span className="text-sm font-medium text-racing-red">{Math.round(smoothBrake)}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-racing-red rounded-full"
                  style={{ width: `${smoothBrake}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div>
                <div className="text-white/60">Steering</div>
                <div className="text-racing-accent font-medium">{telemetry.steeringAngle}°</div>
              </div>
              <div>
                <div className="text-white/60">G-Force</div>
                <div className="text-racing-accent font-medium">{telemetry.g.lateral.toFixed(1)}G</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TelemetryPanel;
