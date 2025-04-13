
import Header from '@/components/Header';
import TelemetryPanel from '@/components/TelemetryPanel';
import VehicleStatus from '@/components/VehicleStatus';
import TrackMap from '@/components/TrackMap';

const Index = () => {
  return (
    <div className="min-h-screen bg-racing-dark text-racing-light flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div>
            <TelemetryPanel />
          </div>
          <div>
            <VehicleStatus />
          </div>
        </div>
        
        <div className="mt-6">
          <TrackMap />
        </div>
      </main>
    </div>
  );
};

export default Index;
