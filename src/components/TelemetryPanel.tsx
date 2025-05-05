
import React, { useState, useEffect } from 'react';
import { GaugeCircle, Fuel, Thermometer, Activity, Layers } from 'lucide-react';
import { TelemetryData, initialTelemetry, generateTelemetryUpdate } from '../utils/telemetryData';
import { useSmoothValue, useStaggeredAnimation } from '../utils/animations';

const TelemetryPanel: React.FC = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData>(initialTelemetry);
  const visibleItems = useStaggeredAnimation(6, 100);

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
    <section className="py-20 px-6" id="telemetry">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
          <div className={`transition-all duration-500 ${visibleItems[0] ? 'opacity-100 transform-none' : 'opacity-0 -translate-x-4'}`}>
            <h2 className="text-3xl font-bold mb-2">Live Telemetry</h2>
            <p className="text-white/60">Real-time performance monitoring and analytics</p>
          </div>
          
          <div className={`mt-4 md:mt-0 flex items-center gap-3 transition-all duration-500 ${visibleItems[0] ? 'opacity-100 transform-none' : 'opacity-0 translate-x-4'}`}>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <span className="text-sm text-white/70">Live Data</span>
            </div>
            <span className="text-white/30">|</span>
            <span className="text-sm text-white/70">Last updated: <span className="text-racing-accent">Just now</span></span>
            <button className="ml-2 px-3 py-1 text-xs bg-white/5 hover:bg-white/10 rounded border border-white/10 text-white/90">
              Refresh
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Speed Card */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[1] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Speed</h3>
              <GaugeCircle size={20} className="text-racing-accent" />
            </div>
            
            <div className="text-5xl font-bold mb-1 text-racing-light">
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
            
            <div className="mt-6 flex justify-between items-center text-sm">
              <div>
                <div className="text-white/60">RPM</div>
                <div className="text-racing-accent font-medium">{Math.round(smoothRpm)}</div>
              </div>
              <div>
                <div className="text-white/60">Gear</div>
                <div className="text-racing-light font-medium text-lg">{telemetry.gear}</div>
              </div>
              <div>
                <div className="text-white/60">Lap</div>
                <div className="text-racing-accent font-medium">{telemetry.lapTime}</div>
              </div>
            </div>
          </div>
          
          {/* Throttle & Brake Card */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[2] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
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
            
            <div className="mb-6">
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
                <div className="text-white/60">G-Force Lat</div>
                <div className="text-racing-accent font-medium">{telemetry.g.lateral.toFixed(1)}G</div>
              </div>
              <div>
                <div className="text-white/60">G-Force Long</div>
                <div className="text-racing-accent font-medium">{telemetry.g.longitudinal.toFixed(1)}G</div>
              </div>
            </div>
          </div>
          
          {/* Tire Status Card */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[3] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Tire Status</h3>
              <Layers size={20} className="text-racing-accent" />
            </div>
            
            <div className="relative w-full aspect-square mb-4">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 glass-panel-dark px-3 py-1 text-xs text-white/70">
                Front
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 glass-panel-dark px-3 py-1 text-xs text-white/70">
                Rear
              </div>
              
              {/* Tire grid with temperatures */}
              <div className="grid grid-cols-2 h-full gap-6 p-6">
                <div className="relative flex flex-col items-center justify-center border border-white/10 rounded-md p-2">
                  <div className={`text-sm font-medium ${getTempColor(telemetry.tireTemp.frontLeft)}`}>
                    {Math.round(telemetry.tireTemp.frontLeft)}°C
                  </div>
                  <div className="text-xs text-white/60 mt-1">{telemetry.tirePressure.frontLeft.toFixed(2)} bar</div>
                </div>
                <div className="relative flex flex-col items-center justify-center border border-white/10 rounded-md p-2">
                  <div className={`text-sm font-medium ${getTempColor(telemetry.tireTemp.frontRight)}`}>
                    {Math.round(telemetry.tireTemp.frontRight)}°C
                  </div>
                  <div className="text-xs text-white/60 mt-1">{telemetry.tirePressure.frontRight.toFixed(2)} bar</div>
                </div>
                <div className="relative flex flex-col items-center justify-center border border-white/10 rounded-md p-2">
                  <div className={`text-sm font-medium ${getTempColor(telemetry.tireTemp.rearLeft)}`}>
                    {Math.round(telemetry.tireTemp.rearLeft)}°C
                  </div>
                  <div className="text-xs text-white/60 mt-1">{telemetry.tirePressure.rearLeft.toFixed(2)} bar</div>
                </div>
                <div className="relative flex flex-col items-center justify-center border border-white/10 rounded-md p-2">
                  <div className={`text-sm font-medium ${getTempColor(telemetry.tireTemp.rearRight)}`}>
                    {Math.round(telemetry.tireTemp.rearRight)}°C
                  </div>
                  <div className="text-xs text-white/60 mt-1">{telemetry.tirePressure.rearRight.toFixed(2)} bar</div>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-white/60 text-center">
              Optimal temperature range: 85°C - 95°C
            </div>
          </div>
          
          {/* Engine & Fuel Card */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[4] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Engine & Fuel</h3>
              <Fuel size={20} className="text-racing-accent" />
            </div>
            
            <div className="flex flex-col space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/60">Fuel Level</span>
                  <span className="text-sm font-medium text-racing-accent">{Math.round(telemetry.fuelLevel)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${telemetry.fuelLevel}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/60">Engine Temp</span>
                  <span className={`text-sm font-medium ${getTempColor(telemetry.engineTemp)}`}>
                    {Math.round(telemetry.engineTemp)}°C
                  </span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getEngineBarColor(telemetry.engineTemp)}`}
                    style={{ width: `${(telemetry.engineTemp / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center text-sm">
              <div>
                <div className="text-white/60">Oil Pressure</div>
                <div className="text-racing-accent font-medium">{telemetry.oilPressure.toFixed(1)} bar</div>
              </div>
              <div>
                <div className="text-white/60">Battery</div>
                <div className="text-racing-accent font-medium">{telemetry.batteryVoltage.toFixed(1)}V</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper functions for temperature-based color coding
function getTempColor(temp: number): string {
  if (temp < 80) return "text-blue-400"; // too cold
  if (temp > 100) return "text-red-500"; // too hot
  return "text-green-400"; // optimal
}

function getEngineBarColor(temp: number): string {
  if (temp < 80) return "bg-blue-400";
  if (temp > 105) return "bg-red-500";
  return "bg-green-400";
}

export default TelemetryPanel;
