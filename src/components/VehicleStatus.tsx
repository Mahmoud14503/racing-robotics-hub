
import React from 'react';
import { Battery, Cpu, Thermometer, Droplet, Radio, GitPullRequest, Check, AlertTriangle, X } from 'lucide-react';
import { systemStatus } from '../utils/telemetryData';
import { useStaggeredAnimation } from '../utils/animations';

const VehicleStatus: React.FC = () => {
  const visibleItems = useStaggeredAnimation(6, 100);
  
  // System status indicators - keeping only essential items
  const systemItems = [
    { name: "Battery", value: systemStatus.battery, icon: Battery, status: "optimal" },
    { name: "Cooling", value: systemStatus.cooling, icon: Thermometer, status: "normal" },
    { name: "Electronics", value: systemStatus.electronics, icon: Cpu, status: "online" },
    { name: "Hydraulics", value: systemStatus.hydraulics, icon: Droplet, status: "nominal" },
    { name: "Sensors", value: systemStatus.sensors, icon: Radio, status: "calibrated" },
    { name: "Data Link", value: systemStatus.datalink, icon: GitPullRequest, status: "connected" },
  ];
  
  return (
    <section className="bg-racing-gray/30 p-4" id="status">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">Vehicle Status</h2>
          <p className="text-white/60 text-sm">System monitoring</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemItems.map((item, index) => (
            <div 
              key={item.name} 
              className={`glass-panel p-4 border-l-2 ${getStatusBorderColor(item.status)} transition-all duration-300 ${
                visibleItems[index] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <item.icon size={16} className={getStatusTextColor(item.status)} />
                  <h3 className="text-base font-medium text-white/80 ml-2">{item.name}</h3>
                </div>
                <StatusIndicator status={item.status} />
              </div>
              
              <div className="mt-2">
                <div className="text-xl font-bold text-white">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Status indicator component
const StatusIndicator: React.FC<{ status: string }> = ({ status }) => {
  let icon, bgColor, textColor;
  
  switch (status) {
    case "optimal":
    case "normal":
    case "online":
    case "nominal":
    case "calibrated":
    case "connected":
      icon = <Check size={12} />;
      bgColor = "bg-green-500/20";
      textColor = "text-green-500";
      break;
    case "warning":
      icon = <AlertTriangle size={12} />;
      bgColor = "bg-racing-red/20";
      textColor = "text-racing-red";
      break;
    case "error":
      icon = <X size={12} />;
      bgColor = "bg-red-500/20";
      textColor = "text-red-500";
      break;
    default:
      icon = <Check size={12} />;
      bgColor = "bg-racing-accent/20";
      textColor = "text-racing-accent";
  }
  
  return (
    <div className={`w-6 h-6 rounded-full ${bgColor} flex items-center justify-center ${textColor}`}>
      {icon}
    </div>
  );
};

// Helper functions for status-based styling
function getStatusBorderColor(status: string): string {
  switch (status) {
    case "optimal":
    case "normal":
    case "online":
    case "nominal":
    case "calibrated":
    case "connected":
      return "border-green-500";
    case "warning":
      return "border-racing-red";
    case "error":
      return "border-red-500";
    default:
      return "border-racing-accent";
  }
}

function getStatusTextColor(status: string): string {
  switch (status) {
    case "optimal":
    case "normal":
    case "online":
    case "nominal":
    case "calibrated":
    case "connected":
      return "text-green-500";
    case "warning":
      return "text-racing-red";
    case "error":
      return "text-red-500";
    default:
      return "text-racing-accent";
  }
}

export default VehicleStatus;
