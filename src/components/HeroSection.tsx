
import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEntranceAnimation } from '../utils/animations';

const HeroSection: React.FC = () => {
  const titleVisible = useEntranceAnimation(300);
  const subtitleVisible = useEntranceAnimation(600);
  const ctaVisible = useEntranceAnimation(900);
  
  return (
    <section className="relative h-screen flex items-center justify-center px-6 overflow-hidden" id="dashboard">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-racing-accent/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517994112540-009c47ea476b?q=80&w=2006')] bg-no-repeat bg-cover bg-center opacity-15 blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-racing-dark/90 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl text-center">
        <div className={`mb-2 inline-block transition-all duration-700 ${titleVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-8'}`}>
          <span className="px-3 py-1 rounded-full bg-racing-red/10 text-racing-red text-xs font-medium uppercase tracking-wider">
            Formula Racing Robotics
          </span>
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 text-glow transition-all duration-700 ${titleVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-8'}`}>
          <span className="text-racing-light">Advanced</span>
          <span className="text-racing-red"> Racing</span>
          <span className="text-racing-light"> Telemetry</span>
        </h1>
        
        <p className={`text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto transition-all duration-700 ${subtitleVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-8'}`}>
          Real-time monitoring and precise control for your formula racing vehicle. 
          Track performance metrics, analyze telemetry data, and optimize your racing strategy.
        </p>
        
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 ${ctaVisible ? 'opacity-100 transform-none' : 'opacity-0 -translate-y-8'}`}>
          <button className="px-6 py-3 bg-racing-red rounded-lg text-white font-medium flex items-center gap-2 hover:bg-racing-red/90 transition-colors hover:shadow-lg hover:shadow-racing-red/20">
            View Live Telemetry <ArrowRight size={16} />
          </button>
          <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/90 font-medium transition-colors">
            System Documentation
          </button>
        </div>
      </div>
      
      <a href="#telemetry" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/50 hover:text-white/80 transition-colors">
        <span className="text-sm mb-2">Scroll to Explore</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
};

export default HeroSection;
