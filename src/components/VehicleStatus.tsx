
import React from 'react';
import { Battery, Cpu, Thermometer, Droplet, Radio, GitPullRequest, Check, AlertTriangle, X } from 'lucide-react';
import { systemStatus } from '../utils/telemetryData';
import { useStaggeredAnimation } from '../utils/animations';

const VehicleStatus: React.FC = () => {
  const visibleItems = useStaggeredAnimation(8, 100);
  
  // System status indicators
  const systemItems = [
    { name: "Battery", value: systemStatus.battery, icon: Battery, status: "optimal" },
    { name: "Cooling", value: systemStatus.cooling, icon: Thermometer, status: "normal" },
    { name: "Electronics", value: systemStatus.electronics, icon: Cpu, status: "online" },
    { name: "Hydraulics", value: systemStatus.hydraulics, icon: Droplet, status: "nominal" },
    { name: "Sensors", value: systemStatus.sensors, icon: Radio, status: "calibrated" },
    { name: "Data Link", value: systemStatus.datalink, icon: GitPullRequest, status: "connected" },
  ];
  
  return (
    <section className="py-20 px-6 bg-racing-gray/30" id="status">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Vehicle Status</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Comprehensive monitoring of all vehicle systems and components</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemItems.map((item, index) => (
            <div 
              key={item.name} 
              className={`glass-panel p-6 border-l-4 ${getStatusBorderColor(item.status)} transition-all duration-500 ${
                visibleItems[index] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <item.icon size={18} className={getStatusTextColor(item.status)} />
                  <h3 className="text-lg font-medium text-white/80 ml-2">{item.name}</h3>
                </div>
                <StatusIndicator status={item.status} />
              </div>
              
              <div className="mt-4">
                <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-sm text-white/60">{getStatusDescription(item.status)}</div>
              </div>
              
              <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
                <div className="text-xs text-white/70 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Last checked: 2 minutes ago
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={`mt-10 glass-panel p-6 transition-all duration-500 ${visibleItems[6] ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white/80">System Diagnostics</h3>
            <span className="px-3 py-1 bg-white/5 rounded text-xs text-white/70">{systemStatus.software}</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-3">
                  <Check size={16} className="text-green-500" />
                </span>
                <div>
                  <div className="text-sm font-medium text-white">All systems operational</div>
                  <div className="text-xs text-white/60">No issues detected during last scan</div>
                </div>
              </div>
              <span className="text-xs text-white/60">Updated 5m ago</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                  <AlertTriangle size={16} className="text-yellow-500" />
                </span>
                <div>
                  <div className="text-sm font-medium text-white">Tire pressure warning</div>
                  <div className="text-xs text-white/60">Front right tire pressure slightly below optimum</div>
                </div>
              </div>
              <span className="text-xs text-white/60">Updated 5m ago</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/5">
              <div className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mr-3">
                  <Radio size={16} className="text-blue-500" />
                </span>
                <div>
                  <div className="text-sm font-medium text-white">Data synchronization complete</div>
                  <div className="text-xs text-white/60">All telemetry data successfully uploaded to cloud</div>
                </div>
              </div>
              <span className="text-xs text-white/60">Updated 3m ago</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm text-white/70 transition-colors">
              Run Full Diagnostics
            </button>
          </div>
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
      bgColor = "bg-yellow-500/20";
      textColor = "text-yellow-500";
      break;
    case "error":
      icon = <X size={12} />;
      bgColor = "bg-red-500/20";
      textColor = "text-red-500";
      break;
    default:
      icon = <Check size={12} />;
      bgColor = "bg-blue-500/20";
      textColor = "text-blue-500";
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
      return "border-yellow-500";
    case "error":
      return "border-red-500";
    default:
      return "border-blue-500";
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
      return "text-yellow-500";
    case "error":
      return "text-red-500";
    default:
      return "text-blue-500";
  }
}

function getStatusDescription(status: string): string {
  switch (status) {
    case "optimal":
      return "All battery parameters within ideal range";
    case "normal":
      return "Cooling system operating at standard efficiency";
    case "online":
      return "All electronic systems functioning correctly";
    case "nominal":
      return "Hydraulic pressure at recommended levels";
    case "calibrated":
      return "All sensors properly calibrated and responsive";
    case "connected":
      return "Stable connection with all data endpoints";
    default:
      return "System functioning normally";
  }
}

export default VehicleStatus;
