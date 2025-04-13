
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TelemetryPanel from '@/components/TelemetryPanel';
import VehicleStatus from '@/components/VehicleStatus';
import TrackMap from '@/components/TrackMap';
import ControlPanel from '@/components/ControlPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-racing-dark text-racing-light flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <TelemetryPanel />
          </div>
          <div>
            <VehicleStatus />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <TrackMap />
          </div>
          <div>
            <ControlPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
