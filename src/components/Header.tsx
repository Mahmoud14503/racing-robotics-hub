
import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { useEntranceAnimation } from '../utils/animations';

const Header: React.FC = () => {
  const isVisible = useEntranceAnimation(200);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 glass-panel-dark h-16 border-b border-white/5 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-racing-red rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">FR</span>
          </div>
          <h1 className="text-lg font-medium tracking-tight">
            <span className="text-racing-light">Racing</span>
            <span className="text-racing-red font-semibold">Robotics</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#dashboard" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Dashboard</a>
          <a href="#telemetry" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Telemetry</a>
          <a href="#track" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Track Map</a>
          <a href="#status" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Vehicle Status</a>
          <a href="#controls" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Controls</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <Bell size={18} />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <Settings size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-racing-accent/20 flex items-center justify-center text-racing-accent border border-racing-accent/30">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
