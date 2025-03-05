
import React, { useState } from 'react';
import { Settings, Power, AlertTriangle, ShieldCheck, Lock, Unlock, Zap, MessageSquare, Radio, WifiOff } from 'lucide-react';
import { useStaggeredAnimation } from '../utils/animations';

const ControlPanel: React.FC = () => {
  const [systemPower, setSystemPower] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  const [safetyProtocols, setSafetyProtocols] = useState(true);
  const [remoteLock, setRemoteLock] = useState(false);
  const [boostMode, setBoostMode] = useState(false);
  const [communicationMode, setCommunicationMode] = useState('normal');
  
  const visibleItems = useStaggeredAnimation(6, 100);
  
  const togglePower = () => {
    setSystemPower(!systemPower);
  };
  
  return (
    <section className="py-20 px-6 bg-racing-gray/30" id="controls">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Control Panel</h2>
          <p className="text-white/60 max-w-2xl mx-auto">System controls and management interface</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Power Control */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[0] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">System Power</h3>
              <Power size={20} className={systemPower ? "text-green-500" : "text-white/40"} />
            </div>
            
            <div className="flex mb-6">
              <button 
                onClick={togglePower}
                className={`relative inline-flex h-14 w-full flex-shrink-0 cursor-pointer rounded-full border-2 ${
                  systemPower ? 'border-green-500 bg-green-500/20' : 'border-white/10 bg-white/5'
                } transition-colors duration-200 ease-in-out focus:outline-none`}
              >
                <span
                  className={`pointer-events-none inline-block h-12 w-12 transform rounded-full ${
                    systemPower ? 'translate-x-full' : 'translate-x-0'
                  } bg-gradient-to-r ${
                    systemPower ? 'from-green-400 to-green-500 shadow-lg shadow-green-500/30' : 'from-gray-400/20 to-gray-500/20'
                  } transition duration-300 ease-in-out`}
                >
                  <span
                    className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                      systemPower ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Power size={18} className="text-white" />
                  </span>
                  <span
                    className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                      systemPower ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <Power size={18} className="text-white/60" />
                  </span>
                </span>
              </button>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-medium mb-1">{systemPower ? 'System Active' : 'System Inactive'}</div>
              <p className="text-sm text-white/60">
                {systemPower 
                  ? 'All systems are powered and operational.' 
                  : 'Systems are currently in standby mode.'}
              </p>
            </div>
            
            <div className="mt-6 p-3 bg-white/5 rounded border border-white/10">
              <div className="text-xs text-white/70 flex items-center">
                <span className={`w-2 h-2 rounded-full ${systemPower ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></span>
                System status updated just now
              </div>
            </div>
          </div>
          
          {/* Data Collection Panel */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[1] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Data Collection</h3>
              <Radio size={20} className="text-racing-accent" />
            </div>
            
            <div className="mb-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={dataCollection}
                  onChange={() => setDataCollection(!dataCollection)}
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-racing-accent"></div>
                <span className="ml-3 text-sm font-medium text-white/80">
                  {dataCollection ? 'Enabled' : 'Disabled'}
                </span>
              </label>
              
              <p className="mt-2 text-sm text-white/60">
                {dataCollection 
                  ? 'Telemetry data is being collected and stored.' 
                  : 'Telemetry data collection is paused.'}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Sampling Rate</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80">
                  <option>High (60 Hz)</option>
                  <option>Medium (30 Hz)</option>
                  <option>Low (10 Hz)</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Storage Mode</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80">
                  <option>Cloud + Local</option>
                  <option>Cloud Only</option>
                  <option>Local Only</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Data Priority</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80">
                  <option>Performance</option>
                  <option>Balanced</option>
                  <option>Diagnostic</option>
                </select>
              </div>
            </div>
            
            <button className="w-full py-2 mt-6 bg-racing-accent/20 hover:bg-racing-accent/30 border border-racing-accent/30 rounded text-sm text-racing-accent transition-colors">
              Export Current Session Data
            </button>
          </div>
          
          {/* Safety Protocols */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[2] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Safety Protocols</h3>
              <ShieldCheck size={20} className={safetyProtocols ? "text-green-500" : "text-red-500"} />
            </div>
            
            <div className="mb-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={safetyProtocols}
                  onChange={() => setSafetyProtocols(!safetyProtocols)}
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                <span className="ml-3 text-sm font-medium text-white/80">
                  {safetyProtocols ? 'Active' : 'Overridden'}
                </span>
              </label>
              
              {!safetyProtocols && (
                <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded flex items-center text-sm text-red-400">
                  <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                  Warning: Disabling safety protocols may lead to system damage or dangerous operation.
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Engine Limits</span>
                <select 
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80"
                  disabled={safetyProtocols}
                >
                  <option>Enforced</option>
                  <option>Soft Limits</option>
                  <option>Disabled</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Brake Temperature</span>
                <select 
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80"
                  disabled={safetyProtocols}
                >
                  <option>Monitor</option>
                  <option>Alert Only</option>
                  <option>Ignore</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Power Delivery</span>
                <select 
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80"
                  disabled={safetyProtocols}
                >
                  <option>Controlled</option>
                  <option>Aggressive</option>
                  <option>Maximum</option>
                </select>
              </div>
            </div>
            
            <button className={`w-full py-2 mt-6 ${
              safetyProtocols 
                ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white/80' 
                : 'bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400'
            } rounded text-sm transition-colors`}>
              {safetyProtocols ? 'Run Safety Diagnostics' : 'Acknowledge Risks'}
            </button>
          </div>
          
          {/* Remote Lock */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[3] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Remote Access</h3>
              {remoteLock ? (
                <Lock size={20} className="text-racing-red" />
              ) : (
                <Unlock size={20} className="text-green-500" />
              )}
            </div>
            
            <div className="mb-6 text-center">
              <button
                onClick={() => setRemoteLock(!remoteLock)}
                className={`w-20 h-20 rounded-full ${
                  remoteLock 
                    ? 'bg-racing-red/20 border-2 border-racing-red/50' 
                    : 'bg-green-500/20 border-2 border-green-500/50'
                } flex items-center justify-center transition-all duration-300 hover:scale-105`}
              >
                {remoteLock ? (
                  <Lock size={32} className="text-racing-red" />
                ) : (
                  <Unlock size={32} className="text-green-500" />
                )}
              </button>
              
              <div className="mt-4 text-lg font-medium">
                {remoteLock ? 'System Locked' : 'System Unlocked'}
              </div>
              <p className="text-sm text-white/60 mt-1">
                {remoteLock 
                  ? 'Remote access is currently disabled.' 
                  : 'Remote access is currently enabled.'}
              </p>
            </div>
            
            <div className={`p-3 ${
              remoteLock 
                ? 'bg-racing-red/10 border border-racing-red/30' 
                : 'bg-green-500/10 border border-green-500/30'
              } rounded`}
            >
              <div className="text-sm text-white/80 mb-2">
                {remoteLock ? 'Last Locked:' : 'Last Unlocked:'}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">3 minutes ago</span>
                <span className="text-xs text-white/60">User: Admin</span>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Auto-Lock</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80">
                  <option>After 10 minutes</option>
                  <option>After 30 minutes</option>
                  <option>After 1 hour</option>
                  <option>Never</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Lock Method</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80">
                  <option>Standard</option>
                  <option>Two-Factor</option>
                  <option>Biometric</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Performance Mode */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[4] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Performance Mode</h3>
              <Zap size={20} className={boostMode ? "text-yellow-400" : "text-white/40"} />
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <div className={`w-36 h-36 rounded-full ${
                boostMode 
                  ? 'bg-gradient-to-br from-yellow-400 to-racing-red animated-border' 
                  : 'bg-white/5 border border-white/10'
                } flex flex-col items-center justify-center transition-all duration-500`}
              >
                <button
                  onClick={() => setBoostMode(!boostMode)}
                  className={`w-28 h-28 rounded-full ${
                    boostMode 
                      ? 'bg-racing-red/20 border-2 border-yellow-400/50' 
                      : 'bg-white/10 border border-white/20'
                  } flex flex-col items-center justify-center transition-all duration-300 hover:scale-105`}
                >
                  <Zap size={28} className={boostMode ? "text-yellow-400" : "text-white/60"} />
                  <span className={`mt-1 font-medium ${boostMode ? "text-yellow-400" : "text-white/60"}`}>
                    {boostMode ? 'ACTIVE' : 'BOOST'}
                  </span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/60">Power Output</span>
                  <span className="text-sm font-medium text-white">
                    {boostMode ? '100%' : '85%'}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${boostMode ? 'bg-yellow-400' : 'bg-white/30'} rounded-full`}
                    style={{ width: boostMode ? '100%' : '85%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/60">Response Time</span>
                  <span className="text-sm font-medium text-white">
                    {boostMode ? 'Immediate' : 'Normal'}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${boostMode ? 'bg-yellow-400' : 'bg-white/30'} rounded-full`}
                    style={{ width: boostMode ? '100%' : '70%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-white/60">Battery Draw</span>
                  <span className={`text-sm font-medium ${boostMode ? 'text-racing-red' : 'text-white'}`}>
                    {boostMode ? 'High' : 'Normal'}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${boostMode ? 'bg-racing-red' : 'bg-white/30'} rounded-full`}
                    style={{ width: boostMode ? '90%' : '50%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            {boostMode && (
              <div className="mt-4 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-sm text-yellow-400">
                <AlertTriangle size={16} className="inline-block mr-1" />
                Boost mode will automatically deactivate after 30 seconds.
              </div>
            )}
          </div>
          
          {/* Communication Mode */}
          <div className={`glass-panel p-6 transition-all duration-500 ${visibleItems[5] ? 'opacity-100 transform-none' : 'opacity-0 scale-95'}`}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-white/80">Communication</h3>
              <MessageSquare size={20} className="text-racing-accent" />
            </div>
            
            <div className="mb-6">
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setCommunicationMode('normal')}
                  className={`flex-1 py-2 rounded ${
                    communicationMode === 'normal' 
                      ? 'bg-racing-accent text-white' 
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setCommunicationMode('silent')}
                  className={`flex-1 py-2 rounded ${
                    communicationMode === 'silent' 
                      ? 'bg-racing-accent text-white' 
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Silent
                </button>
                <button
                  onClick={() => setCommunicationMode('emergency')}
                  className={`flex-1 py-2 rounded ${
                    communicationMode === 'emergency' 
                      ? 'bg-racing-red text-white' 
                      : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Emergency
                </button>
              </div>
              
              <div className={`p-3 rounded ${getCommunicationBackground(communicationMode)}`}>
                <div className="flex items-start">
                  {getCommunicationIcon(communicationMode)}
                  <div className="ml-3">
                    <div className="font-medium text-white">{getCommunicationTitle(communicationMode)}</div>
                    <p className="text-sm text-white/70 mt-1">
                      {getCommunicationDescription(communicationMode)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Channel</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80">
                  <option>Primary (Team)</option>
                  <option>Secondary (Pit)</option>
                  <option>Tertiary (Management)</option>
                </select>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/80">Encryption</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white/80">
                  <option>High (AES-256)</option>
                  <option>Standard (AES-128)</option>
                  <option>None</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-2">
              <button className="flex-1 py-2 bg-racing-accent/20 hover:bg-racing-accent/30 border border-racing-accent/30 rounded text-sm text-racing-accent transition-colors">
                Send Status Update
              </button>
              <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-sm text-white/80 transition-colors">
                Voice Channel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper functions for communication mode
function getCommunicationIcon(mode: string) {
  switch (mode) {
    case 'normal':
      return <Radio size={24} className="text-racing-accent" />;
    case 'silent':
      return <WifiOff size={24} className="text-white/70" />;
    case 'emergency':
      return <AlertTriangle size={24} className="text-racing-red" />;
    default:
      return <Radio size={24} className="text-racing-accent" />;
  }
}

function getCommunicationTitle(mode: string): string {
  switch (mode) {
    case 'normal':
      return 'Normal Communications';
    case 'silent':
      return 'Silent Mode Activated';
    case 'emergency':
      return 'Emergency Channel Open';
    default:
      return 'Normal Communications';
  }
}

function getCommunicationDescription(mode: string): string {
  switch (mode) {
    case 'normal':
      return 'Standard data transmission and communication protocols active.';
    case 'silent':
      return 'All non-essential communications are disabled to reduce detection.';
    case 'emergency':
      return 'Priority channel open for emergency communications only.';
    default:
      return 'Standard data transmission and communication protocols active.';
  }
}

function getCommunicationBackground(mode: string): string {
  switch (mode) {
    case 'normal':
      return 'bg-racing-accent/10 border border-racing-accent/30';
    case 'silent':
      return 'bg-white/5 border border-white/20';
    case 'emergency':
      return 'bg-racing-red/10 border border-racing-red/30';
    default:
      return 'bg-racing-accent/10 border border-racing-accent/30';
  }
}

export default ControlPanel;
