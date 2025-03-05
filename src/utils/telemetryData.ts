
export interface TelemetryData {
  speed: number;
  rpm: number;
  gear: number;
  throttle: number;
  brake: number;
  steeringAngle: number;
  lapTime: string;
  fuelLevel: number;
  tirePressure: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
  tireTemp: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
  engineTemp: number;
  oilPressure: number;
  batteryVoltage: number;
  g: {
    lateral: number;
    longitudinal: number;
  };
  position: {
    lat: number;
    lng: number;
  };
  trackPosition: number; // percentage around track (0-100)
}

// Initial mock data
export const initialTelemetry: TelemetryData = {
  speed: 257,
  rpm: 11800,
  gear: 6,
  throttle: 95,
  brake: 0,
  steeringAngle: -3,
  lapTime: "1:32.456",
  fuelLevel: 68,
  tirePressure: {
    frontLeft: 2.12,
    frontRight: 2.15,
    rearLeft: 1.95,
    rearRight: 1.97,
  },
  tireTemp: {
    frontLeft: 92,
    frontRight: 94,
    rearLeft: 89,
    rearRight: 90,
  },
  engineTemp: 104,
  oilPressure: 5.2,
  batteryVoltage: 12.8,
  g: {
    lateral: 0.2,
    longitudinal: 1.1,
  },
  position: {
    lat: 52.0705,
    lng: -1.0221,
  },
  trackPosition: 67,
};

// Function to simulate changing telemetry data
export function generateTelemetryUpdate(current: TelemetryData): TelemetryData {
  // Helper to generate random changes within a range
  const randomChange = (value: number, max: number, range: number) => {
    const change = (Math.random() - 0.5) * range;
    return Math.min(Math.max(value + change, 0), max);
  };

  // Update track position and handle lap completion
  let newTrackPosition = current.trackPosition + Math.random() * 0.5;
  if (newTrackPosition > 100) {
    newTrackPosition = 0;
  }

  return {
    speed: randomChange(current.speed, 350, 3),
    rpm: randomChange(current.rpm, 13000, 150),
    gear: current.speed > 300 ? 8 : current.speed > 250 ? 7 : current.speed > 200 ? 6 : current.speed > 150 ? 5 : current.speed > 100 ? 4 : current.speed > 60 ? 3 : current.speed > 30 ? 2 : 1,
    throttle: randomChange(current.throttle, 100, 3),
    brake: current.throttle > 90 ? 0 : randomChange(current.brake, 100, 5),
    steeringAngle: randomChange(current.steeringAngle, 45, 1),
    lapTime: current.lapTime,
    fuelLevel: current.fuelLevel - 0.01,
    tirePressure: {
      frontLeft: randomChange(current.tirePressure.frontLeft, 2.5, 0.02),
      frontRight: randomChange(current.tirePressure.frontRight, 2.5, 0.02),
      rearLeft: randomChange(current.tirePressure.rearLeft, 2.5, 0.02),
      rearRight: randomChange(current.tirePressure.rearRight, 2.5, 0.02),
    },
    tireTemp: {
      frontLeft: randomChange(current.tireTemp.frontLeft, 110, 0.5),
      frontRight: randomChange(current.tireTemp.frontRight, 110, 0.5),
      rearLeft: randomChange(current.tireTemp.rearLeft, 110, 0.5),
      rearRight: randomChange(current.tireTemp.rearRight, 110, 0.5),
    },
    engineTemp: randomChange(current.engineTemp, 120, 0.2),
    oilPressure: randomChange(current.oilPressure, 6, 0.05),
    batteryVoltage: randomChange(current.batteryVoltage, 13.5, 0.01),
    g: {
      lateral: randomChange(current.g.lateral, 2, 0.1),
      longitudinal: randomChange(current.g.longitudinal, 3, 0.1),
    },
    position: current.position,
    trackPosition: newTrackPosition,
  };
}

export const systemStatus = {
  battery: "Optimal",
  cooling: "Normal",
  electronics: "Online",
  hydraulics: "Nominal",
  sensors: "Calibrated",
  datalink: "Connected",
  software: "v1.0.5 (latest)",
  lastSync: "2 minutes ago",
};

export const trackData = {
  name: "Silverstone Circuit",
  length: "5.891 km",
  turns: 18,
  sectors: 3,
  recordLap: "1:29.456",
  weather: "Partly Cloudy",
  temp: "22°C",
  humidity: "45%",
};
